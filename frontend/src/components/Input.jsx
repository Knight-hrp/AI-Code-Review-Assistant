function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    className = "",
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
}

export default Input;