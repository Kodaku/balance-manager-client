import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchUsers } from "../../store/users-actions";
import { User } from "../../types";
import ButtonAdd from "../UI/buttons/ButtonAdd";
import TableSimpleHead from "../UI/table/TableSimpleHead";
import UserRow from "./UserRow";

const UsersList = () => {
    const users: User[] = useAppSelector((state) => state.users.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const displayUsers = () => {
        return users.map((user) => {
            return <UserRow key={user.id} user={user} />;
        });
    };

    return (
        <Fragment>
            <h2>Users List</h2>
            <div className="row mb-4">
                <ButtonAdd routePath={`users/create`} text="Add User" />
                <div className="col-1"></div>
                <div className="col-1">
                    <Link to="/categories" className="btn btn-warning">
                        Categories
                    </Link>
                </div>
            </div>
            <br />
            <table className="table table-dark table-striped">
                <TableSimpleHead />
                <tbody>{displayUsers()}</tbody>
            </table>
        </Fragment>
    );
};

export default UsersList;
