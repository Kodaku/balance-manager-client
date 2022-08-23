import React from "react";

const SelectUpdate = React.forwardRef<
    HTMLSelectElement,
    {
        text: string;
        value: number | undefined;
        onChange: React.ChangeEventHandler<HTMLSelectElement>;
        options: JSX.Element[];
    }
>(({ text, value, onChange, options }, ref) => {
    return (
        <div className="col-md-4">
            <label className="form-label">{text}</label>
            <select
                ref={ref}
                value={value}
                onChange={onChange}
                className="form-select"
            >
                {options}
            </select>
        </div>
    );
});

export default SelectUpdate;
