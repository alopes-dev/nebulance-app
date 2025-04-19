import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/context/ThemeContext";
import { useTransactions } from "@/context/TransactionContext";
import { format, getDaysInMonth } from "date-fns";
import * as S from "./FinancialCalendarScreen.styles";

interface DayStatus {
  selectedColor: string;
  textColor: string;
  selected?: boolean;
}

export const FinancialCalendarScreen = () => {
  const { theme } = useTheme();
  const { balance } = useTransactions();
  const [markedDates, setMarkedDates] = useState<{ [date: string]: DayStatus }>(
    {}
  );

  // Monthly expenses estimation
  const MONTHLY_EXPENSES = 1500; // Replace with your actual monthly expenses estimation

  useEffect(() => {
    calculateFinancialStatus();
  }, [balance]);

  const calculateFinancialStatus = () => {
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);

    const daysInMonth = getDaysInMonth(firstDayOfMonth);
    const dailyExpense = MONTHLY_EXPENSES / daysInMonth;
    const LOW_BALANCE_THRESHOLD = MONTHLY_EXPENSES * 0.2;

    const getStatusColor = (balance: number): string => {
      if (balance < 0) return theme.colors.danger;
      if (balance < LOW_BALANCE_THRESHOLD) return theme.colors.warning;
      return theme.colors.success;
    };

    const createDateStatus = (color: string): DayStatus => ({
      selectedColor: color,
      textColor: theme.colors.text,
      selected: true,
    });

    const getFormattedDate = (baseDate: Date, daysToAdd: number): string => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + daysToAdd);
      return format(date, "yyyy-MM-dd");
    };

    const newMarkedDates: { [date: string]: DayStatus } = {};
    let currentBalance = balance;
    let dayCounter = 0;

    // Mark days until balance becomes negative
    while (currentBalance > 0) {
      const dateString = getFormattedDate(firstDayOfMonth, dayCounter);
      currentBalance -= dailyExpense;

      newMarkedDates[dateString] = createDateStatus(
        getStatusColor(currentBalance)
      );
      dayCounter++;
    }

    // Mark remaining days until end of year
    const currentYear = firstDayOfMonth.getFullYear();
    while (true) {
      const date = new Date(firstDayOfMonth);
      date.setDate(firstDayOfMonth.getDate() + dayCounter);

      if (date.getFullYear() > currentYear) break;

      const dateString = getFormattedDate(firstDayOfMonth, dayCounter);
      newMarkedDates[dateString] = createDateStatus(theme.colors.danger);
      dayCounter++;
    }

    setMarkedDates(newMarkedDates);
  };

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Financial Calendar</S.HeaderTitle>
          <S.Balance>Current Balance: ${balance.toFixed(2)}</S.Balance>
        </S.Header>
        <S.CardContainer>
          <Calendar
            markedDates={markedDates}
            markingType="dot"
            theme={{
              calendarBackground: theme.colors.background,
              textSectionTitleColor: theme.colors.text,
              selectedDayBackgroundColor: theme.colors.card,
              selectedDayTextColor: theme.colors.text,
              todayTextColor: theme.colors.primary,
              dayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.textSecondary,
              dotColor: theme.colors.primary,
              selectedDotColor: theme.colors.text,
              monthTextColor: theme.colors.text,
              indicatorColor: theme.colors.primary,
            }}
            style={{
              borderRadius: 10,
              paddingVertical: 20,
            }}
          />
          <S.Legend>
            <S.LegendItem>
              <S.LegendDot color={theme.colors.success} />
              <S.LegendText>Good Financial Status</S.LegendText>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendDot color={theme.colors.warning} />
              <S.LegendText>
                Low Balance {`(< 20% of Monthly Expenses)`}
              </S.LegendText>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendDot color={theme.colors.danger} />
              <S.LegendText>Negative Balance</S.LegendText>
            </S.LegendItem>
          </S.Legend>
        </S.CardContainer>
      </S.Container>
    </S.RootContainer>
  );
};
