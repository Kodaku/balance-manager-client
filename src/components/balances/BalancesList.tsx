import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchBalances } from "../../store/balances-actions";
import { Balance, UserParams } from "../../types";
import ButtonAdd from "../UI/buttons/ButtonAdd";
import ButtonBack from "../UI/buttons/ButtonBack";
import TableSimpleHead from "../UI/table/TableSimpleHead";
import BalanceRow from "./BalanceRow";

const BalancesList = () => {
    const balances: Balance[] = useAppSelector(
        (state) => state.balances.balances
    );
    const dispatch = useAppDispatch();
    const params = useParams<UserParams>();

    useEffect(() => {
        if (params.id) dispatch(fetchBalances(parseInt(params.id)));
    }, [dispatch, params.id]);
    // console.log(balances);

    const displayBalances = () => {
        return balances.map((balance) => {
            return <BalanceRow key={balance.id} balance={balance} />;
        });
    };
    return (
        <Fragment>
            <h2>Balances List</h2>
            <div className="row mb-4">
                <ButtonAdd
                    routePath={`/users/balances/create/${params.id}`}
                    text="Add Balance"
                />
                <div className="col-1"></div>
                <ButtonBack routePath="/" />
            </div>
            <br />
            <table className="table table-dark table-striped">
                <TableSimpleHead />
                <tbody>{displayBalances()}</tbody>
            </table>
        </Fragment>
    );
};

export default BalancesList;
