import { Link } from "react-router-dom";

const ButtonCancel: React.FC<{ routePath: string }> = ({ routePath }) => {
    return (
        <div className="col-1">
            <Link to={routePath} className="btn btn-dark">
                Cancel
            </Link>
        </div>
    );
};

export default ButtonCancel;
