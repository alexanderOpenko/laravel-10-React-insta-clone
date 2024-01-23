import { useRef } from "react";

export default function TransparentButton({ className = '', disableAutofocus = true, disabled, children, ...props }) {
    const deleteButton = useRef(null)

    const removeFocus = () => {
        disableAutofocus && deleteButton.current.blur()
    }

    return (
        <button
            {...props}
            className={
                `bg-transparent font-semibold border-none hover:bg-slate-200 rounded-md px-3
                ${
                    disabled && 'opacity-25'
                } ` + className
            }
            ref={deleteButton}
            onFocus={removeFocus}
            disabled={disabled}
        >
            {children}
        </button>
    );
}