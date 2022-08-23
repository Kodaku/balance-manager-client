import React from "react";

interface Props {
    text: string;
    type: string;
}

const InputCreate = React.forwardRef<HTMLInputElement, Props>(
    ({ text, type }, ref) => {
        return (
            <div className="row mb-3">
                <div className="col-2">
                    <label className="form-label">{text}:</label>
                </div>
                <div className="col-3">
                    <input
                        ref={ref}
                        type={type}
                        className="col-3 form-control"
                        step=".01"
                    />
                </div>
            </div>
        );
    }
);

export default InputCreate;
