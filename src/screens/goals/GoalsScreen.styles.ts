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

export const HeaderTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const SearchButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
`;

export const SummaryCard = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const SummaryTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: #ffffff;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const SummaryContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const SummaryValue = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: #ffffff;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const SummaryLabel = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xs}px;
  color: rgba(255, 255, 255, 0.8);
`;

export const SummaryDivider = styled.View`
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  right: ${(props: ThemeProps) => props.theme.spacing.md}px;
  width: 45px;
  height: 45px;
  border-radius: 24px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const EmptyGoalsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const EmptyGoalsText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SkeletonContainer = styled.View`
  flex: 1;
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const SkeletonHeader = styled.View`
  height: 40px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const SkeletonSummaryCard = styled.View`
  height: 120px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
`;

export const SkeletonGoalCard = styled.View`
  height: 100px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const SkeletonSectionHeader = styled.View`
  height: 24px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  width: 120px;
`;
