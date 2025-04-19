import { StackNavigationProp } from "@react-navigation/stack";
import { TransactionsStackParamList } from "./TransactionsStack";

export interface ITransactionDetailsNavigationProp
  extends StackNavigationProp<
    TransactionsStackParamList,
    "TransactionDetails"
  > {}

export interface ITransactionListNavigationProp
  extends StackNavigationProp<TransactionsStackParamList, "TransactionsList"> {}

export interface ITransactionsStackNavigationProp
  extends StackNavigationProp<TransactionsStackParamList> {}

type MainNavigatorParamList = {
  MainNavigator: any | { screen?: string };

  MainTabs: undefined | { screen?: string };
};

export type RootStackParamList = MainNavigatorParamList;
