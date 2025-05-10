import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as S from "./successfly.styles";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
import AppModal from "../app-modal/AppModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface SuccessScreenProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onDismiss: () => void;
}

const Successfly = ({
  title,
  description,
  icon,
  onDismiss,
}: SuccessScreenProps) => {
  const { theme } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDismissSuccess = () => {
    bottomSheetModalRef.current?.dismiss();
    onDismiss();
  };
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <AppModal bottomSheetModalRef={bottomSheetModalRef} title="">
      <S.Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <S.IconContainer>
            <Ionicons name={icon} size={48} color={theme.colors.success} />
          </S.IconContainer>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </View>
        <S.Button onPress={handleDismissSuccess}>
          <S.ButtonText>Got it!</S.ButtonText>
        </S.Button>
      </S.Container>
    </AppModal>
  );
};

export default Successfly;
