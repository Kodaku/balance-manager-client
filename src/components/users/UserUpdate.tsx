import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getUser, updateUser } from "../../store/users-actions";
import { UserParams } from "../../types";
import ButtonCancel from "../UI/buttons/ButtonCancel";
import ButtonSubmit from "../UI/buttons/ButtonSubmit";
import InputUpdate from "../UI/forms/update/InputUpdate";

const UserUpdate = () => {
    const params = useParams<UserParams>();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.users.currentUser);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [userName, setUserName] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            console.log(currentUser);
            dispatch(getUser(parseInt(params.id)));
            // console.log(currentUser);
            setUserName(currentUser.name);
        }
    }, [dispatch, params, currentUser]);

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameInputRef.current) {
            dispatch(
                updateUser({
                    id: currentUser.id,
                    name: nameInputRef.current.value,
                })
            );
            navigate("/");
            // console.log(nameInputRef.current.value);
        }
    };

    return (
        <Fragment>
            <h2>Update a User</h2>
            <form onSubmit={onSubmitHandler}>
                <InputUpdate
                    ref={nameInputRef}
                    defaultValue={userName}
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

export default UserUpdate;
