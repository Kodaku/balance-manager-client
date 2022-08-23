import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/categories-actions";
import { Category } from "../../types";
import ButtonAdd from "../UI/buttons/ButtonAdd";
import ButtonBack from "../UI/buttons/ButtonBack";
import TableSimpleHead from "../UI/table/TableSimpleHead";
import CategoryRow from "./CategoryRow";

const CategoriesList = () => {
    const categories: Category[] = useAppSelector(
        (state) => state.categories.categories
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const displayCategories = () => {
        return categories.map((category) => {
            return <CategoryRow key={category.id} category={category} />;
        });
    };

    return (
        <Fragment>
            <h2>Categories List</h2>
            <div className="row mb-4">
                <ButtonAdd
                    routePath={`/categories/create`}
                    text="Add Category"
                />
                <div className="col-1"></div>
                <ButtonBack routePath={`/`} />
            </div>
            <br />
            <table className="table table-dark table-striped">
                <TableSimpleHead />
                <tbody>{displayCategories()}</tbody>
            </table>
        </Fragment>
    );
};

export default CategoriesList;
