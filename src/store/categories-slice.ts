import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryInitialState } from "../types";

const categoryInitialState: CategoryInitialState = {
    categories: [],
    currentCategory: {
        id: -1,
        name: "",
    },
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState: categoryInitialState,
    reducers: {
        replaceCategories(
            state,
            action: PayloadAction<{ categories: Category[] }>
        ) {
            const categories = action.payload.categories;
            if (categories) {
                state.categories = categories;
            }
        },
        addCategory(state, action: PayloadAction<{ category: Category }>) {
            const category = action.payload.category;
            state.categories.push({
                id: category.id,
                name: category.name,
            });
        },
        updateCategory(state, action: PayloadAction<{ category: Category }>) {
            const newCategory = action.payload.category;
            const oldCategoryIndex = state.categories.findIndex((category) => {
                return category.id === newCategory.id;
            });
            if (oldCategoryIndex) {
                state.categories[oldCategoryIndex] = newCategory;
                console.log(
                    "New Category: ",
                    state.categories[oldCategoryIndex].name
                );
            }
        },
        getCategory(state, action: PayloadAction<{ id: number }>) {
            const categoryId = action.payload.id;
            const category = state.categories.find(
                (currentCategory) => currentCategory.id === categoryId
            );
            if (category) {
                state.currentCategory = category;
                console.log("Current Category: ", state.currentCategory.name);
            }
        },
        removeCategory(state, action: PayloadAction<{ id: number }>) {
            const categoryId = action.payload.id;
            state.categories = state.categories.filter(
                (category) => category.id !== categoryId
            );
        },
    },
});

const categoriesActions = categoriesSlice.actions;

export { categoriesSlice, categoriesActions };
