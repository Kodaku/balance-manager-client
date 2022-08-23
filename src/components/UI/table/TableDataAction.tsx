import { Link } from "react-router-dom";

const TableDataAction: React.FC<{ routePath: string; text: string; buttonClass: string }> = ({
    routePath,
    text,
    buttonClass
}) => {
    return (
        <td>
            <Link to={routePath}>
                <button className={`btn ${buttonClass}`}>{text}</button>
            </Link>
        </td>
    );
};

export default TableDataAction;
