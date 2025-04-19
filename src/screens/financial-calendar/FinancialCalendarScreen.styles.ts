import styled, { ThemeProps } from "styled-components/native";

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
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  padding-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xxl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const Balance = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-weight: bold;
`;

export const Legend = styled.View`
  margin-top: 24px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const LegendDot = styled.View<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: 8px;
  background-color: ${(props: { color: string }) => props.color};
`;

export const LegendText = styled.Text`
  font-size: 14px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const CardContainer = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  width: 100%;
  margin-right: ${(props: ThemeProps) => props.theme.spacing.md}px;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;
