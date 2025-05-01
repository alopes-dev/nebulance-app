import { Theme } from "./theme";

export type ICategory =
  | "FOOD"
  | "TRANSPORT"
  | "HOUSING"
  | "UTILITIES"
  | "ENTERTAINMENT"
  | "HEALTHCARE"
  | "SHOPPING"
  | "OTHERS";

export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  date: string;
  category: ICategory;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  icon?: string;
  isExpense?: boolean;
  userId?: string;
  accountId?: string;
  goalId?: string;
  status?: "PENDING" | "CONFIRMED";
}

export interface IGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  icon?: string;
  color?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAccount {
  id: string;
  name: string;
  email: string;
  balance: number;
  monthlyExpenses: number;
  // monthlyIncome: number;
  // monthlySavings: number;
  // monthlyInvestments: number;
  // monthlyDebtPayments: number;
  // monthlyOtherExpenses: number;
}

export interface ThemeProps {
  theme: Theme;
}
