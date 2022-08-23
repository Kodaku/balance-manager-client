import React from "react";

const TextAreaCreate = React.forwardRef<HTMLTextAreaElement, { text: string }>(
    ({ text }, ref) => {
        return (
            <div className="col-12">
                <label className="form-label">{text}</label>
                <textarea ref={ref} className="form-control"></textarea>
            </div>
        );
    }
);

export default TextAreaCreate;
