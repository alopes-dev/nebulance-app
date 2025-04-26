import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const CardContainer = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const IconContainer = styled.View<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps & { color: string }) => props.color};
  justify-content: center;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const HeaderContent = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const Deadline = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const MoreButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.colors.expense};
  border-radius: 16px;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const ProgressInfo = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const ProgressText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const TargetText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const PercentageText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.primary};
`;

export const ProgressBarContainer = styled.View`
  height: 8px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ProgressBar = styled.View<{
  percentage: number;
  color: string;
}>`
  width: ${(props: ThemeProps & { percentage: number }) => props.percentage}%;
  height: 100%;
  background-color: ${(props: ThemeProps & { color: string }) => props.color};
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RemainingText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const ActionFundsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const AddFundsButton = styled.TouchableOpacity`
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px
    ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const WithdrawFundsButton = styled(AddFundsButton)`
  background-color: ${(props: ThemeProps) => props.theme.colors.expense};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const AddFundsText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: #ffffff;
`;
