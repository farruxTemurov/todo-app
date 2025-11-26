import { useEffect } from "react";

export default function useAutosizeTextArea(textAreaRef, value) {
    useEffect(() => {
        const el = textAreaRef.current;
        if (!el) return;

        // Reset height
        el.style.height = "auto";

        // Set height to match content
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);
}
