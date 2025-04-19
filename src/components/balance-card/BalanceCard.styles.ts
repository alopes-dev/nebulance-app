import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const CardContainer = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  width: 100%;
`;

export const BalanceSection = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const BalanceLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const BalanceAmount = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: #ffffff;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const StatItem = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const StatIconContainer = styled.View<{ color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props: ThemeProps & { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const StatContent = styled.View`
  flex: 1;
`;

export const StatLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const StatValue = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: #ffffff;
`;

export const StatDivider = styled.View`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 ${(props: ThemeProps) => props.theme.spacing.md}px;
`;
