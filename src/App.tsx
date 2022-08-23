import { Route, Routes } from "react-router";
import BalanceCreate from "./components/balances/BalanceCreate";
import BalanceDelete from "./components/balances/BalanceDelete";
import BalancesList from "./components/balances/BalancesList";
import BalanceUpdate from "./components/balances/BalanceUpdate";
import CategoriesList from "./components/categories/CategoriesList";
import CategoryCreate from "./components/categories/CategoryCreate";
import CategoryDelete from "./components/categories/CategoryDelete";
import CategoryUpdate from "./components/categories/CategoryUpdate";
import ExpenseAreaChart from "./components/expenses/charts/ExpenseAreaChart";
import ExpenseBarChart from "./components/expenses/charts/ExpenseBarChart";
import ExpensePieChart from "./components/expenses/charts/ExpensePieChart";
import ExpenseStackedBarChart from "./components/expenses/charts/ExpenseStackedBarChart";
import ExpenseCreate from "./components/expenses/ExpenseCreate";
import ExpenseDelete from "./components/expenses/ExpenseDelete";
import ExpensesList from "./components/expenses/ExpensesList";
import ExpenseUpdate from "./components/expenses/ExpenseUpdate";
import UserCreate from "./components/users/UserCreate";
import UserDelete from "./components/users/UserDelete";
import UsersList from "./components/users/UsersList";
import UserUpdate from "./components/users/UserUpdate";

const App = () => {
    return (
        <div className="container">
            <Routes>
                {/* Users Routes */}
                <Route path="/" element={<UsersList />}></Route>
                <Route path="/users/create" element={<UserCreate />}></Route>
                <Route path="/users/update/:id" element={<UserUpdate />} />
                <Route path="/users/delete/:id" element={<UserDelete />} />
                {/* Balances Routes */}
                <Route path="/users/balances/:id" element={<BalancesList />} />
                <Route
                    path="/users/balances/create/:id"
                    element={<BalanceCreate />}
                />
                <Route
                    path="/users/balances/update/:id"
                    element={<BalanceUpdate />}
                />
                <Route
                    path="/users/balances/delete/:id"
                    element={<BalanceDelete />}
                />
                {/* Categories Routes */}
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="/categories/create" element={<CategoryCreate />} />
                <Route
                    path="/categories/update/:id"
                    element={<CategoryUpdate />}
                />
                <Route
                    path="/categories/delete/:id"
                    element={<CategoryDelete />}
                />
                {/* Expenses Routes */}
                <Route
                    path="/users/balances/expenses/:balanceId/:userId"
                    element={<ExpensesList />}
                />
                <Route
                    path="/users/balances/expenses/create/:balanceId/:userId"
                    element={<ExpenseCreate />}
                />
                <Route
                    path="/users/balances/expenses/update/:id/:balanceId/:userId"
                    element={<ExpenseUpdate />}
                />
                <Route
                    path="/users/balances/expenses/delete/:id/:balanceId/:userId"
                    element={<ExpenseDelete />}
                />
                {/* Expenses Charts */}
                <Route
                    path="/users/balances/expenses/charts/hist/:balanceId/:userId"
                    element={<ExpenseBarChart />}
                />
                <Route
                    path="/users/balances/expenses/charts/area/:balanceId/:userId"
                    element={<ExpenseAreaChart />}
                />
                <Route
                    path="/users/balances/expenses/charts/stacked/:balanceId/:userId"
                    element={<ExpenseStackedBarChart />}
                />
                <Route
                    path="/users/balances/expenses/charts/pie/:balanceId/:userId"
                    element={<ExpensePieChart />}
                />
            </Routes>
        </div>
    );
};

export default App;
