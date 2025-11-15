import { useReducer, useEffect, useMemo } from "react";
import { todoReducer } from "./todoReducer";

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], () => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const completedCount = useMemo(() => todos.filter(todo => todo.done).length, [todos]);

    const filteredTodos = (searchTerm) =>
        todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

    return { todos, dispatch, completedCount, filteredTodos };
};
