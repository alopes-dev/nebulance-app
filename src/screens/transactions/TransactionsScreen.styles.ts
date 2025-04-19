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

export const ActionButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
  margin-left: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px
    ${(props: ThemeProps) => props.theme.spacing.md}px;
  background-color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? props.theme.colors.primary : props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const FilterText = styled.Text<{ active: boolean }>`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: ${(props: ThemeProps & { active: boolean }) =>
    props.active ? "#FFFFFF" : props.theme.colors.textSecondary};
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  right: ${(props: ThemeProps) => props.theme.spacing.xl}px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;
