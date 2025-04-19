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

export const SettingsButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  justify-content: center;
  align-items: center;
`;

export const ProfileSection = styled.View`
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const ProfileName = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const ProfileEmail = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const EditProfileButton = styled.TouchableOpacity`
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px
    ${(props: ThemeProps) => props.theme.spacing.lg}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;

export const EditProfileText = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.medium};
  color: #ffffff;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.lg}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const MenuCard = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  overflow: hidden;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const MenuIconContainer = styled.View<{ bgColor: string }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props: ThemeProps & { bgColor: string }) =>
    props.bgColor};
  justify-content: center;
  align-items: center;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const MenuText = styled.Text`
  flex: 1;
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const CurrencyValue = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.sm}px;
  color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
  margin-right: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
  margin-left: ${(props: ThemeProps) =>
    props.theme.spacing.xl + props.theme.spacing.md}px;
`;
