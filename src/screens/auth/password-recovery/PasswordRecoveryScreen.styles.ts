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
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
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

export const IllustrationContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const IllustrationBackground = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.View`
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  text-align: center;
  line-height: 22px;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const ActionButtonText = styled.Text`
  color: white;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const ResendContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ResendText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const ResendButton = styled.TouchableOpacity``;

export const ResendButtonText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
`;

export const TouchableButton = styled.TouchableOpacity``;
