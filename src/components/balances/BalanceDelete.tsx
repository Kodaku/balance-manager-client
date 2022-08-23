import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteBalance, getBalance } from "../../store/balances-actions";
import { BalanceParams } from "../../types";
import Modal from "../Modal";
import DeleteActions from "../UI/delete-actions/DeleteActions";

const BalanceDelete = () => {
    const params = useParams<BalanceParams>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentBalance = useAppSelector(
        (state) => state.balances.currentBalance
    );

    useEffect(() => {
        if (params.id) {
            console.log(currentBalance);
            dispatch(getBalance(parseInt(params.id)));
        }
    }, [dispatch, params, currentBalance]);

    const deleteHandler = () => {
        if (params.id) dispatch(deleteBalance(parseInt(params.id)));
        navigate(`/users/balances/${currentBalance.userId}`);
    };

    const renderActions: () => JSX.Element = () => {
        return (
            <DeleteActions
                routePath={`/users/balances/${currentBalance.userId}`}
                deleteHandler={deleteHandler}
            />
        );
    };

    const renderContent = () => {
        return "Are you sure you want to delete this balance?";
    };

    return (
        <div className="container">
            <Modal
                title="Delete Balance"
                content={renderContent}
                actions={renderActions}
                onDismiss={() =>
                    navigate(`/users/balances/${currentBalance.userId}`)
                }
            />
        </div>
    );
};

export default BalanceDelete;
