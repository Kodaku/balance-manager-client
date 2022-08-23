import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { fetchCategories } from "../../../store/categories-actions";
import { fetchExpenses } from "../../../store/expenses-actions";
import { Category, Expense, ExpenseParams } from "../../../types";
import ButtonBack from "../../UI/buttons/ButtonBack";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
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

    const getDatasets = () => {
        return {
            label: "Expenses Distribution Per Categories",
            data: categories.map((category) => {
                let total = 0;
                expenses.forEach((expense) => {
                    if (expense.categoryId === category.id && expense.debit) {
                        total += expense.amount;
                    }
                });
                return total;
            }),
            backgroundColor: categories.map(
                () =>
                    `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
                        Math.random() * 255
                    }, 0.5)`
            ),
            borderColor: categories.map(
                () =>
                    `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
                        Math.random() * 255
                    }, 1)`
            ),
            borderWidth: 1,
        };
    };

    const categoriesData = {
        labels: categories.map((category) => category.name),
        datasets: [getDatasets()],
    };
    return (
        <div>
            <h2>Expense Pie Chart</h2>
            <div style={{ width: 700 }}>
                <Pie data={categoriesData} />
                <br />
                <ButtonBack
                    routePath={`/users/balances/expenses/${params.balanceId}/${params.userId}`}
                />
            </div>
        </div>
    );
};

export default ExpensePieChart;
