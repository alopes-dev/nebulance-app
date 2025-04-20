import { Theme } from "./theme";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category:
    | "FOOD"
    | "TRANSPORT"
    | "HOUSING"
    | "UTILITIES"
    | "ENTERTAINMENT"
    | "HEALTHCARE"
    | "SHOPPING"
    | "OTHERS";
  type: "income" | "expense" | "transfer";
  icon: string;
  isExpense?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  icon: string;
  color: string;
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
