import { Expense } from "../../types";

const ExpenseTotal: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
    const getTotal = () => {
        let total = 0;
        expenses.forEach((expense) => {
            if (expense.debit) {
                total -= expense.amount;
            } else {
                total += expense.amount;
            }
        });
        return total;
    };

    return (
        <div className="col-4">
            <h3 className={getTotal() > 0 ? "text-success" : "text-danger"}>
                Total: {getTotal()}
            </h3>
        </div>
    );
};

export default ExpenseTotal;
