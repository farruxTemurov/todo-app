import { useCallback } from "react";

export default function useCtrlEnterSave(ref, callback, cancelCallback) {
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) return; // allow newline
            e.preventDefault();
            callback();
            if (ref.current) ref.current.style.height = "auto";
        }

        if (e.key === "Escape" && cancelCallback) {
            e.preventDefault();
            cancelCallback(); // cancel
        }
    }, [callback, cancelCallback]);

    return handleKeyDown;
}
