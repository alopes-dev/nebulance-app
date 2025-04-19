import type React from "react";
import * as S from "./SocialButton.styles";
import { Ionicons } from "@expo/vector-icons";

interface SocialButtonProps {
  icon: string;
  color: string;
  onPress?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  color,
  onPress,
}) => {
  return (
    <S.ButtonContainer
      color={color}
      onPress={onPress || (() => console.log(`${icon} login`))}
    >
      <Ionicons name={icon as any} size={24} color="#FFFFFF" />
    </S.ButtonContainer>
  );
};

export default SocialButton;
