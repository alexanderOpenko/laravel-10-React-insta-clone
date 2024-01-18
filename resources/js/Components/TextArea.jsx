import { useEffect, useRef } from 'react';

export default function TextArea({ type = 'text', className = '', isFocused = false, ...props }) {
    const input = useRef(null);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
};
