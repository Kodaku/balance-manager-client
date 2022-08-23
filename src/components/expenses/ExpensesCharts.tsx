import { ExpenseParams } from "../../types";
import ButtonChart from "../UI/buttons/ButtonChart";

const ExpensesCharts: React.FC<{
    params: Readonly<Partial<ExpenseParams>>;
}> = ({ params }) => {
    return (
        <div className="row mb-8">
            <ButtonChart
                routePath={`/users/balances/expenses/charts/hist/${params.balanceId}/${params.userId}`}
                text="Bar Chart"
                buttonClass="btn-warning"
            />
            <ButtonChart
                routePath={`/users/balances/expenses/charts/area/${params.balanceId}/${params.userId}`}
                text="Area Chart"
                buttonClass="btn-info"
            />
            <ButtonChart
                routePath={`/users/balances/expenses/charts/stacked/${params.balanceId}/${params.userId}`}
                text="Stacked Bar Chart"
                buttonClass="btn-light"
            />
            <ButtonChart
                routePath={`/users/balances/expenses/charts/pie/${params.balanceId}/${params.userId}`}
                text="Pie Chart"
                buttonClass="btn-secondary"
            />
        </div>
    );
};

export default ExpensesCharts;
