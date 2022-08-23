import React from "react";

const CheckboxUpdate = React.forwardRef<
    HTMLInputElement,
    {
        text: string;
        checked: boolean;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
    }
>(({ text, checked, onChange }, ref) => {
    return (
        <div className="col-12">
            <div className="form-check">
                <input
                    ref={ref}
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <label className="form-check-label">{text}</label>
            </div>
        </div>
    );
});

export default CheckboxUpdate;
