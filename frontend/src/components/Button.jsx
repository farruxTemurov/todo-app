export default function Button({
    children,
    variant = "default",
    disabled = false,
    className = "",
    ...props
}) {
    const baseStyles = `
    px-4 py-2
    rounded-2xl
    font-medium
    transition-all
    duration-200
    active:scale-95
    shadow-sm
    flex items-center justify-center
  `;

    const variants = {
        default: "bg-gray-200 text-black hover:bg-gray-300",
        sky: "bg-sky-600 text-white hover:bg-sky-700",
        red: "bg-red-500 text-white hover:bg-red-600",
        darkYellow: "bg-yellow-600 text-white hover:bg-yellow-700"
    };

    return (
        <button
            {...props}
            disabled={disabled}
            className={`
        ${baseStyles}
        ${variants[variant] || variants.default}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
        >
            {children}
        </button>
    );
}
