import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addCategory } from "../../store/categories-actions";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputCreate from "../UI/forms/create/InputCreate";

const CategoryCreate = () => {
    const dispatch = useAppDispatch();
    const nameInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current)
            dispatch(addCategory({ name: nameInputRef.current.value }));
        navigate("/categories");
    };
    return (
        <Fragment>
            <h2>Create a Category</h2>
            <form onSubmit={onFormSubmit}>
                <InputCreate
                    ref={nameInputRef}
                    text="Category Name"
                    type="text"
                />
                <div className="row">
                    <ButtonSubmit />
                    <div className="col-1"></div>
                    <ButtonCancel routePath="/categories" />
                </div>
            </form>
        </Fragment>
    );
};

export default CategoryCreate;
