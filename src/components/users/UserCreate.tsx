import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addSingleUser } from "../../store/users-actions";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputCreate from "../UI/forms/create/InputCreate";

const UserCreate = () => {
    const dispatch = useAppDispatch();
    const nameInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current)
            dispatch(addSingleUser({ name: nameInputRef.current.value }));
        navigate("/");
    };
    return (
        <Fragment>
            <h2>Create a User</h2>
            <form onSubmit={onFormSubmit}>
                <InputCreate
                    ref={nameInputRef}
                    text="User Name"
                    type="text"
                />
                <div className="row">
                    <ButtonSubmit />
                    <div className="col-1"></div>
                    <ButtonCancel routePath="/" />
                </div>
            </form>
        </Fragment>
    );
};

export default UserCreate;
