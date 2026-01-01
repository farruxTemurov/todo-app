import { useRef, useState, useLayoutEffect, useEffect } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import useCtrlEnterSave from "../hooks/useCtrlEnterSave";
import { todoStyles } from "../styles/todoStyles";

const TodoItem = ({
    todo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFeedback,
    setIsVisible,
    setFeedbackType,
    onTagClick,
    PRIORITIES,
    todoPriority
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);
    const [priority, setPriority] = useState(todo.priority || "medium");

    const textAreaRef = useRef(null);
    const editorRef = useRef(null);

    /* -------------------- EDIT HELPERS -------------------- */
    const cancelEdit = () => {
        setEditedText(todo.text);
        setIsEditing(false);
    };

    const handleKeyDown = useCtrlEnterSave(
        textAreaRef,
        handleSave,
        cancelEdit
    );

    useAutosizeTextArea(textAreaRef, editedText);

    /* Resize + focus on edit */
    useLayoutEffect(() => {
        if (!isEditing) return;

        const textarea = textAreaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.focus();

        requestAnimationFrame(() => {
            const len = textarea.value.length;
            textarea.setSelectionRange(len, len);
        });
    }, [isEditing]);

    /* Click outside → cancel edit */
    useEffect(() => {
        if (!isEditing) return;

        const handleClickOutside = (e) => {
            if (editorRef.current && !editorRef.current.contains(e.target)) {
                cancelEdit();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);

    /* -------------------- ACTIONS -------------------- */
    async function handleSave() {
        const trimmed = editedText.trim();
        if (!trimmed) return;

        if (trimmed === todo.text.trim()) {
            setIsEditing(false);
            return;
        }

        await editTodo(todo._id, { text: trimmed });
        setIsEditing(false);
        setFeedback("✏️ Task updated!");
        setIsVisible(true);
        setFeedbackType("edit");
    }

    async function handleToggle() {
        await toggleTodo(todo._id, !todo.done);
        setFeedback(todo.done ? "⏳ Marked incomplete" : "🎉 Task completed!");
        setIsVisible(true);
        setFeedbackType("toggle");
    }

    async function handleDelete() {
        await deleteTodo(todo._id);
        setFeedback("🗑️ Task deleted!");
        setIsVisible(true);
        setFeedbackType("delete");
    }

    const handlePriorityChange = async (e) => {
        const newPriority = e.target.value;
        setPriority(newPriority);
        await editTodo(todo._id, { priority: newPriority });
    };


    /* -------------------- UI -------------------- */
    return (
        <li className={todoStyles.todoItemContainer}>
            {isEditing ? (
                <div ref={editorRef} className={todoStyles.editContainer}>
                    <textarea
                        ref={textAreaRef}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={todoStyles.editTextarea}
                        rows={1}
                    />

                    <div className={todoStyles.btnGroup}>
                        <button onClick={handleSave} className={todoStyles.btnSave}>
                            Save
                        </button>
                        <button onClick={cancelEdit} className={todoStyles.btnEdit}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Todo text */}
                    <div className="flex-1 min-w-0">
                        {/* Text */}
                        <span
                            onClick={handleToggle}
                            className={`${todoStyles.todoText} ${todo.done ? todoStyles.todoTextDone : todoStyles.todoTextActive
                                }`}
                        >
                            {todo.text}
                        </span>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {todo.category && (
                                <span className={todoStyles.categoryBadge}>
                                    {todo.category}
                                </span>
                            )}

                            {todo.tags?.map(tag => (
                                <span
                                    key={tag}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTagClick(tag);
                                    }}
                                    className={todoStyles.tag}
                                >
                                    #{tag}
                                </span>
                            ))}
                            <select
                                value={priority}
                                onChange={handlePriorityChange}
                                className={todoStyles.categorySelect}
                            >
                                {PRIORITIES.map(p => (
                                    <option key={p} value={p}>
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className={todoStyles.btnGroup}>
                        <button onClick={handleDelete} className={todoStyles.btnDelete}>
                            Delete
                        </button>
                        <button onClick={() => setIsEditing(true)} className={todoStyles.btnEdit}>
                            Edit
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
