import type React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./BudgetProgressCard.styles";
import { useAuth } from "@/context/AuthContext";

interface BudgetProgressCardProps {
  title: string;
  current: number;
  max: number;
  icon: string;
  color: string;
}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({
  title,
  current,
  max,
  icon,
  color,
}) => {
  const { currency } = useAuth();
  const percentage = Math.min(Math.round((current / max) * 100), 100);
  const isOverBudget = current > max;

  return (
    <S.CardContainer>
      <S.HeaderContainer>
        <S.IconContainer color={color}>
          <Ionicons name={icon as any} size={16} color="#FFFFFF" />
        </S.IconContainer>
        <S.Title>{title}</S.Title>
      </S.HeaderContainer>

      <S.AmountContainer>
        <S.CurrentAmount isOverBudget={isOverBudget}>{current}</S.CurrentAmount>
        <S.MaxAmount>
          / {max} {currency}
        </S.MaxAmount>
      </S.AmountContainer>

      <S.ProgressBarContainer>
        <S.ProgressBar
          percentage={percentage}
          color={color}
          isOverBudget={isOverBudget}
        />
      </S.ProgressBarContainer>

      <S.PercentageText isOverBudget={isOverBudget}>
        {percentage}%
      </S.PercentageText>
    </S.CardContainer>
  );
};

export default BudgetProgressCard;
