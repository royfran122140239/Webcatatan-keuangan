import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-700 text-white",
        secondary: "bg-gray-500 hover:bg-gray-700 text-white",
        danger: "bg-red-500 hover:bg-red-700 text-white",
        success: "bg-green-500 hover:bg-green-700 text-white",
        ghost: "bg-transparent hover:bg-gray-100 text-blue-500 border border-blue-500"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;