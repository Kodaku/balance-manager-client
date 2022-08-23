import React from "react";

interface Props {
    text: string;
}

const CheckboxCreate = React.forwardRef<HTMLInputElement, Props>(({ text }, ref) => {
    return (
        <div className="col-12">
            <div className="form-check">
                <input ref={ref} className="form-check-input" type="checkbox" />
                <label className="form-check-label">{text}</label>
            </div>
        </div>
    );
});

export default CheckboxCreate;
