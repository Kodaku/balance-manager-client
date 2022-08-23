import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { deleteUser } from "../../store/users-actions";
import { UserParams } from "../../types";
import Modal from "../Modal";
import DeleteActions from "../UI/delete-actions/DeleteActions";

const UserDelete = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams<UserParams>();

    const deleteHandler = () => {
        if (params.id) dispatch(deleteUser(parseInt(params.id)));
        navigate("/");
    };

    const renderActions: () => JSX.Element = () => {
        return <DeleteActions routePath="/" deleteHandler={deleteHandler} />;
    };

    const renderContent = () => {
        return "Are you sure you want to delete this user?";
    };

    return (
        <div className="container">
            <Modal
                title="Delete User"
                content={renderContent}
                actions={renderActions}
                onDismiss={() => navigate("/")}
            />
        </div>
    );
};

export default UserDelete;
