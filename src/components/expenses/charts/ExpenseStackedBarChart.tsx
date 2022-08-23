import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Category, Expense, ExpenseParams } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../../../store/expenses-actions";
import { fetchCategories } from "../../../store/categories-actions";
import ButtonBack from "../../UI/buttons/ButtonBack";
import {
    getMonths,
    getYears,
    stackedBarChartOptions,
} from "../../../utils/expense-charts-utilities";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseStackedBarChart = () => {
    const expenses: Expense[] = useAppSelector(
        (state) => state.expenses.expenses
    );
    const dispatch = useAppDispatch();
    const categories: Category[] = useAppSelector(
        (state) => state.categories.categories
    );
    const params = useParams<ExpenseParams>();
    const [filter, setFilter] = useState<string>("4y");
    const [years, setYears] = useState<string[]>(getYears(parseInt(filter)));
    const [months, setMonths] = useState<string[]>(getMonths(0));
    const [visualizeDebits, setVisualizeDebits] = useState<boolean>(true);

    useEffect(() => {
        if (params.balanceId)
            dispatch(fetchExpenses(parseInt(params.balanceId)));
        dispatch(fetchCategories());
    }, [dispatch, params.balanceId]);

    useEffect(() => {
        const filterType = filter[1];
        if (filterType === "y") {
            setYears(getYears(parseInt(filter[0])));
        } else if (filterType === "m") {
            setMonths(getMonths(parseInt(filter[0])));
        }
    }, [filter]);

    const monthLabels = expenses.map((expense) => {
        const month =
            expense.date.split("-")[1] + "-" + expense.date.split("-")[0];
        return month;
    });

    const uniqueLabelsSet = new Set(monthLabels);

    const uniqueLabels: string[] = [];
    uniqueLabelsSet.forEach((label) => uniqueLabels.push(label));

    const getDatasets = () => {
        const datasets = categories.map((category) => {
            return {
                label: category.name,
                data: uniqueLabels.map((label) => {
                    let total = 0;
                    expenses.forEach((expense) => {
                        if (filter[1] === "y") {
                            const yearIndex = years.findIndex(
                                (year) => year === expense.date.split("-")[0]
                            );
                            if (
                                yearIndex >= 0 &&
                                expense.debit === visualizeDebits &&
                                expense.date.split("-")[1] +
                                    "-" +
                                    expense.date.split("-")[0] ===
                                    label &&
                                expense.categoryId === category.id
                            ) {
                                total += expense.amount;
                            }
                        } else if (filter[1] === "m") {
                            const thisYear = new Date()
                                .toLocaleDateString()
                                .split("/")[2];
                            const monthIndex = months.findIndex(
                                (month) =>
                                    parseInt(month.split("-")[0]) ===
                                    parseInt(expense.date.split("-")[1])
                            );
                            if (
                                monthIndex >= 0 &&
                                expense.date.split("-")[0] === thisYear &&
                                expense.debit === visualizeDebits &&
                                expense.date.split("-")[1] +
                                    "-" +
                                    expense.date.split("-")[0] ===
                                    label &&
                                expense.categoryId === category.id
                            ) {
                                total += expense.amount;
                            }
                        }
                    });
                    return total;
                }),
                backgroundColor: `rgba(${Math.random() * 255}, ${
                    Math.random() * 255
                }, ${Math.random() * 255}, 0.5)`,
            };
        });
        return datasets;
    };

    const monthData = {
        labels: uniqueLabels,
        datasets: getDatasets(),
    };

    const selectChangeHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFilter(event.target.value);
    };

    const debitsCheckboxChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVisualizeDebits(event.target.checked);
    };

    return (
        <div>
            <h2>Expense Stacked Bar Chart</h2>
            <form>
                <div className="form-group">
                    <div className="row mb-8">
                        <div className="col-2">
                            <h4>Filter By: </h4>
                        </div>
                        <div className="col-3">
                            <select
                                className="form-control"
                                onChange={selectChangeHandler}
                            >
                                <option value="4y">Last 4 years</option>
                                <option value="3y">Last 3 years</option>
                                <option value="2y">Last 2 years</option>
                                <option value="1y">This year</option>
                                <option value="9m">Last 9 months</option>
                                <option value="6m">Last 6 months</option>
                                <option value="3m">Last 3 months</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row mb-8">
                        <div className="col-2">
                            <label className="form-check-label">
                                Visualize Debits
                            </label>
                        </div>
                        <div className="col-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={true}
                                onChange={debitsCheckboxChangeHandler}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <Bar options={stackedBarChartOptions} data={monthData} />
            <br />
            <ButtonBack
                routePath={`/users/balances/expenses/${params.balanceId}/${params.userId}`}
            />
        </div>
    );
};

export default ExpenseStackedBarChart;
