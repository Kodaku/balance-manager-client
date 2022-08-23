import axios from "axios";
import { usersActions } from "./users-slice";
import { HOST } from "../data/constants";
import { User } from "../types";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export const fetchUsers = (): ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
> => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axios.get(HOST + "/api/users");

            const data = await response.data;
            return data as User[];
        };

        const usersData = await fetchData();
        console.log(usersData);
        dispatch(
            usersActions.replaceUsers({
                users: usersData || [],
            })
        );
    };
};

export const addSingleUser = (
    user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const addData = async () => {
            const response = await axios.post(HOST + "/api/users", user);

            const data = response.data;
            console.log(data);
            return data as User;
        };

        const userResp = await addData();

        dispatch(usersActions.addUser({ user: userResp }));
    };
};

export const updateUser = (
    newUser: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const updateData = async () => {
            console.log(newUser);
            const response = await axios.put(
                `${HOST}/api/users/${newUser.id}`,
                newUser
            );
            const data = response.data;
            console.log("User updated");
            return data;
        };

        const userResp = await updateData();

        dispatch(usersActions.updateUser({ user: userResp }));
    };
};

export const deleteUser = (
    userId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const deleteData = async () => {
            const response = await axios.delete(
                `${HOST}/api/users/${userId}`
            );

            const data = response.data;
            console.log(data);
            return data;
        };

        await deleteData();

        dispatch(usersActions.removeUser({ id: userId }));
    };
};

export const getUser = (
    userId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(`${HOST}/api/users/${userId}`);

            const data = response.data;
            // console.log(data);
            return data;
        };

        const userResp = (await getData()) as User;
        // console.log(userResp);
        if (userResp.id) dispatch(usersActions.getUser({ id: userResp.id }));
    };
};
