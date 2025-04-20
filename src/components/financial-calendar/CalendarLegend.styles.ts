import styled, { ThemeProps } from "styled-components/native";

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
