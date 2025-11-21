import { useEffect } from "react";

export default function useCountAnimation(ref, trigger) {
    useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;

        // Apply animation
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        el.style.transform = "scale(1.3)";
        el.style.opacity = "0.6";

        // Reset animation
        const timeout = setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.opacity = "1";
        }, 300);

        return () => clearTimeout(timeout);
    }, [trigger]);
}
