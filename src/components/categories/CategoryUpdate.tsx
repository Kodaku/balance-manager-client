import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getCategory, updateCategory } from "../../store/categories-actions";
import { CategoryParams } from "../../types";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputUpdate from "../UI/forms/update/InputUpdate";

const CategoryUpdate = () => {
    const params = useParams<CategoryParams>();
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(
        (state) => state.categories.currentCategory
    );
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [categoryName, setCategoryName] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            console.log(currentCategory);
            dispatch(getCategory(parseInt(params.id)));
            // console.log(currentCategory);
            setCategoryName(currentCategory.name);
        }
    }, [dispatch, params, currentCategory]);

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current) {
            dispatch(
                updateCategory({
                    id: currentCategory.id,
                    name: nameInputRef.current.value,
                })
            );
            navigate("/categories");
            // console.log(nameInputRef.current.value);
        }
    };

    return (
        <Fragment>
            <h2>Update a Category</h2>
            <form onSubmit={onSubmitHandler}>
                <InputUpdate
                    ref={nameInputRef}
                    defaultValue={categoryName}
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

export default CategoryUpdate;
