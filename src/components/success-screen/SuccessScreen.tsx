import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as S from "./SuccessScreen.styles";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";

interface SuccessScreenProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onDismiss: () => void;
}

const SuccessScreen = ({
  title,
  description,
  icon,
  onDismiss,
}: SuccessScreenProps) => {
  const { theme } = useTheme();

  return (
    <S.Container>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <S.IconContainer>
          <Ionicons name={icon} size={48} color={theme.colors.success} />
        </S.IconContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </View>
      <S.Button onPress={onDismiss}>
        <S.ButtonText>Got it!</S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default SuccessScreen;
