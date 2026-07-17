function Button({ text, type = "button", disabled = false, onClick, className = "", variant = "primary" }) {
    const base = "relative w-full font-semibold py-4 px-6 rounded-xl text-base transition-all duration-200 focus-ring cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 active:scale-[0.98]",
        secondary: "bg-white/[0.06] text-slate-200 border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-[0.98]",
        danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 active:scale-[0.98]",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
        >
            {disabled && variant === "primary" && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </span>
            )}
            <span className={disabled && variant === "primary" ? "opacity-0" : ""}>{text}</span>
        </button>
    );
}

export default Button;
