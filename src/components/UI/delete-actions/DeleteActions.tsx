import { Fragment } from "react";
import { Link } from "react-router-dom";

const DeleteActions: React.FC<{
    routePath: string;
    deleteHandler: () => void;
}> = ({ routePath, deleteHandler }) => {
    return (
        <Fragment>
            <button className="btn btn-danger" onClick={deleteHandler}>
                Delete
            </button>
            <Link to={routePath} className="btn btn-dark">
                Cancel
            </Link>
        </Fragment>
    );
};

export default DeleteActions;
