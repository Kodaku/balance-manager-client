import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/categories-actions";
import { fetchExpenses } from "../../store/expenses-actions";
import { Category, Expense, ExpenseParams } from "../../types";
import ButtonAdd from "../UI/buttons/ButtonAdd";
import ButtonBack from "../UI/buttons/ButtonBack";
import TableExpenseHead from "../UI/table/TableExpenseHead";
import ExpenseRow from "./ExpenseRow";
import ExpensesCharts from "./ExpensesCharts";
import ExpenseTotal from "./ExpenseTotal";

const ExpensesList = () => {
    const expenses: Expense[] = useAppSelector(
        (state) => state.expenses.expenses
    );
    const dispatch = useAppDispatch();
    const categories: Category[] = useAppSelector(
        (state) => state.categories.categories
    );
    const params = useParams<ExpenseParams>();

    useEffect(() => {
        if (params.balanceId)
            dispatch(fetchExpenses(parseInt(params.balanceId)));
        dispatch(fetchCategories());
    }, [dispatch, params.balanceId]);
    console.log(expenses);

    const displayExpenses = () => {
        return expenses.map((expense) => {
            return (
                <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    categories={categories}
                    params={params}
                />
            );
        });
    };

    return (
        <Fragment>
            <h2>Expenes List</h2>
            <div className="row mb-8">
                <ButtonAdd
                    routePath={`/users/balances/expenses/create/${params.balanceId}/${params.userId}`}
                    text="Add Expense"
                />
                <div className="col-1"></div>
                <ButtonBack routePath={`/users/balances/${params.userId}`} />
                <div className="col-1"></div>
                <ExpenseTotal expenses={expenses} />
            </div>
            <br />
            <ExpensesCharts params={params} />
            <br />
            <table className="table table-dark table-striped">
                <TableExpenseHead />
                <tbody>{displayExpenses()}</tbody>
            </table>
        </Fragment>
    );
};

export default ExpensesList;
