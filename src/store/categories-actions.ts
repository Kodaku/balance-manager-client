import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { HOST } from "../data/constants";
import { Category } from "../types";
import { categoriesActions } from "./categories-slice";

export const fetchCategories = (): ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
> => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axios.get(HOST + `/api/categories`);
            const data = await response.data;
            return data as Category[];
        };
        const categoriesData = await fetchData();

        console.log(categoriesData);
        dispatch(
            categoriesActions.replaceCategories({
                categories: categoriesData || [],
            })
        );
    };
};

export const addCategory = (
    category: Category
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const addData = async () => {
            const response = await axios.post(
                HOST + `/api/categories`,
                category
            );

            const data = await response.data;
            return data as Category;
        };

        const categoryResp = await addData();
        dispatch(
            categoriesActions.addCategory({
                category: categoryResp,
            })
        );
    };
};

export const updateCategory = (
    newCategory: Category
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const updateData = async () => {
            const response = await axios.put(
                HOST + `/api/categories/${newCategory.id}`,
                newCategory
            );

            const data = await response.data;
            return data as Category;
        };

        const categoryResp = await updateData();
        dispatch(
            categoriesActions.updateCategory({
                category: categoryResp,
            })
        );
    };
};

export const getCategory = (
    categoryId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(
                HOST + `/api/categories/${categoryId}`
            );
            const data = response.data;
            return data as Category;
        };

        const categoryResp = await getData();
        if (categoryResp.id)
            dispatch(categoriesActions.getCategory({ id: categoryResp.id }));
    };
};

export const deleteCategory = (
    categoryId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const deleteData = async () => {
            const response = await axios.delete(
                HOST + `/api/categories/${categoryId}`
            );
            const data = await response.data;
            console.log(data);
        };

        await deleteData();
        dispatch(categoriesActions.removeCategory({ id: categoryId }));
    };
};
