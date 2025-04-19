import { Theme } from "./theme";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  icon: string;
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

export interface ThemeProps {
  theme: Theme;
}
