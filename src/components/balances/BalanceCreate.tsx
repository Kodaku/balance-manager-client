import React, { Fragment, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addBalance } from "../../store/balances-actions";
import { UserParams } from "../../types";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputCreate from "../UI/forms/create/InputCreate";

const BalanceCreate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams<UserParams>();
    const nameInputRef = useRef<HTMLInputElement>(null);

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current && params.id) {
            console.log(nameInputRef.current.value);
            dispatch(
                addBalance(parseInt(params.id), {
                    name: nameInputRef.current.value,
                    userId: parseInt(params.id),
                })
            );
            navigate(`/users/balances/${params.id}`);
        }
    };

    return (
        <Fragment>
            <h2>Create a Balance</h2>
            <form onSubmit={onFormSubmit}>
                <InputCreate
                    ref={nameInputRef}
                    text="Balance Name"
                    type="text"
                />
                <div className="row">
                    <ButtonSubmit />
                    <div className="col-1"></div>
                    <ButtonCancel routePath={`/users/balances/${params.id}`} />
                </div>
            </form>
        </Fragment>
    );
};

export default BalanceCreate;
