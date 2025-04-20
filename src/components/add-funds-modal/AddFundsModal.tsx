import React, { useEffect, useState, useMemo } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CurrencyInput from "react-native-currency-input";
import * as S from "./AddFundsModal.styles";
import { useTheme } from "@/context/ThemeContext";
import * as Haptics from "expo-haptics";
interface AddFundsModalProps {
  goalId: string;
  goalTitle: string;
  onAddFunds: (amount: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const AddFundsModal = ({
  goalId,
  goalTitle,
  onAddFunds,
  bottomSheetModalRef,
}: AddFundsModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const { theme } = useTheme();

  const snapPoints = useMemo(() => ["50%"], []);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
      bottomSheetModalRef.current?.snapToPosition("65%");
    });

    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
      bottomSheetModalRef.current?.snapToPosition("50%");
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleAddFunds = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (amount && amount > 0) {
      onAddFunds(amount);
      setAmount(null);
      bottomSheetModalRef.current?.dismiss();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={() => {
        setAmount(null);
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
        shadowRadius: 24,
        elevation: 64,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.text,
        width: 40,
        height: 4,
        borderRadius: 4,
      }}
      enablePanDownToClose
      enableDynamicSizing={false}
      enableOverDrag
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      enableHandlePanningGesture
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <S.Container>
            <S.Header>
              <S.HeaderTitle>Add Funds</S.HeaderTitle>
              <S.CloseButton
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              >
                <Ionicons name="close" size={24} color="#333" />
              </S.CloseButton>
            </S.Header>

            <S.GoalInfo>
              <S.GoalTitle>{goalTitle}</S.GoalTitle>
              <S.GoalSubtitle>Enter amount to add</S.GoalSubtitle>
            </S.GoalInfo>

            <S.InputContainer>
              <CurrencyInput
                value={amount}
                onChangeValue={setAmount}
                prefix="$"
                delimiter=","
                separator="."
                precision={2}
                minValue={0}
                maxValue={999999999.99}
                placeholder="$0.00"
                placeholderTextColor={theme.colors.text}
                keyboardType="decimal-pad"
                autoFocus
                style={{
                  fontSize: 30,
                  color: theme.colors.text,
                  flex: 1,
                  fontWeight: "bold",
                  textAlign: "left",
                  padding: 12,
                }}
              />
            </S.InputContainer>

            <S.AddButton
              onPress={handleAddFunds}
              disabled={!amount || amount <= 0}
            >
              <S.AddButtonText>Add Funds</S.AddButtonText>
            </S.AddButton>
          </S.Container>
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
};

export default AddFundsModal;
