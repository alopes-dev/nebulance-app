import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

import BalanceCard from "@/components/balance-card/BalanceCard";
import TransactionItem from "@/components/transaction-item/TransactionItem";
import BudgetProgressCard from "@/components/budget-progress-card/BudgetProgressCard";
import type { Transaction } from "@/types";

import * as S from "./HomeScreen.styles";

import { useOwnNavigation } from "@/hooks/use-own-navigation";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthContext";
const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: -85.75,
    date: new Date("2023-04-15"),
    category: "FOOD",
    type: "expense",
    icon: "basket",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: 2500.0,
    date: new Date("2023-04-10"),
    category: "FOOD",
    type: "income",
    icon: "cash",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: -15.99,
    date: new Date("2023-04-05"),
    category: "ENTERTAINMENT",
    type: "expense",
    icon: "film",
  },
  {
    id: "4",
    title: "Uber Ride",
    amount: -24.5,
    date: new Date("2023-04-03"),
    category: "TRANSPORT",
    type: "expense",
    icon: "car",
  },
];

const HomeScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { isDarkMode } = useTheme();
  const navigation = useOwnNavigation();
  const { user, accountInfo } = useAuth();

  const handleViewAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("MainTabs", {
      screen: "Transactions",
    });
  };

  const userFirstName = useMemo(() => {
    return user?.name.split(" ")[0] || "User";
  }, [user]);

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
            income={2000}
            expenses={3000}
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
            {mockTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </S.TransactionsContainer>
        </ScrollView>
      </S.Container>
    </S.RootContainer>
  );
};

export default HomeScreen;
