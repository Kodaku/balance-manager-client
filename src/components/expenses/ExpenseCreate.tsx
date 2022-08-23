import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/categories-actions";
import { addExpense } from "../../store/expenses-actions";
import { ExpenseParams } from "../../types";
import CategoriesOptions from "../categories/CategoriesOptions";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import CheckboxCreate from "../UI/forms/create/CheckboxCreate";
import InputCreate from "../UI/forms/create/InputCreate";
import SelectCreate from "../UI/forms/create/SelectCreate";
import TextAreaCreate from "../UI/forms/create/TextAreaCreate";

const ExpenseCreate = () => {
    const dispatch = useAppDispatch();
    const params = useParams<ExpenseParams>();
    const amountRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const debitRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const areCurrentsOk =
            amountRef.current &&
            dateRef.current &&
            descriptionRef.current &&
            categoryRef.current &&
            debitRef.current;
        if (areCurrentsOk && params.balanceId) {
            if (
                parseFloat(amountRef.current.value) > 0 &&
                dateRef.current.value !== null &&
                descriptionRef.current.value !== null &&
                categoryRef.current.value !== null &&
                debitRef.current.value !== null
            ) {
                dispatch(
                    addExpense(
                        parseInt(params.balanceId),
                        parseInt(categoryRef.current.value),
                        {
                            amount: parseFloat(amountRef.current.value),
                            date: dateRef.current.value,
                            description: descriptionRef.current.value,
                            debit: debitRef.current.checked,
                        }
                    )
                );
                navigate(
                    `/users/balances/expenses/${params.balanceId}/${params.userId}`
                );
            }
        }
    };

    return (
        <Fragment>
            <h2>Expense Create</h2>
            <form onSubmit={onSubmitHandler}>
                <InputCreate ref={amountRef} text="Amount" type="number" />
                <InputCreate ref={dateRef} text="Date" type="date" />
                <TextAreaCreate ref={descriptionRef} text="Description" />
                <SelectCreate
                    ref={categoryRef}
                    options={[<CategoriesOptions />]}
                />
                <br />
                <CheckboxCreate ref={debitRef} text="Debit" />
                <br />
                <div className="row">
                    <ButtonSubmit />
                    <div className="col-1"></div>
                    <ButtonCancel
                        routePath={`/users/balances/expenses/${params.balanceId}/${params.userId}`}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default ExpenseCreate;
