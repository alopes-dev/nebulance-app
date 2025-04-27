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

export const ActionButtonsContainer = styled.View`
  flex-direction: row;
`;

export const ActionButtons = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
  margin-left: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const Content = styled.View``;

export const TransactionsList = styled.View`
  margin-bottom: 24px;
`;

export const TransactionDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
  font-weight: bold;
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
  animation: pulse 2s ease-in-out infinite;
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
