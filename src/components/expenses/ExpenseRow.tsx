import { Category, Expense, ExpenseParams } from "../../types";
import TableDataAction from "../UI/table/TableDataAction";

const ExpenseRow: React.FC<{
    expense: Expense;
    categories: Category[];
    params: Readonly<Partial<ExpenseParams>>;
}> = ({ expense, categories, params }) => {
    return (
        <tr>
            <th scope="row">{expense.id}</th>
            <td className={expense.debit ? "text-danger" : "text-success"}>
                {expense.debit ? "-" + expense.amount : "+" + expense.amount}
            </td>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>{expense.description.substring(0, 30)}</td>
            <td>
                {
                    categories.find(
                        (category) => category.id === expense.categoryId
                    )?.name
                }
            </td>
            <TableDataAction
                routePath={`/users/balances/expenses/update/${expense.id}/${expense.balanceId}/${params.userId}`}
                text="Update"
                buttonClass="btn-primary"
            />
            <TableDataAction
                routePath={`/users/balances/expenses/delete/${expense.id}/${params.balanceId}/${params.userId}`}
                text="Delete"
                buttonClass="btn-danger"
            />
        </tr>
    );
};

export default ExpenseRow;
