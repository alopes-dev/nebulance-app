import React, { useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./AppModal.styles";

interface AppModalProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
}

const AppModal: React.FC<AppModalProps> = ({
  bottomSheetModalRef,
  title,
  children,
  snapPoints,
  enablePanDownToClose = false,
}) => {
  const { theme } = useTheme();
  const computedSnapPoints = useMemo(
    () => snapPoints ?? ["100%"],
    [snapPoints]
  );

  return (
    <S.BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={computedSnapPoints}
      onDismiss={() => {
        bottomSheetModalRef.current?.dismiss();
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 64,
      }}
      handleIndicatorStyle={{
        backgroundColor: enablePanDownToClose
          ? theme.colors.text
          : "transparent",
        width: 40,
        height: 4,
        borderRadius: 4,
      }}
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={false}
      enableOverDrag
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      enableHandlePanningGesture
    >
      <S.Container>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <Ionicons name="close" size={24} color={theme.colors.primary} />
          </S.CloseButton>
        </S.Header>

        {children}
      </S.Container>
    </S.BottomSheetModal>
  );
};

export default AppModal;
