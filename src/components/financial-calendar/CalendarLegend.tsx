import React from "react";
import { useTheme } from "@/context/ThemeContext";

import * as S from "./CalendarLegend.styles";
import { CalendarLegendItem } from "./CalendarLegendItem";

export const CalendarLegend = () => {
  const { theme } = useTheme();

  const descriptionItems = [
    { description: "Past Days", color: theme.colors.border },
    { description: "Good Financial Status", color: theme.colors.success },
    {
      description: "Low Balance (20% of Monthly Expenses)",
      color: theme.colors.warning,
    },
    { description: "Negative Balance", color: theme.colors.danger },
  ];

  return (
    <S.Legend>
      {descriptionItems.map((item) => (
        <CalendarLegendItem
          key={item.description}
          description={item.description}
          color={item.color}
        />
      ))}
    </S.Legend>
  );
};
