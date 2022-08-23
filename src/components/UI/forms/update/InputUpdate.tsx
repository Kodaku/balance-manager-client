import React from "react";

const InputUpdate = React.forwardRef<
    HTMLInputElement,
    { defaultValue: string; text: string; type: string }
>(({ defaultValue, text, type }, ref) => {
    return (
        <div className="row mb-3">
            <div className="col-2">
                <label className="form-label">{text}</label>
            </div>
            <div className="col-3">
                <input
                    type={type}
                    defaultValue={defaultValue}
                    ref={ref}
                    className="col-3 form-control"
                    // onChange={() => {}}
                />
            </div>
        </div>
    );
});

export default InputUpdate;
