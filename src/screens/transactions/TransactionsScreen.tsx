import { useState, useCallback, useRef } from "react";
import { ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import TransactionItem from "@/components/transaction-item/TransactionItem";
import TransactionForm from "@/components/transaction-form/TransactionForm";

import type { Transaction } from "@/types";

import * as S from "./TransactionsScreen.styles";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/ThemeContext";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import { EmptyState } from "./EmptyState";

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("all");
  const { isDarkMode, theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { transactions, isLoadingTransactions, refetch } =
    useTransactionsQueries();
  const [refreshing, setRefreshing] = useState(false);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : filter === "income"
      ? transactions?.filter((t) => t.amount > 0)
      : transactions?.filter((t) => t.amount < 0);

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleAddTransaction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    handlePresentModal();
  };

  const handleSubmitTransaction = (
    transaction: Omit<Transaction, "id" | "date">
  ) => {
    // Here you would typically save the transaction
    console.log("New transaction:", transaction);
  };

  const handleImportTransactions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to the transaction upload screen
    navigation.navigate("TransactionUpload" as never);
  };

  const handleChangeFilter = (filter: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFilter(filter);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Transactions</S.HeaderTitle>
          <S.ActionButtonsContainer>
            <S.ActionButton onPress={handleImportTransactions}>
              <S.IoniconsStyle name="cloud-upload-outline" size={20} />
            </S.ActionButton>
            <S.ActionButton>
              <Ionicons
                name="search-outline"
                size={20}
                color={isDarkMode ? theme.colors.text : theme.colors.border}
              />
            </S.ActionButton>
          </S.ActionButtonsContainer>
        </S.Header>

        <S.FilterContainer>
          <S.FilterButton
            active={filter === "all"}
            onPress={() => handleChangeFilter("all")}
          >
            <S.FilterText active={filter === "all"}>All</S.FilterText>
          </S.FilterButton>
          <S.FilterButton
            active={filter === "income"}
            onPress={() => handleChangeFilter("income")}
          >
            <S.FilterText active={filter === "income"}>Income</S.FilterText>
          </S.FilterButton>
          <S.FilterButton
            active={filter === "expense"}
            onPress={() => handleChangeFilter("expense")}
          >
            <S.FilterText active={filter === "expense"}>Expense</S.FilterText>
          </S.FilterButton>
        </S.FilterContainer>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.text}
            />
          }
        >
          {isLoadingTransactions ? (
            <ActivityIndicator size="large" color={theme.colors.text} />
          ) : filteredTransactions?.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredTransactions?.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                expanded
              />
            ))
          )}
        </ScrollView>

        <S.AddButton onPress={handleAddTransaction}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </S.AddButton>
      </S.Container>

      <TransactionForm
        bottomSheetRef={bottomSheetRef}
        onSubmit={handleSubmitTransaction}
      />
    </S.RootContainer>
  );
};

export default TransactionsScreen;
