import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { deleteExpense } from "../../store/expenses-actions";
import { ExpenseParams } from "../../types";
import Modal from "../Modal";
import DeleteActions from "../UI/delete-actions/DeleteActions";

const ExpenseDelete = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams<ExpenseParams>();

    const deleteHandler = () => {
        if (params.id) dispatch(deleteExpense(parseInt(params.id)));
        navigate(
            `/users/balances/expenses/${params.balanceId}/${params.userId}`
        );
    };

    const renderActions: () => JSX.Element = () => {
        return (
            <DeleteActions
                routePath={`/users/balances/expenses/${params.balanceId}/${params.userId}`}
                deleteHandler={deleteHandler}
            />
        );
    };

    const renderContent = () => {
        return "Are you sure you want to delete this expense?";
    };

    return (
        <div className="container">
            <Modal
                title="Delete Expense"
                content={renderContent}
                actions={renderActions}
                onDismiss={() =>
                    navigate(
                        `/users/balances/expenses/${params.balanceId}/${params.userId}`
                    )
                }
            />
        </div>
    );
};

export default ExpenseDelete;
