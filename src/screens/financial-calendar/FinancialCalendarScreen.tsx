import React from "react";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./FinancialCalendarScreen.styles";
import { CalendarLegend } from "@/components/financial-calendar/CalendarLegend";
import { useFinancialCalendar } from "@/hooks/useFinancialCalendar";
import { useAuth } from "@/context/AuthContext";
export const FinancialCalendarScreen = () => {
  const { theme } = useTheme();
  const { accountInfo } = useAuth();
  const { markedDates } = useFinancialCalendar({
    balance: accountInfo?.balance || 0,
    monthlyExpenses: accountInfo?.monthlyExpenses || 10,
  });

  const calendarTheme = {
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
  };

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Financial Calendar</S.HeaderTitle>
          <S.Balance>
            Current Balance: ${accountInfo?.balance?.toLocaleString()}
          </S.Balance>
        </S.Header>
        <S.CardContainer>
          <Calendar
            markedDates={markedDates}
            markingType="dot"
            theme={calendarTheme}
            style={{
              borderRadius: 10,
              paddingVertical: 20,
            }}
          />
          <CalendarLegend />
        </S.CardContainer>
      </S.Container>
    </S.RootContainer>
  );
};
