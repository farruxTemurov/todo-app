import { useRef, useState, useLayoutEffect, useEffect } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import useCtrlEnterSave from "../hooks/useCtrlEnterSave";

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
        if (!editedText.trim()) return;

        await editTodo(todo._id, editedText.trim());
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
        <li className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 
                   px-4 py-2 rounded-xl shadow-sm hover:shadow-md 
                   transition-all duration-200 border border-transparent 
                   hover:border-gray-200 dark:hover:border-gray-600">

            {isEditing ? (
                <div ref={editorRef} className="flex-1 flex items-center gap-2">
                    <textarea
                        ref={textAreaRef}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300
                       dark:border-gray-600 dark:bg-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-sm transition resize-none overflow-hidden"
                        autoFocus={isEditing}
                        rows={1}
                    />
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg
                       hover:bg-blue-600 active:scale-95 transition-transform"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-lg
                       hover:bg-red-600 active:scale-95 transition-transform"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <>
                    <span
                        onClick={handleToggle}
                        className={`flex-1 cursor-pointer select-none text-sm sm:text-base transition
                        ${todo.done
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"}`}
                    >
                        {todo.text}
                    </span>

                    <div className="flex gap-2 ml-3">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-lg
                           hover:bg-red-600 active:scale-95 transition-transform"
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 text-gray-900 px-3 py-1.5 text-sm rounded-lg
                           hover:bg-yellow-500 active:scale-95 transition-transform"
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
