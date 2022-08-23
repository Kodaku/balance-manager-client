import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/categories-actions";
import { getExpense, updateExpense } from "../../store/expenses-actions";
import { ExpenseParams } from "../../types";
import {
    filterCategories,
    getRequiredDate,
} from "../../utils/expense-components-utilities";
import CategoriesOptions from "../categories/CategoriesOptions";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import CheckboxUpdate from "../UI/forms/update/CheckboxUpdate";
import InputUpdate from "../UI/forms/update/InputUpdate";
import SelectUpdate from "../UI/forms/update/SelectUpdate";
import TextAreaUpdate from "../UI/forms/update/TextAreaUpdate";

const ExpenseUpdate = () => {
    const categories = useAppSelector((state) => state.categories.categories);
    const currentExpense = useAppSelector(
        (state) => state.expenses.currentExpense
    );
    const [amount, setAmount] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [debit, setDebit] = useState<boolean>(true);
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
        if (params.id) {
            dispatch(getExpense(parseInt(params.id)));
            setAmount(currentExpense.amount.toString());
            setDate(currentExpense.date);
            setDescription(currentExpense.description);
            setCategoryId(currentExpense.categoryId!);
            setDebit(currentExpense.debit);
        }
    }, [dispatch, params, currentExpense]);

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const areCurrentsOk =
            amountRef.current &&
            dateRef.current &&
            descriptionRef.current &&
            categoryRef.current &&
            debitRef.current;
        if (areCurrentsOk && params.id) {
            if (
                parseFloat(amountRef.current.value) > 0 &&
                dateRef.current.value !== null &&
                descriptionRef.current.value !== null &&
                categoryRef.current.value !== null &&
                debitRef.current.value !== null
            ) {
                dispatch(
                    updateExpense(parseInt(categoryRef.current.value), {
                        id: currentExpense.id,
                        amount: parseFloat(amountRef.current.value),
                        date: dateRef.current.value,
                        description: descriptionRef.current.value,
                        debit: debitRef.current.checked,
                    })
                );
                navigate(
                    `/users/balances/expenses/${params.balanceId}/${params.userId}`
                );
            }
        }
    };

    const categoryChangeHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategoryId(parseInt(event.target.value));
    };

    const debitChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebit(event.target.checked);
    };

    return (
        <Fragment>
            <h2>Expense Update</h2>
            <form onSubmit={onSubmitHandler}>
                <InputUpdate
                    ref={amountRef}
                    defaultValue={amount.toString()}
                    text="Amount"
                    type="number"
                />
                <InputUpdate
                    ref={dateRef}
                    defaultValue={getRequiredDate(date)}
                    type="date"
                    text="Date"
                />
                <TextAreaUpdate
                    ref={descriptionRef}
                    defaultValue={description}
                    text="Description"
                />
                <SelectUpdate
                    ref={categoryRef}
                    options={[<CategoriesOptions key={0} />]}
                    text="Category"
                    onChange={categoryChangeHandler}
                    value={filterCategories(categories, categoryId)}
                />
                <CheckboxUpdate
                    ref={debitRef}
                    checked={debit}
                    onChange={debitChangeHandler}
                    text="Debit"
                />
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

export default ExpenseUpdate;
