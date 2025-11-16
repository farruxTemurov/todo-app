import { useState, useRef, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";
import useCountAnimation from "../hooks/useCountAnimation";
import Button from "../components/Button";

const styles = {
    container: "min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-10 px-4 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500",
    card: "w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-all duration-500",
    title: "text-3xl font-bold mb-6 text-center tracking-tight",
    searchInput: "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 transition",
    newTodoInput: "flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-400 transition",
    stats: "text-gray-700 dark:text-gray-300 mb-5 text-center",
    counter: "inline-block font-semibold text-blue-600 dark:text-blue-400 transition-transform duration-300",
    feedback: "transition-all duration-500 ease-in-out text-center mt-2 mb-2 delay-150",
    todoList: "space-y-3"
};

function TodoPage() {
    const [newTodo, setNewTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState("default");

    const { todos, dispatch, completedCount, filteredTodos } = useTodos();
    const completedRef = useRef(null);

    const textColorObj = {
        add: "text-green-500",
        edit: "text-yellow-600",
        delete: "text-red-500",
        toggle: "text-gray-500",
        default: "text-gray-400"
    };

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        dispatch({ type: "ADD_TODO", payload: newTodo.trim() });
        setNewTodo("");
        setFeedback("✅ Task added!");
        setIsVisible(true);
        setFeedbackType("add");
    };

    const displayedTodos = filteredTodos(searchTerm);

    useCountAnimation(completedRef, completedCount);

    useEffect(() => {
        if (!feedback) return;
        const hideTimer = setTimeout(() => setIsVisible(false), 1500);
        const clearTimer = setTimeout(() => setFeedback(""), 2000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(clearTimer);
        };
    }, [feedback]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>📝 Todo List</h1>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search the list..."
                        className={styles.searchInput}
                    />
                </div>

                {/* New task input */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new task"
                        className={styles.newTodoInput}
                    />
                    <Button variant="green" className="rounded-xl" onClick={addTodo}>
                        Add
                    </Button>
                </div>

                {/* Task stats */}
                <p className={styles.stats}>
                    You have completed{" "}
                    <span ref={completedRef} className={styles.counter}>
                        {completedCount}
                    </span>{" "}
                    of {todos.length} tasks!
                </p>

                {/* Feedback message */}
                <p
                    className={`${isVisible ? textColorObj[feedbackType] || textColorObj.default : ""} 
                    ${styles.feedback} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                >
                    {feedback}
                </p>

                {/* Todo list */}
                <ul className={styles.todoList}>
                    {displayedTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            dispatch={dispatch}
                            setFeedback={setFeedback}
                            setIsVisible={setIsVisible}
                            setFeedbackType={setFeedbackType}
                            Button={Button} // pass our Button to child if needed
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoPage;
