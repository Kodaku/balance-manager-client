import React from "react";

interface Props {
    options: JSX.Element[];
}

const SelectCreate = React.forwardRef<HTMLSelectElement, Props>(
    ({ options }, ref) => {
        return (
            <div className="col-md-4">
                <label className="form-label">Category</label>
                <select ref={ref} className="form-select">
                    {options}
                </select>
            </div>
        );
    }
);

export default SelectCreate;
