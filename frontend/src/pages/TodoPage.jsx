import { useState, useRef, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";
import useCountAnimation from "../hooks/useCountAnimation";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import Button from "../components/Button";
import { todoStyles as styles } from "../styles/todoStyles";
import useCtrlEnterSave from "../hooks/useCtrlEnterSave";

function TodoPage() {
    const [newTodo, setNewTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState("default");
    const [selectedTag, setSelectedTag] = useState(null);
    const [category, setCategory] = useState("");
    const PRIORITIES = ["low", "medium", "high", "urgent"];
    const [priority, setPriority] = useState("");
    const PRIORITY_ORDER = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1,
    };

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
    const textAreaRef = useRef(null);

    const textColorObj = {
        add: "text-green-500",
        edit: "text-blue-600",
        delete: "text-red-500",
        toggle: "text-cyan-500",
        default: "text-gray-400"
    };

    /* -------------------- ADD TODO -------------------- */
    const handleAdd = async () => {
        if (!newTodo.trim()) return;

        const hashtagMatches = newTodo.match(/#\w+/g) || [];
        const extractedTags = hashtagMatches.map(tag => tag.slice(1).toLowerCase());
        const cleanText = newTodo.replace(/#\w+/g, "").trim();

        await addTodo(cleanText, extractedTags, category, priority || "medium");
        setNewTodo("");
        setCategory("");
        setSelectedTag(null);
        setFeedback("✅ Task added!");
        setIsVisible(true);
        setFeedbackType("add");
        setPriority("medium");  // reset to default priority
    };

    /* -------------------- SEARCH + TAG FILTER -------------------- */
    const searchedTodos = filteredTodos(searchTerm);
    const visibleTodos = selectedTag
        ? searchedTodos.filter(todo => todo.tags?.includes(selectedTag))
        : searchedTodos;

    /* -------------------- SORTING -------------------- */
    const sortedTodos = [...visibleTodos].sort((a, b) => {
        // Completed todos go last
        if (a.done !== b.done) {
            return a.done ? 1 : -1;
        }

        // sort by priority
        const pa = PRIORITY_ORDER[a.priority] ?? 0;
        const pb = PRIORITY_ORDER[b.priority] ?? 0;

        return pb - pa;
    });

    /* -------------------- EFFECTS -------------------- */
    useCountAnimation(completedRef, completedCount);
    useAutosizeTextArea(textAreaRef, newTodo);

    useEffect(() => {
        if (!feedback) return;

        const hideTimer = setTimeout(() => setIsVisible(false), 1500);
        const clearTimer = setTimeout(() => setFeedback(""), 2000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(clearTimer);
        };
    }, [feedback]);

    const saveTodo = () => {
        if (!newTodo.trim()) return;
        handleAdd();
    };

    const handleKeyDown = useCtrlEnterSave(textAreaRef, saveTodo, null);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>📝 Todo List</h1>

                {/* Active tag filter */}
                {selectedTag && (
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-sm opacity-70">Filtering by tag:</span>
                        <span className={styles.activeTag}>#{selectedTag}</span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={styles.tag}
                        >
                            Clear
                        </button>
                    </div>
                )}

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search tasks..."
                        className={styles.searchInput}
                    />
                </div>

                {/* New todo input */}
                <div className="mb-6 w-full flex flex-col gap-2">
                    {/* Input */}
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a new task (#tags)"
                        className={styles.newTodoInput}
                    />

                    {/* Dropdowns */}
                    <div className="flex gap-2 w-full">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`${styles.categorySelect} flex-1`}
                        >
                            <option value="">No category</option>
                            <option value="Work">Work</option>
                            <option value="Home">Home</option>
                            <option value="Study">Study</option>
                            <option value="Shopping">Shopping</option>
                        </select>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={`${styles.categorySelect} flex-1`}
                        >
                            <option value="">No priority</option>
                            {PRIORITIES.map((p) => (
                                <option key={p} value={p}>
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add button */}
                    <Button
                        variant="sky"
                        onClick={handleAdd}
                        className="w-full mt-2"
                    >
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
                    {sortedTodos.length === 0 ? (
                        <li className={styles.emptyState}>No tasks found</li>
                    ) : (
                        sortedTodos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                setFeedback={setFeedback}
                                setIsVisible={setIsVisible}
                                setFeedbackType={setFeedbackType}
                                onTagClick={setSelectedTag}
                                PRIORITIES={PRIORITIES}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );

}

export default TodoPage;
