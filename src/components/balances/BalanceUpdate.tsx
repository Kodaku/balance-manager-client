import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getBalance, updateBalance } from "../../store/balances-actions";
import { BalanceParams } from "../../types";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputUpdate from "../UI/forms/update/InputUpdate";

const BalanceUpdate = () => {
    const params = useParams<BalanceParams>();
    const navigate = useNavigate();
    const currentBalance = useAppSelector(
        (state) => state.balances.currentBalance
    );
    const dispatch = useAppDispatch();
    const [balanceName, setBalanceName] = useState<string>("");
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (params.id) {
            console.log(currentBalance);
            dispatch(getBalance(parseInt(params.id)));
            setBalanceName(currentBalance.name);
        }
    }, [dispatch, params, currentBalance]);

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current && currentBalance.id) {
            dispatch(
                updateBalance({
                    id: currentBalance.id,
                    name: nameInputRef.current.value,
                    userId: currentBalance.id,
                })
            );
            navigate(`/users/balances/${currentBalance.userId}`);
        }
    };

    return (
        <Fragment>
            <h2>Update a Balance</h2>
            <form onSubmit={onSubmitHandler}>
                <InputUpdate
                    ref={nameInputRef}
                    defaultValue={balanceName}
                    text="Balance Name"
                    type="text"
                />
                <div className="row">
                    <ButtonSubmit />
                    <div className="col-1"></div>
                    <ButtonCancel
                        routePath={`/users/balances/${currentBalance.userId}`}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default BalanceUpdate;
