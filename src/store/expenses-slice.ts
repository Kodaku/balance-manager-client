import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense, ExpenseInitialState } from "../types";

const initialState: ExpenseInitialState = {
    expenses: [],
    currentExpense: {
        id: -1,
        amount: 0.0,
        date: "",
        description: "",
        debit: true,
        balanceId: -1,
        categoryId: -1,
    },
};

const expensesSlice = createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
        replaceExpenses(state, action: PayloadAction<{ expenses: Expense[] }>) {
            const expenses = action.payload.expenses;
            if (expenses) {
                state.expenses = expenses;
            }
        },
        addExpense(state, action: PayloadAction<{ expense: Expense }>) {
            const expense = action.payload.expense;
            state.expenses.push({
                id: expense.id,
                amount: expense.amount,
                date: expense.date,
                description: expense.description,
                debit: expense.debit,
                balanceId: expense.balanceId,
                categoryId: expense.categoryId,
            });
        },
        updateExpense(state, action: PayloadAction<{ expense: Expense }>) {
            const newExpense = action.payload.expense;
            const oldExpenseIndex = state.expenses.findIndex(
                (expense) => expense.id === newExpense.id
            );
            state.expenses[oldExpenseIndex] = newExpense;
            console.log("New Expense: ", state.expenses[oldExpenseIndex]);
        },
        getExpense(state, action: PayloadAction<{ id: number }>) {
            const id = action.payload.id;
            const expense = state.expenses.find((expense) => expense.id === id);
            if (expense) {
                state.currentExpense = expense;
            }
        },
        removeExpense(state, action: PayloadAction<{ id: number }>) {
            const id = action.payload.id;
            state.expenses = state.expenses.filter(
                (expense) => expense.id !== id
            );
        },
    },
});

const expensesActions = expensesSlice.actions;

export { expensesActions, expensesSlice };
