import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

import BalanceCard from "@/components/balance-card/BalanceCard";
import TransactionItem from "@/components/transaction-item/TransactionItem";
import BudgetProgressCard from "@/components/budget-progress-card/BudgetProgressCard";
import type { Transaction } from "@/types";

import * as S from "./HomeScreen.styles";

import { useOwnNavigation } from "@/hooks/use-own-navigation";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthContext";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { isDarkMode, theme } = useTheme();
  const navigation = useOwnNavigation();
  const { user, accountInfo } = useAuth();
  const { transactions, isLoadingTransactions, refetch } =
    useTransactionsQueries();

  const handleViewAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("MainTabs", {
      screen: "Transactions",
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const userFirstName = useMemo(() => {
    return user?.name.split(" ")[0] || "User";
  }, [user]);

  const recentTransactions = useMemo(() => {
    return transactions
      ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      ?.filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      ?.filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
  }, [transactions]);

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Hello, {userFirstName}</S.HeaderTitle>
          <TouchableOpacity>
            <S.NotificationIcon
              name="notifications-outline"
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#333333"}
            />
          </TouchableOpacity>
        </S.Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <BalanceCard
            balance={accountInfo?.balance || 0}
            income={totalIncome || 0}
            expenses={totalExpenses || 0}
          />

          <S.SectionHeader>
            <S.SectionTitle>Budget Overview</S.SectionTitle>
            <S.PeriodSelector>
              <S.PeriodButton
                active={selectedPeriod === "week"}
                onPress={() => setSelectedPeriod("week")}
              >
                <S.PeriodText active={selectedPeriod === "week"}>
                  Week
                </S.PeriodText>
              </S.PeriodButton>
              <S.PeriodButton
                active={selectedPeriod === "month"}
                onPress={() => setSelectedPeriod("month")}
              >
                <S.PeriodText active={selectedPeriod === "month"}>
                  Month
                </S.PeriodText>
              </S.PeriodButton>
              <S.PeriodButton
                active={selectedPeriod === "year"}
                onPress={() => setSelectedPeriod("year")}
              >
                <S.PeriodText active={selectedPeriod === "year"}>
                  Year
                </S.PeriodText>
              </S.PeriodButton>
            </S.PeriodSelector>
          </S.SectionHeader>

          <S.BudgetCardsContainer>
            <BudgetProgressCard
              title="Food & Drinks"
              current={450}
              max={600}
              icon="restaurant"
              color="#FF6B6B"
            />
            <BudgetProgressCard
              title="Shopping"
              current={120}
              max={300}
              icon="cart"
              color="#6E5DE7"
            />
            <BudgetProgressCard
              title="Transportation"
              current={80}
              max={150}
              icon="car"
              color="#F5CF6E"
            />
          </S.BudgetCardsContainer>

          <S.SectionHeader>
            <S.SectionTitle>Recent Transactions</S.SectionTitle>
            <S.ViewAllButton onPress={handleViewAll}>
              <S.ViewAllText>View All</S.ViewAllText>
            </S.ViewAllButton>
          </S.SectionHeader>

          <S.TransactionsContainer>
            {isLoadingTransactions ? (
              <ActivityIndicator size="large" color={theme.colors.text} />
            ) : (
              recentTransactions?.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </S.TransactionsContainer>
        </ScrollView>
      </S.Container>
    </S.RootContainer>
  );
};

export default HomeScreen;
