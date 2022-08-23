import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserInitialState } from "../types";

const initialState: UserInitialState = {
    users: [],
    currentUser: {
        id: -1,
        name: "",
    },
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        replaceUsers(state, action: PayloadAction<{ users: User[] }>) {
            const users = action.payload.users;
            if (users) {
                state.users = users;
                // console.log(state.users[0]);
            }
        },
        addUser(state, action: PayloadAction<{ user: User }>) {
            const user = action.payload.user;
            state.users.push({
                id: user.id,
                name: user.name,
            });
        },
        updateUser(state, action: PayloadAction<{ user: User }>) {
            const newUser = action.payload.user;
            // console.log(newUser);
            // newUser.executedQuizzes = action.payload.user.executedQuizzes;
            const oldUserIndex = state.users.findIndex(
                (user) => newUser.id === user.id
            );
            state.users[oldUserIndex] = newUser;
            console.log("New User name: ", state.users[oldUserIndex].name);
        },
        getUser(state, action: PayloadAction<{ id: number }>) {
            const userId = action.payload.id;

            const foundUser = state.users.find((user) => {
                return user.id === userId;
            });
            console.log("User found: ", foundUser?.name);
            if (foundUser) {
                state.currentUser = foundUser;
            }
            // console.log(state.currentUser);
        },
        removeUser(state, action: PayloadAction<{ id: number }>) {
            const userId = action.payload.id;
            state.users = state.users.filter((user) => user.id !== userId);
        },
    },
});

const usersActions = usersSlice.actions;

export { usersSlice, usersActions };
