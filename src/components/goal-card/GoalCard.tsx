import type React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import type { IGoal } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./GoalCard.styles";
import { ActivityIndicator } from "react-native";

interface GoalCardProps {
  goal: IGoal;
  onPress: (action: "add" | "withdraw" | "details") => void;
  preventPress?: boolean;
  onDelete?: () => void;
  isDeletingGoal?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onPress,
  preventPress,
  onDelete,
  isDeletingGoal,
}) => {
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

  const opacityStyle = preventPress
    ? {
        activeOpacity: 1,
      }
    : {};

  return (
    <S.CardContainer
      disabled={preventPress}
      onPress={() => {
        if (!preventPress) onPress("details");
      }}
      {...opacityStyle}
    >
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

        {onDelete && !isDeletingGoal && (
          <S.MoreButton onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={20}
              color={theme.colors.text}
            />
          </S.MoreButton>
        )}
        {isDeletingGoal && onDelete && (
          <ActivityIndicator size="small" color={theme.colors.text} />
        )}
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
