import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
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

export const HeaderTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const NotificationIcon = styled(Ionicons)`
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const PeriodSelector = styled.View`
  flex-direction: row;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const PeriodButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px
    ${(props: ThemeProps) => props.theme.spacing.sm}px;
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.sm}px;
  background-color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? props.theme.colors.primary : "transparent"};
`;

export const PeriodText = styled.Text<{ active: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? "#FFFFFF" : props.theme.colors.textSecondary};
`;

export const BudgetCardsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 16,
  },
})`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ViewAllButton = styled.TouchableOpacity``;

export const ViewAllText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps) => props.theme.colors.primary};
`;

export const TransactionsContainer = styled.View`
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;
