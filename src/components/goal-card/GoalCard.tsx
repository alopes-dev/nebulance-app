import type React from "react";
import { Ionicons } from "@expo/vector-icons";
import type { Goal } from "../../types";

import * as S from "./GoalCard.styles";

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { title, targetAmount, currentAmount, deadline, icon, color } = goal;

  const percentage = Math.round((currentAmount / targetAmount) * 100);
  const remaining = targetAmount - currentAmount;

  // Format date
  const formattedDate = new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <S.CardContainer>
      <S.HeaderContainer>
        <S.IconContainer color={color}>
          <Ionicons name={icon as any} size={20} color="#FFFFFF" />
        </S.IconContainer>

        <S.HeaderContent>
          <S.Title>{title}</S.Title>
          <S.Deadline>Due {formattedDate}</S.Deadline>
        </S.HeaderContent>

        <S.MoreButton>
          <Ionicons name="ellipsis-vertical" size={20} color="#9E9E9E" />
        </S.MoreButton>
      </S.HeaderContainer>

      <S.ProgressContainer>
        <S.ProgressInfo>
          <S.ProgressText>${currentAmount.toLocaleString()}</S.ProgressText>
          <S.TargetText>of ${targetAmount.toLocaleString()}</S.TargetText>
        </S.ProgressInfo>
        <S.PercentageText>{percentage}%</S.PercentageText>
      </S.ProgressContainer>

      <S.ProgressBarContainer>
        <S.ProgressBar percentage={percentage} color={color} />
      </S.ProgressBarContainer>

      <S.FooterContainer>
        <S.RemainingText>${remaining.toLocaleString()} left</S.RemainingText>
        <S.AddFundsButton onPress={onPress}>
          <S.AddFundsText>Add Funds</S.AddFundsText>
        </S.AddFundsButton>
      </S.FooterContainer>
    </S.CardContainer>
  );
};

export default GoalCard;
