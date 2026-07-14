function Button({ text, type = "button", disabled = false, onClick, className = "" }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ${className}`}
        >
            {text}
        </button>
    );
}

export default Button;