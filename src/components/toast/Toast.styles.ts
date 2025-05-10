import { ThemeProps } from "@/types";
import styled from "styled-components/native";

export const ErrorText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.danger};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ErrorToast = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.expense};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  width: 90%;
`;

export const ErrorToastText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
`;

export const SuccessToast = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.success};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  width: 90%;
`;

export const SuccessToastText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
`;
