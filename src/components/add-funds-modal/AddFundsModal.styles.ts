import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const Container = styled.View`
  flex: 1;
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
`;

export const GoalInfo = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const GoalTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const GoalSubtitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xxl}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
`;

export const CurrencySymbol = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const AmountInput = styled.TextInput`
  flex: 1;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px 0;
`;

export const AddButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const AddButtonText = styled.Text`
  color: #ffffff;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.danger};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  text-align: center;
`;
