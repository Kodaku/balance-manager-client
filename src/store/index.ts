import { configureStore } from "@reduxjs/toolkit";
import { balancesSlice } from "./balances-slice";
import { categoriesSlice } from "./categories-slice";
import { expensesSlice } from "./expenses-slice";
import { usersSlice } from "./users-slice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        balances: balancesSlice.reducer,
        categories: categoriesSlice.reducer,
        expenses: expensesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
