import type React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import type { IGoal } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./GoalCard.styles";

interface GoalCardProps {
  goal: IGoal;
  onPress: (action: "add" | "withdraw") => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { name, targetAmount, currentAmount, deadline, icon, color } = goal;
  const { theme } = useTheme();

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
        <S.IconContainer color={color ?? theme.colors.secondary}>
          {icon ? (
            <Ionicons name={icon as any} size={20} color="#FFFFFF" />
          ) : (
            <FontAwesome5 name="piggy-bank" size={20} color="#FFFFFF" />
          )}
        </S.IconContainer>

        <S.HeaderContent>
          <S.Title>{name}</S.Title>
          <S.Deadline>Due {formattedDate}</S.Deadline>
        </S.HeaderContent>
      </S.HeaderContainer>

      <S.ProgressContainer>
        <S.ProgressInfo>
          <S.ProgressText>${currentAmount.toLocaleString()}</S.ProgressText>
          <S.TargetText>of ${targetAmount.toLocaleString()}</S.TargetText>
        </S.ProgressInfo>
        <S.PercentageText>{percentage}%</S.PercentageText>
      </S.ProgressContainer>

      <S.ProgressBarContainer>
        <S.ProgressBar
          percentage={percentage}
          color={color ?? theme.colors.secondary}
        />
      </S.ProgressBarContainer>

      <S.FooterContainer>
        <S.RemainingText>${remaining.toLocaleString()} left</S.RemainingText>
        <S.ActionFundsContainer>
          <S.WithdrawFundsButton onPress={() => onPress("withdraw")}>
            <S.AddFundsText>Withdraw</S.AddFundsText>
          </S.WithdrawFundsButton>
          <S.AddFundsButton onPress={() => onPress("add")}>
            <S.AddFundsText>Add Funds</S.AddFundsText>
          </S.AddFundsButton>
        </S.ActionFundsContainer>
      </S.FooterContainer>
    </S.CardContainer>
  );
};

export default GoalCard;
