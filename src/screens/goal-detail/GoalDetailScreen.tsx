import React, { useState } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IGoal, Transaction } from "@/types";
import * as S from "./GoalDetailScreen.styles";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "@/components/goal-card/GoalCard";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import TransactionItem from "@/components/transaction-item/TransactionItem";
import { EmptyState } from "../transactions/EmptyState";
import { useGoals } from "@/context/GoalsContext";
interface RouteParams {
  goal: IGoal;
}

const GoalDetailScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { transactions, isLoadingTransactions } = useTransactionsQueries();
  const route = useRoute();
  const { goal } = route.params as RouteParams;
  const { deleteGoal, isDeletingGoal } = useGoals();

  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);

  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  const handleAddFunds = () => {
    setShowAddFunds(true);
    // TODO: Implement add funds logic
  };

  const handleWithdrawFunds = () => {
    setShowWithdrawFunds(true);
    // TODO: Implement withdraw funds logic
  };

  const handleDeleteGoal = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteGoal(goal.id, () => {
            navigation.goBack();
          });
        },
      },
    ]);
  };

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>{goal.name}</S.HeaderTitle>
          <S.ActionButtonsContainer>
            <S.ActionButtons onPress={() => navigation.goBack()}>
              <Ionicons
                name="close-outline"
                size={20}
                color={isDarkMode ? theme.colors.text : theme.colors.border}
              />
            </S.ActionButtons>
          </S.ActionButtonsContainer>
        </S.Header>

        <GoalCard
          key={goal.id}
          goal={goal}
          preventPress
          onPress={(action) => {}}
          onDelete={handleDeleteGoal}
          isDeletingGoal={isDeletingGoal}
        />

        <S.TransactionDescription>
          Historic of transactions
        </S.TransactionDescription>
        <ScrollView>
          <S.Content>
            <S.TransactionsList>
              {isLoadingTransactions ? (
                <ActivityIndicator size="large" color={theme.colors.text} />
              ) : transactions?.length === 0 ? (
                <EmptyState filter={"all"} />
              ) : (
                transactions?.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    expanded
                  />
                ))
              )}
            </S.TransactionsList>
          </S.Content>
        </ScrollView>
      </S.Container>
    </S.RootContainer>
  );
};

export default GoalDetailScreen;
