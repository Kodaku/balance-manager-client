import { Category } from "../../types";
import TableDataAction from "../UI/table/TableDataAction";

const CategoryRow: React.FC<{ category: Category }> = ({ category }) => {
    return (
        <tr>
            <th scope="row">{category.id}</th>
            <td>{category.name}</td>
            <TableDataAction
                routePath={`/categories/update/${category.id}`}
                text="Update"
                buttonClass="btn-primary"
            />
            <TableDataAction
                routePath={`/categories/delete/${category.id}`}
                text="Delete"
                buttonClass="btn-danger"
            />
        </tr>
    );
};

export default CategoryRow;
