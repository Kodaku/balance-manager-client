import { Balance } from "../../types";
import TableDataAction from "../UI/table/TableDataAction";
import TableDataName from "../UI/table/TableDataName";

const BalanceRow: React.FC<{ balance: Balance }> = ({ balance }) => {
    return (
        <tr>
            <th scope="row">{balance.id}</th>
            <TableDataName
                routePath={`/users/balances/expenses/${balance.id}/${balance.userId}`}
                name={balance.name}
            />
            <TableDataAction
                routePath={`/users/balances/update/${balance.id}`}
                text="Update"
                buttonClass="btn-primary"
            />
            <TableDataAction
                routePath={`/users/balances/delete/${balance.id}`}
                text="Delete"
                buttonClass="btn-danger"
            />
        </tr>
    );
};

export default BalanceRow;
