import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const InputContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const InputLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const InputWrapper = styled.View<{ hasError?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${(props: ThemeProps & { hasError?: boolean }) =>
    props.hasError ? props.theme.colors.danger : "transparent"};
`;

export const IconContainer = styled.View`
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px
    ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const RightIconContainer = styled.View`
  padding-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const StyledTextInput = styled.TextInput<{
  hasIcon: boolean;
  hasRightIcon: boolean;
  hasError?: boolean;
}>`
  flex: 1;
  height: 50px;
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  padding-left: ${(props: ThemeProps & { hasIcon: boolean }) =>
    props.hasIcon ? 0 : props.theme.spacing.md}px;
  padding-right: ${(props: ThemeProps & { hasRightIcon: boolean }) =>
    props.hasRightIcon ? 0 : props.theme.spacing.md}px;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.danger};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;
