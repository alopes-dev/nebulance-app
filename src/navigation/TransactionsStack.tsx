import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionsScreen from "@/screens/transactions/TransactionsScreen";
import TransactionDetailsScreen from "@/screens/transaction-details/TransactionDetailsScreen";
import { Transaction } from "@/types";

export type TransactionsStackParamList = {
  TransactionsList: undefined;
  TransactionDetails: {
    transaction: Transaction;
  };
};

const Stack = createStackNavigator<TransactionsStackParamList>();

export const TransactionsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
