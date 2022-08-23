import { Category } from "../types";

export const filterCategories = (
    categories: Category[],
    categoryId: number
) => {
    const filteredCategories = categories.filter((category) => {
        return category.id === categoryId;
    });
    if (filteredCategories[0]) {
        return filteredCategories[0].id;
    }
    return categories[0].id;
};

export const getRequiredDate = (date: string) => {
    if (date) {
        const currentDate: string = new Date(date).toLocaleDateString();
        // console.log(currentDate.split("/"));
        let day = currentDate.split("/")[0];
        let month = currentDate.split("/")[1];
        const year = currentDate.split("/")[2];
        if (day.length !== 2) {
            day = "0" + day;
        }
        if (month.length !== 2) {
            month = "0" + month;
        }
        return year + "-" + month + "-" + day;
    }
    return "";
};
