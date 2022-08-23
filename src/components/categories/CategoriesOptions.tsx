import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/categories-actions";

const CategoriesOptions = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const displayCategories = () => {
        return categories.map((category) => {
            return (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            );
        });
    };
    return (
        <Fragment>
            {displayCategories()}
        </Fragment>
    );
};

export default CategoriesOptions;
