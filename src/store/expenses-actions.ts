import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { HOST } from "../data/constants";
import { Expense } from "../types";
import { expensesActions } from "./expenses-slice";

export const fetchExpenses = (
    balanceId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axios.get(
                HOST + `/api/balances/expenses/${balanceId}`
            );

            const data = await response.data;
            return data as Expense[];
        };

        const expenses = await fetchData();
        dispatch(
            expensesActions.replaceExpenses({
                expenses: expenses || [],
            })
        );
    };
};

export const getExpense = (
    expenseId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(
                HOST + `/api/expenses/${expenseId}`
            );
            const data = await response.data;
            return data as Expense;
        };

        const expenseResp = await getData();
        if (expenseResp.id)
            dispatch(
                expensesActions.getExpense({
                    id: expenseResp.id,
                })
            );
    };
};

export const addExpense = (
    balanceId: number,
    categoryId: number,
    expense: Expense
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const addData = async () => {
            const response = await axios.post(
                HOST + `/api/expenses/${balanceId}/${categoryId}`,
                expense
            );
            const data = await response.data;
            console.log(data);
            return data as Expense;
        };

        const expenseResp = await addData();
        dispatch(
            expensesActions.addExpense({
                expense: expenseResp,
            })
        );
    };
};

export const updateExpense = (
    categoryId: number,
    expense: Expense
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const updateData = async () => {
            const response = await axios.put(
                HOST + `/api/expenses/${expense.id}/${categoryId}`,
                expense
            );
            const data = await response.data;
            return data as Expense;
        };
        const expenseResp = await updateData();
        dispatch(
            expensesActions.updateExpense({
                expense: expenseResp,
            })
        );
    };
};

export const deleteExpense = (
    expenseId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const deleteData = async () => {
            const response = await axios.delete(
                HOST + `/api/expenses/${expenseId}`
            );
            const data = await response.data;
            console.log(data);
            // return data;
        };
        await deleteData();
        dispatch(
            expensesActions.removeExpense({
                id: expenseId,
            })
        );
    };
};
