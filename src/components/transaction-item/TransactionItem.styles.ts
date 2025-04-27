import { Theme } from "@/theme";
import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: ThemeProps) => props.theme.colors.card};
`;

export const IconContainer = styled.View<{
  isExpense: boolean;
  isGoal: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(
    props: ThemeProps & { isExpense: boolean; isGoal: boolean }
  ) =>
    props.isExpense
      ? props.theme.colors.expense
      : props.isGoal
      ? props.theme.colors.border
      : props.theme.colors.income};
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
  max-width: 70%;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const Amount = styled.Text<{
  isExpense: boolean;
  isGoal: boolean;
}>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps & { isExpense: boolean; isGoal: boolean }) =>
    props.isExpense
      ? props.theme.colors.expense
      : props.isGoal
      ? props.theme.colors.text
      : props.theme.colors.income};
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
`;

export const Detail = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;
