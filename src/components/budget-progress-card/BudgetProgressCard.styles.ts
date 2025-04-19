import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const CardContainer = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  width: 160px;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const IconContainer = styled.View<{ color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props: ThemeProps & { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const AmountContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const CurrentAmount = styled.Text<{ isOverBudget: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps & { isOverBudget: boolean }) =>
    props.isOverBudget ? props.theme.colors.expense : props.theme.colors.text};
`;

export const MaxAmount = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const ProgressBarContainer = styled.View`
  height: 6px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const ProgressBar = styled.View<{
  percentage: number;
  color: string;
  isOverBudget: boolean;
}>`
  width: ${(props: ThemeProps & { percentage: number }) => props.percentage}%;
  height: 100%;
  background-color: ${(
    props: ThemeProps & { isOverBudget: boolean; color: string }
  ) => (props.isOverBudget ? props.theme.colors.expense : props.color)};
`;

export const PercentageText = styled.Text<{ isOverBudget: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps & { isOverBudget: boolean }) =>
    props.isOverBudget
      ? props.theme.colors.expense
      : props.theme.colors.textSecondary};
  align-self: flex-end;
`;
