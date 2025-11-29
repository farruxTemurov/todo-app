import { useCallback } from "react";

export default function useCtrlEnterSave(ref, callback, value, cancelCallback) {
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            callback(); // save
            if (ref.current) ref.current.style.height = "auto";
        }

        if (e.key === "Escape" && cancelCallback) {
            e.preventDefault();
            cancelCallback(); // cancel
        }
    }, [callback, cancelCallback]);

    return handleKeyDown;
}
