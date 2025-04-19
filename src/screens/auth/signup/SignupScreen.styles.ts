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

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const EmptyView = styled.View`
  width: 40px;
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

export const TermsContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const CheckboxContainer = styled.View`
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  margin-top: 2px;
`;

export const TermsText = styled.Text`
  flex: 1;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  line-height: 20px;
`;

export const TermsHighlight = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
`;

export const SignupButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const SignupButtonText = styled.Text`
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

export const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoginText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const LoginButton = styled.TouchableOpacity``;

export const LoginButtonText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;
