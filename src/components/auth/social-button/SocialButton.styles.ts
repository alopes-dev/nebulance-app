import styled from "styled-components/native";
import { ThemeProps } from "@/types";

export const ButtonContainer = styled.TouchableOpacity<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props: ThemeProps & { color: string }) => props.color};
  justify-content: center;
  align-items: center;
`;
