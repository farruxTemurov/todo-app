import { useRef, useState, useLayoutEffect, useEffect } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import useCtrlEnterSave from "../hooks/useCtrlEnterSave";
import { todoStyles } from "../styles/todoStyles";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo, setFeedback, setIsVisible, setFeedbackType }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const textAreaRef = useRef(null);
    const cancelEdit = () => {
        setEditedText(todo.text); // revert to original
        setIsEditing(false);      // hide textarea
    };
    const editorRef = useRef(null);

    const handleKeyDown = useCtrlEnterSave(textAreaRef, handleSave, editedText, cancelEdit);

    // Hook to resize textarea while typing
    useAutosizeTextArea(textAreaRef, editedText);

    // Resize immediately when entering edit mode
    useLayoutEffect(() => {
        if (!isEditing) return;

        const textarea = textAreaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        textarea.focus();

        requestAnimationFrame(() => {
            if (textarea && typeof textarea.setSelectionRange === "function") {
                const length = textarea.value.length;
                textarea.setSelectionRange(length, length);
            }
        });
    }, [isEditing]);

    useEffect(() => {
        if (!isEditing) return;

        const handleClickOutside = (e) => {
            if (editorRef.current && !editorRef.current.contains(e.target)) {
                cancelEdit();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    async function handleSave() {
        const trimmed = editedText.trim();
        //If text is empty → do nothing
        if (!trimmed) return;

        // If no real change → exit edit mode silently
        if (trimmed === todo.text.trim()) {
            setIsEditing(false);
            return;
        }
        // Real change → update and show feedback
        await editTodo(todo._id, trimmed);
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
                        autoFocus={isEditing}
                        rows={1}
                    />

                    <button onClick={handleSave} className={todoStyles.btnSave}>
                        Save
                    </button>

                    <button onClick={handleDelete} className={todoStyles.btnDelete}>
                        Delete
                    </button>
                </div>
            ) : (
                <>
                    <span
                        onClick={handleToggle}
                        className={`${todoStyles.todoText} ${todo.done ? todoStyles.todoTextDone : todoStyles.todoTextActive
                            }`}
                    >
                        {todo.text}
                    </span>

                    <div className={todoStyles.btnGroup}>
                        <button onClick={handleDelete} className={todoStyles.btnDelete}>
                            Delete
                        </button>

                        <button
                            onClick={() => setIsEditing(true)}
                            className={todoStyles.btnEdit}
                        >
                            Edit
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
