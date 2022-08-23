export type User = {
    id?: number;
    name: string;
};

export type UserInitialState = {
    users: User[];
    currentUser: User;
};

export type UserParams = {
    id: string;
};

export type BalanceParams = {
    id: string;
};

export type CategoryParams = {
    id: string;
};

export type Balance = {
    id?: number;
    name: string;
    userId: number;
};

export type BalanceInitialState = {
    balances: Balance[];
    currentBalance: Balance;
};

export type Category = {
    id?: number;
    name: string;
};

export type CategoryInitialState = {
    categories: Category[];
    currentCategory: Category;
};

export type Expense = {
    id?: number;
    amount: number;
    date: string;
    description: string;
    debit: boolean;
    balanceId?: number;
    categoryId?: number;
};

export type ExpenseInitialState = {
    expenses: Expense[];
    currentExpense: Expense;
};

export type ExpenseParams = {
    id: string;
    balanceId: string;
    userId: string;
};
