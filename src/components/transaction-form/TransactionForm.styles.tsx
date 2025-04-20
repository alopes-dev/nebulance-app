import styled from "styled-components/native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ThemeProps } from "@/types";

export const FormTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const FormRow = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;

export const TypeButton = styled.TouchableOpacity<{
  active: boolean;
  color: string;
}>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({
    active,
    theme,
    color,
  }: ThemeProps & { active: boolean; color: string }) =>
    active ? color : theme.colors.card};
  align-items: center;
`;

export const TypeText = styled.Text<{ active: boolean }>`
  color: ${({ theme }: ThemeProps & { active: boolean }) => theme.colors.text};
  font-weight: ${({ active }: { active: boolean }) =>
    active ? "bold" : "normal"};
`;

export const FormInput = styled(BottomSheetTextInput)`
  background-color: ${({ theme }: ThemeProps) => theme.colors.card};
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  height: 80px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
`;

export const DropdownContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const SubmitButtonText = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-weight: bold;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
`;
