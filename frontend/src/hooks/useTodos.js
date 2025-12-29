import { useReducer, useEffect, useMemo } from "react";
import { todoReducer } from "../reducers/todoReducer";

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then(res => res.json())
            .then(data => dispatch({ type: "SET_TODOS", payload: data }))
            .catch(err => console.error(err));
    }, []);

    const completedCount = useMemo(() => todos.filter(todo => todo.done).length, [todos]);

    const filteredTodos = (searchTerm) =>
        todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

    // ADD todo
    const addTodo = async (text, tags, category, priority) => {
        const res = await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, tags, category, priority })
        });

        if (!res.ok) {
            console.error("Failed to add todo");
            return;
        }

        const newTodo = await res.json();
        dispatch({ type: "ADD_TODO", payload: newTodo });
    };

    // TOGGLE todo
    const toggleTodo = async (id, done) => {
        const res = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done })
        });

        const updated = await res.json();
        dispatch({ type: "UPDATE_TODO", payload: updated });
    };

    // DELETE todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
        dispatch({ type: "DELETE_TODO", payload: id });
    };

    // EDIT todo
    const editTodo = async (id, text) => {
        const res = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const updated = await res.json();
        dispatch({ type: "UPDATE_TODO", payload: updated });
    };

    return {
        todos,
        dispatch,
        completedCount,
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo
    };

};
