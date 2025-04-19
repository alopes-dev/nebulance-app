import { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import TransactionItem from "@/components/transaction-item/TransactionItem";

import type { Transaction } from "@/types";

import * as S from "./TransactionsScreen.styles";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: -85.75,
    date: new Date("2023-04-15"),
    category: "Food",
    icon: "basket",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: 2500.0,
    date: new Date("2023-04-10"),
    category: "Income",
    icon: "cash",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: -15.99,
    date: new Date("2023-04-05"),
    category: "Entertainment",
    icon: "film",
  },
  {
    id: "4",
    title: "Uber Ride",
    amount: -24.5,
    date: new Date("2023-04-03"),
    category: "Transportation",
    icon: "car",
  },
  {
    id: "5",
    title: "Amazon Purchase",
    amount: -67.99,
    date: new Date("2023-04-02"),
    category: "Shopping",
    icon: "cart",
  },
  {
    id: "6",
    title: "Freelance Payment",
    amount: 350.0,
    date: new Date("2023-04-01"),
    category: "Income",
    icon: "cash",
  },
  {
    id: "7",
    title: "Electric Bill",
    amount: -75.4,
    date: new Date("2023-03-28"),
    category: "Utilities",
    icon: "flash",
  },
  {
    id: "8",
    title: "Gym Membership",
    amount: -35.0,
    date: new Date("2023-03-25"),
    category: "Health",
    icon: "fitness",
  },
];

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? mockTransactions
      : filter === "income"
      ? mockTransactions.filter((t) => t.amount > 0)
      : mockTransactions.filter((t) => t.amount < 0);

  const handleAddTransaction = () => {
    // In a real app, this would navigate to a transaction form
    console.log("Add transaction");
  };

  const handleImportTransactions = () => {
    // Navigate to the transaction upload screen
    navigation.navigate("TransactionUpload" as never);
  };

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Transactions</S.HeaderTitle>
          <S.ActionButtonsContainer>
            <S.ActionButton onPress={handleImportTransactions}>
              <Ionicons name="cloud-upload-outline" size={20} color="#333" />
            </S.ActionButton>
            <S.ActionButton>
              <Ionicons name="search-outline" size={20} color="#333" />
            </S.ActionButton>
          </S.ActionButtonsContainer>
        </S.Header>

        <S.FilterContainer>
          <S.FilterButton
            active={filter === "all"}
            onPress={() => setFilter("all")}
          >
            <S.FilterText active={filter === "all"}>All</S.FilterText>
          </S.FilterButton>
          <S.FilterButton
            active={filter === "income"}
            onPress={() => setFilter("income")}
          >
            <S.FilterText active={filter === "income"}>Income</S.FilterText>
          </S.FilterButton>
          <S.FilterButton
            active={filter === "expense"}
            onPress={() => setFilter("expense")}
          >
            <S.FilterText active={filter === "expense"}>Expense</S.FilterText>
          </S.FilterButton>
        </S.FilterContainer>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              expanded
            />
          ))}
        </ScrollView>

        <S.AddButton onPress={handleAddTransaction}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </S.AddButton>
      </S.Container>
    </S.RootContainer>
  );
};

export default TransactionsScreen;
