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
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  padding-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
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

export const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  padding: 0 ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ProgressStep = styled.View<{
  active: boolean;
  completed: boolean;
}>`
  align-items: center;
`;

export const ProgressStepCircle = styled.View<{
  active: boolean;
  completed: boolean;
}>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(
    props: ThemeProps & { completed: boolean; active: boolean }
  ) =>
    props.completed
      ? props.theme.colors.primary
      : props.active
      ? props.theme.colors.primary
      : props.theme.colors.card};
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const ProgressStepNumber = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.primary};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
`;

export const ProgressStepLabel = styled.Text<{ active: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  font-weight: ${(props: ThemeProps & { active: boolean }) =>
    props.active
      ? props.theme.fontWeights.medium
      : props.theme.fontWeights.regular};
`;

export const ProgressLine = styled.View<{ active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? props.theme.colors.primary : props.theme.colors.card};
  margin: 0 ${(props: ThemeProps) => props.theme.spacing.xs}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const StepContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const StepTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const StepDescription = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const SourcesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FieldMappingContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const FileMappingContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TransactionSummary = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const SummaryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px 0;
`;

export const SummaryLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
`;

export const SummaryValue = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const PreviewTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const TransactionPreviewContainer = styled.ScrollView`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const PrimaryButton = styled.TouchableOpacity<{
  disabled: boolean;
}>`
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.card : props.theme.colors.primary};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px
    ${(props: ThemeProps) => props.theme.spacing.lg}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  flex: 1;
  align-items: center;
  margin-left: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  opacity: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? 0.5 : 1};
`;

export const PrimaryButtonText = styled.Text`
  color: white;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const SecondaryButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px
    ${(props: ThemeProps) => props.theme.spacing.lg}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  flex: 1;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const SecondaryButtonText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const UploadingContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const UploadingText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const FileIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xxl}px;
  border-radius: 70px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;
