import React, { useState } from "react";

const TodoItem = ({ todo, dispatch, setFeedback, setIsVisible, setFeedbackType }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleSave = () => {
        dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: editedText } });
        setIsEditing(false);
        setFeedback("✏️ Task updated!");
        setIsVisible(true);
        setFeedbackType("edit");
    };

    return (
        <li
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 
             px-4 py-2 rounded-xl shadow-sm hover:shadow-md 
             transition-all duration-200 border border-transparent 
             hover:border-gray-200 dark:hover:border-gray-600"
        >
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="flex-1 mr-2 px-3 py-1.5 rounded-lg border border-gray-300 
                 dark:border-gray-600 dark:bg-gray-800 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 text-sm transition"
                    autoFocus
                />
            ) : (
                <span
                    onClick={() => {
                        dispatch({ type: "TOGGLE_TODO", payload: todo.id });
                        setFeedback(todo.done ? "⏳ Marked incomplete" : "🎉 Task completed!");
                        setIsVisible(true);
                        setFeedbackType("toggle");
                    }}
                    className={`flex-1 cursor-pointer select-none text-sm sm:text-base transition 
        ${todo.done
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"}`}
                >
                    {todo.text}
                </span>
            )}

            <div className="flex gap-2 ml-3">
                <button
                    onClick={() => {
                        dispatch({ type: "DELETE_TODO", payload: todo.id });
                        setFeedback("🗑️ Task deleted!");
                        setIsVisible(true);
                        setFeedbackType("delete");
                    }}
                    className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-lg 
                 hover:bg-red-600 active:scale-95 transition-transform"
                >
                    Delete
                </button>

                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg 
                   hover:bg-blue-600 active:scale-95 transition-transform"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-yellow-400 text-gray-900 px-3 py-1.5 text-sm rounded-lg 
                   hover:bg-yellow-500 active:scale-95 transition-transform"
                    >
                        Edit
                    </button>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
