import styled, { ThemeProps } from "styled-components/native";
import { Theme } from "@/theme";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";

export const BottomSheetModal = styled(GorhomBottomSheetModal)`
  flex: 1;
`;

export const RootContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const FormContent = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${(props: { theme: Theme }) => props.theme.spacing.sm}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
  color: ${(props: { theme: Theme }) => props.theme.colors.text};
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
`;

export const ProgressStep = styled.View<{
  active: boolean;
  completed?: boolean;
}>`
  align-items: center;
  flex: 1;
`;

export const ProgressStepCircle = styled.View<{
  active: boolean;
  completed?: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props: {
    theme: Theme;
    active: boolean;
    completed?: boolean;
  }) =>
    props.completed
      ? props.theme.colors.primary
      : props.active
      ? props.theme.colors.primary
      : props.theme.colors.border};
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xs}px;
`;

export const ProgressStepNumber = styled.Text`
  color: ${(props: { theme: Theme }) => props.theme.colors.text};
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
`;

export const ProgressStepLabel = styled.Text<{ active: boolean }>`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.xs}px;
  color: ${(props: { theme: Theme; active: boolean }) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.textSecondary};
  text-align: center;
`;

export const ProgressLine = styled.View<{ active?: boolean }>`
  height: 2px;
  flex: 1;
  background-color: ${(props: { theme: Theme; active?: boolean }) =>
    props.active ? props.theme.colors.primary : props.theme.colors.border};
  margin: 0 ${(props: { theme: Theme }) => props.theme.spacing.xs}px;
`;

export const FormContainer = styled.View`
  flex: 1;
`;

export const StepTitle = styled.Text`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
  color: ${(props: { theme: Theme }) => props.theme.colors.text};
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xs}px;
`;

export const StepDescription = styled.Text`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.md}px;
  color: ${(props: { theme: Theme }) => props.theme.colors.textSecondary};
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
  margin-top: ${(props: { theme: Theme }) => props.theme.spacing.xs}px;
`;

export const ContinueButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props: { theme: Theme; disabled?: boolean }) =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  padding: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
  border-radius: ${(props: { theme: Theme }) => props.theme.borderRadius.xxl}px;
  align-items: center;
  margin-top: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
  flex-direction: row;
  justify-content: center;
  gap: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
`;

export const ContinueButtonText = styled.Text`
  color: ${(props: { theme: Theme }) => props.theme.colors.text};
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.md}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
`;

export const CurrencyStyleContainer = styled.View`
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.xl}px;
  gap: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
`;

export const CurrencyStyleLabel = styled.Text`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.md}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
  color: ${(props: { theme: Theme }) => props.theme.colors.text};
`;

export const CurrencyStyleOptionsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  gap: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
`;

export const CurrencyStyleOption = styled.TouchableOpacity<{
  selected: boolean;
}>`
  padding: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
  border-radius: ${(props: { theme: Theme }) => props.theme.borderRadius.md}px;
  background-color: ${(props: { theme: Theme; selected: boolean }) =>
    props.selected ? props.theme.colors.card : props.theme.colors.background};
  border-width: 1px;
  border-color: ${(props: { theme: Theme; selected: boolean }) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.border};
  margin-right: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
`;

export const CurrencyStyleOptionText = styled.Text<{ selected: boolean }>`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.md}px;
  font-weight: ${(props: { theme: Theme }) => props.theme.fontWeights.bold};
  color: ${(props: { theme: Theme; selected: boolean }) =>
    props.selected
      ? props.theme.colors.text
      : props.theme.colors.textSecondary};
`;

export const CurrencyStyleExample = styled.Text<{ selected: boolean }>`
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.sm}px;
  color: ${(props: { theme: Theme; selected: boolean }) =>
    props.selected
      ? props.theme.colors.text
      : props.theme.colors.textSecondary};
`;

export const ErrorText = styled.Text`
  color: ${(props: { theme: Theme }) => props.theme.colors.danger};
  font-size: ${(props: { theme: Theme }) => props.theme.fontSizes.sm}px;
  margin-top: ${(props: { theme: Theme }) => props.theme.spacing.xs}px;
  margin-bottom: ${(props: { theme: Theme }) => props.theme.spacing.md}px;
`;
