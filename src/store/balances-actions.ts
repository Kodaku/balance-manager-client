import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { HOST } from "../data/constants";
import { Balance } from "../types";
import { balancesActions } from "./balances-slice";

export const fetchBalances = (
    userId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axios.get(
                HOST + `/api/users/balances/${userId}`
            );
            const data = await response.data;
            return data as Balance[];
        };
        const balancesData = await fetchData();

        console.log(balancesData);
        dispatch(
            balancesActions.replaceBalances({
                balances: balancesData || [],
            })
        );
    };
};

export const addBalance = (
    userId: number,
    balance: Balance
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const addData = async () => {
            const response = await axios.post(
                HOST + `/api/balances/${userId}`,
                balance
            );

            const data = await response.data;
            return data as Balance;
        };

        const balanceResp = await addData();
        dispatch(
            balancesActions.addBalance({
                balance: balanceResp,
            })
        );
    };
};

export const updateBalance = (
    newBalance: Balance
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const updateData = async () => {
            const response = await axios.put(
                HOST + `/api/balances/${newBalance.id}`,
                newBalance
            );

            const data = await response.data;
            return data as Balance;
        };

        const balanceResp = await updateData();
        dispatch(
            balancesActions.updateBalance({
                balance: balanceResp,
            })
        );
    };
};

export const getBalance = (
    balanceId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(
                HOST + `/api/balances/${balanceId}`
            );
            const data = response.data;
            return data as Balance;
        };

        const balanceResp = await getData();
        if (balanceResp.id)
            dispatch(balancesActions.getBalance({ id: balanceResp.id }));
    };
};

export const deleteBalance = (
    balanceId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const deleteData = async () => {
            const response = await axios.delete(
                HOST + `/api/balances/${balanceId}`
            );
            const data = await response.data;
            console.log(data);
        };

        await deleteData();
        dispatch(balancesActions.removeBalance({ id: balanceId }));
    };
};
