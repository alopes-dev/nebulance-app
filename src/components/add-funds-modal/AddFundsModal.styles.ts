import styled, { css } from "styled-components/native";
import { ThemeProps } from "@/types";

export const FormContainer = styled.View`
  justify-content: space-between;
  flex: 1;
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

export const InputContainer = styled.View<{ error: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;

  ${(props: ThemeProps & { error: boolean }) =>
    props.error &&
    css`
      border-width: 1px;
      border-color: ${props.theme.colors.expense};
      margin-bottom: ${props.theme.spacing.sm}px;
    `}
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

export const Form = styled.View``;

export const AddButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.xxl}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.5 : 1)};
  flex-direction: row;
  justify-content: center;
  gap: ${(props: ThemeProps) => props.theme.spacing.sm}px;
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
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const FormActions = styled.View`
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;
