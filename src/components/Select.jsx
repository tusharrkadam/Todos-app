import React, { useId } from "react";

const Select = React.forwardRef(function Select(
    { options, label, className = "", id, ...props }, 
    ref
) {
    const generatedId = useId();
    const selectId = id || generatedId; // जर `id` दिले नसेल, तर `useId()` वापरा.

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={selectId} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}
            <select
                {...props}
                id={selectId} // आता हे नेहमी युनिक असेल.
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
