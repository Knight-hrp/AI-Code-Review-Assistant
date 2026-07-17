function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    required = false,
    className = "",
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            className={`w-full px-5 py-4 rounded-xl text-base text-white placeholder-slate-500 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 ${className}`}
        />
    );
}

export default Input;
