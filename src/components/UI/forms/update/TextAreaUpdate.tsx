import React from "react";

const TextAreaUpdate = React.forwardRef<
    HTMLTextAreaElement,
    { text: string; defaultValue: string }
>(({ text, defaultValue }, ref) => {
    return (
        <div className="col-12">
            <label className="form-label">{text}</label>
            <textarea
                ref={ref}
                className="form-control"
                defaultValue={defaultValue}
            ></textarea>
        </div>
    );
});

export default TextAreaUpdate;
