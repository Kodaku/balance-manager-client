import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Balance, BalanceInitialState } from "../types";

const balanceInitialState: BalanceInitialState = {
    balances: [],
    currentBalance: {
        id: -1,
        name: "",
        userId: -1
    },
};

const balancesSlice = createSlice({
    name: "balances",
    initialState: balanceInitialState,
    reducers: {
        replaceBalances(state, action: PayloadAction<{ balances: Balance[] }>) {
            const balances = action.payload.balances;
            if (balances) {
                state.balances = balances;
            }
        },
        addBalance(state, action: PayloadAction<{ balance: Balance }>) {
            const balance = action.payload.balance;
            state.balances.push({
                id: balance.id,
                name: balance.name,
                userId: balance.userId
            });
        },
        updateBalance(state, action: PayloadAction<{ balance: Balance }>) {
            const newBalance = action.payload.balance;
            const oldBalanceIndex = state.balances.findIndex((balance) => {
                return balance.id === newBalance.id;
            });
            if (oldBalanceIndex) {
                state.balances[oldBalanceIndex] = newBalance;
                console.log(
                    "New Balance: ",
                    state.balances[oldBalanceIndex].name
                );
            }
        },
        getBalance(state, action: PayloadAction<{ id: number }>) {
            const balanceId = action.payload.id;
            const balance = state.balances.find(
                (currentBalance) => currentBalance.id === balanceId
            );
            if (balance) {
                state.currentBalance = balance;
                console.log("Current Balance: ", state.currentBalance.name);
            }
        },
        removeBalance(state, action: PayloadAction<{id: number}>) {
            const balanceId = action.payload.id;
            state.balances = state.balances.filter(balance => balance.id !== balanceId)
        }
    },
});

const balancesActions = balancesSlice.actions;

export { balancesSlice, balancesActions };
