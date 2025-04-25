import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export const IconContainer = styled.View`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: ${(props: ThemeProps) => props.theme.colors.success}20;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const Description = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px
    ${(props: ThemeProps) => props.theme.spacing.xl}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.xxl}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  width: 100%;
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  text-align: center;
`;
