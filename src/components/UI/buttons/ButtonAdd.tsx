import { Link } from "react-router-dom";

const ButtonAdd: React.FC<{ routePath: string; text: string }> = ({
    routePath,
    text,
}) => {
    return (
        <div className="col-2">
            <Link to={routePath} className="btn btn-success">
                {text}
            </Link>
        </div>
    );
};

export default ButtonAdd;
