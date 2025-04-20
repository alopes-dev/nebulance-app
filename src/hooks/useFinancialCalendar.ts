import { useState, useEffect } from "react";
import {
  addDays,
  format,
  getDaysInMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import { useTheme } from "@/context/ThemeContext";

interface DayStatus {
  selectedColor: string;
  textColor: string;
  selected?: boolean;
  marked?: boolean;
  dotColor?: string;
}

interface UseFinancialCalendarProps {
  balance: number;
  monthlyExpenses?: number;
}

export const useFinancialCalendar = ({
  balance,
  monthlyExpenses = 1500,
}: UseFinancialCalendarProps) => {
  const { theme } = useTheme();
  const [markedDates, setMarkedDates] = useState<{ [date: string]: DayStatus }>(
    {}
  );

  const LOW_BALANCE_THRESHOLD = monthlyExpenses * 0.2;

  const getStatusColor = (balance: number): string => {
    if (balance < 0) return theme.colors.danger;
    if (balance < LOW_BALANCE_THRESHOLD) return theme.colors.warning;
    return theme.colors.success;
  };

  const createDateStatus = (color: string, marked?: boolean): DayStatus => ({
    selectedColor: color,
    textColor: theme.colors.text,
    selected: true,
    dotColor: theme.colors.warning,
    marked,
  });

  const getFormattedDate = (baseDate: Date, daysToAdd: number): string => {
    return format(addDays(baseDate, daysToAdd), "yyyy-MM-dd");
  };

  const calculateFinancialStatus = () => {
    const firstDayOfMonth = startOfMonth(new Date());
    const currentDayOfMonth = new Date();
    const daysInMonth = getDaysInMonth(currentDayOfMonth);
    const pastDays = currentDayOfMonth.getDate();
    const dailyExpense = monthlyExpenses / daysInMonth;

    const newMarkedDates: { [date: string]: DayStatus } = {};
    let currentBalance = balance;
    let dayCounter = 0;

    // Mark past days
    for (let i = 0; i < pastDays; i++) {
      const dateString = getFormattedDate(firstDayOfMonth, i);
      newMarkedDates[dateString] = createDateStatus(theme.colors.border);
    }

    // Mark days until balance becomes negative
    while (currentBalance > 0) {
      const dateString = getFormattedDate(currentDayOfMonth, dayCounter);
      currentBalance -= dailyExpense;

      newMarkedDates[dateString] = createDateStatus(
        getStatusColor(currentBalance),
        dateString === format(currentDayOfMonth, "yyyy-MM-dd")
      );
      dayCounter++;
    }

    // Mark remaining days until end of year
    const currentYear = getYear(currentDayOfMonth);
    while (true) {
      const date = addDays(currentDayOfMonth, dayCounter);
      if (getYear(date) > currentYear) break;

      const dateString = getFormattedDate(currentDayOfMonth, dayCounter);
      newMarkedDates[dateString] = createDateStatus(theme.colors.danger);
      dayCounter++;
    }

    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    calculateFinancialStatus();
  }, [balance, monthlyExpenses]);

  return { markedDates };
};
