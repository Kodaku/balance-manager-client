import { Link } from "react-router-dom";

const TableDataName: React.FC<{ routePath: string; name: string }> = ({
    routePath,
    name,
}) => {
    return (
        <td>
            <Link to={`${routePath}`} className="link-info">
                {name}
            </Link>
        </td>
    );
};

export default TableDataName;
