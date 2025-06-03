import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, className = '', required=false }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        />
    );
};

export default Input;