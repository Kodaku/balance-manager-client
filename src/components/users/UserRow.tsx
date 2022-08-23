import { User } from "../../types";
import TableDataAction from "../UI/table/TableDataAction";
import TableDataName from "../UI/table/TableDataName";

const UserRow: React.FC<{ user: User }> = ({ user }) => {
    return (
        <tr>
            <th scope="row">{user.id}</th>
            <TableDataName
                routePath={`/users/balances/${user.id}`}
                name={user.name}
            />
            <TableDataAction
                routePath={`/users/update/${user.id}`}
                text="Update"
                buttonClass="btn-primary"
            />
            <TableDataAction
                routePath={`/users/delete/${user.id}`}
                text="Delete"
                buttonClass="btn-danger"
            />
        </tr>
    );
};

export default UserRow;
