import { StackNavigationProp } from "@react-navigation/stack";
import { TransactionsStackParamList } from "./TransactionsStack";
import { GoalsStackParamList } from "./GoalsStack";

export interface ITransactionDetailsNavigationProp
  extends StackNavigationProp<
    TransactionsStackParamList,
    "TransactionDetails"
  > {}

export interface ITransactionListNavigationProp
  extends StackNavigationProp<TransactionsStackParamList, "TransactionsList"> {}

export interface ITransactionsStackNavigationProp
  extends StackNavigationProp<TransactionsStackParamList> {}

export interface IGoalDetailsNavigationProp
  extends StackNavigationProp<GoalsStackParamList, "GoalDetails"> {}

export interface IGoalsListNavigationProp
  extends StackNavigationProp<GoalsStackParamList, "GoalsList"> {}

type MainNavigatorParamList = {
  MainNavigator: any | { screen?: string };

  MainTabs: undefined | { screen?: string };
};

export type RootStackParamList = MainNavigatorParamList;
