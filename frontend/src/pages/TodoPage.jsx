import { useState, useRef, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "../components/TodoItem"
import useCountAnimation from "../hooks/useCountAnimation";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import Button from "../components/Button";
import { todoStyles as styles } from "../styles/todoStyles";

function TodoPage() {
    const [newTodo, setNewTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState("default");

    const {
        todos,
        completedCount,
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo
    } = useTodos();

    const completedRef = useRef(null);

    const textColorObj = {
        add: "text-green-500",
        edit: "text-blue-600",
        delete: "text-red-500",
        toggle: "text-cyan-500",
        default: "text-gray-400"
    };

    const handleAdd = async () => {
        if (!newTodo.trim()) return;

        await addTodo(newTodo.trim());
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

    const textAreaRef = useRef(null);
    useAutosizeTextArea(textAreaRef, newTodo);

    const handleKeyDown = (e) => {
        // Ctrl + Enter → Add todo
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault(); // Prevent adding new line
            handleAdd();

            // Clear textarea after add
            setNewTodo("");

            // Reset height
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }
        }
    };

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
                    <textarea
                        ref={textAreaRef}
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter a new task"
                        rows={1}
                        className={styles.newTodoTextarea}
                    />
                    <Button variant="green" className="rounded-xl self-start" onClick={handleAdd}>
                        Add
                    </Button>
                </div>

                {/* Stats */}
                <p className={styles.stats}>
                    You have completed{" "}
                    <span ref={completedRef} className={styles.counter}>
                        {completedCount}
                    </span>{" "}
                    of {todos.length} tasks!
                </p>

                {/* Feedback */}
                <p
                    className={`${isVisible ? textColorObj[feedbackType] : ""} 
                        ${styles.feedback} 
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                >
                    {feedback}
                </p>

                {/* Todo list */}
                <ul className={styles.todoList}>
                    {displayedTodos.map((todo) => (
                        <TodoItem
                            key={todo._id} // 🚨 now _id, not id
                            todo={todo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            setFeedback={setFeedback}
                            setIsVisible={setIsVisible}
                            setFeedbackType={setFeedbackType}
                            Button={Button}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoPage;
