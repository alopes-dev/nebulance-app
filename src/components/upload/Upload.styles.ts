import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const Container = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  position: relative;
`;

export const FieldLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const DropdownButtonText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const OptionsContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  z-index: 10;
`;

export const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps & { isSelected: boolean }) =>
    props.isSelected ? props.theme.colors.primary + "15" : "white"};
`;

export const OptionText = styled.Text<{ isSelected: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps & { isSelected: boolean }) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${(props: ThemeProps & { isSelected: boolean }) =>
    props.isSelected
      ? props.theme.fontWeights.medium
      : props.theme.fontWeights.regular};
`;

export const CardContainer = styled.TouchableOpacity<{ selected: boolean }>`
  width: 48%;
  background-color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected
      ? props.theme.colors.primary + "15"
      : props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  border-width: 2px;
  border-color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected ? props.theme.colors.primary : "transparent"};
  position: relative;
`;

export const IconContainer = styled.View<{ selected: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected
      ? props.theme.colors.primary
      : props.theme.colors.primary + "15"};
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const CardTitle = styled.Text<{ selected: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.text};
`;

export const CheckmarkContainer = styled.View`
  position: absolute;
  top: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  background-color: white;
  border-radius: 10px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: ThemeProps) => props.theme.colors.card};
`;

export const IconContainerPreview = styled.View<{ isExpense: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps & { isExpense: boolean }) =>
    props.isExpense ? props.theme.colors.expense : props.theme.colors.income};
  justify-content: center;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const Amount = styled.Text<{ isExpense: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps & { isExpense: boolean }) =>
    props.isExpense ? props.theme.colors.expense : props.theme.colors.income};
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
`;

export const Detail = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const FileSourceCardContainer = styled.TouchableOpacity<{
  selected: boolean;
}>`
  background-color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  margin: 8px;
  min-width: 160px;
  flex: 1;
  opacity: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? 0.5 : 1};
`;

export const FileSourceIcon = styled.View<{ selected: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected
      ? props.theme.colors.primary
      : props.theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const FileSourceTitle = styled.Text<{ selected: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps & { selected: boolean }) =>
    props.selected ? "#FFFFFF" : props.theme.colors.text};
  text-align: center;
`;

export const FieldMappingContainer = styled.View`
  margin-top: 16px;
`;

export const TransactionPreviewContainer = styled.View`
  margin-top: 16px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  padding: 0 16px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  padding: 12px 24px;
  border-radius: 8px;
  flex: 1;
  margin-left: 16px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  padding: 12px 24px;
  border-radius: 8px;
  flex: 1;
`;

export const PrimaryButtonText = styled.Text`
  color: #ffffff;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  text-align: center;
`;

export const SecondaryButtonText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  text-align: center;
`;
