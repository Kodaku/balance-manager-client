import { Link } from "react-router-dom";

const ButtonBack: React.FC<{ routePath: string }> = ({ routePath }) => {
    return (
        <div className="col-1">
            <Link to={routePath} className="btn btn-dark">
                Back
            </Link>
        </div>
    );
};

export default ButtonBack;
