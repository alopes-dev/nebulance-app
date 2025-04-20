import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const RootContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const LogoBackground = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const AppName = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const WelcomeContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const WelcomeTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const WelcomeText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  text-align: center;
`;

export const FormContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const OptionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const RememberMeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxContainer = styled.View`
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const RememberMeText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const ForgotPasswordButton = styled.TouchableOpacity``;

export const ForgotPasswordText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  flex-direction: row;
  justify-content: center;
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const OrContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const OrLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
`;

export const OrText = styled.Text`
  margin: 0 ${(props: ThemeProps) => props.theme.spacing.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
`;

export const SocialButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const SignupContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SignupText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const SignupButton = styled.TouchableOpacity``;

export const SignupButtonText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;
