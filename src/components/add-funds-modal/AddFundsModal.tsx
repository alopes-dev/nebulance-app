import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CurrencyInput from "react-native-currency-input";
import * as S from "./AddFundsModal.styles";
import { useTheme } from "@/context/ThemeContext";
import * as Haptics from "expo-haptics";
import SuccessScreen from "../success-screen/SuccessScreen";

interface AddFundsModalProps {
  goalId: string;
  goalTitle: string;
  onAddOrWithdrawFunds: (amount: number, onSuccess: () => void) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  actionType: "add" | "withdraw" | "details";
  isLoading: boolean;
}

const AddFundsModal = ({
  goalId,
  goalTitle,
  onAddOrWithdrawFunds,
  bottomSheetModalRef,
  actionType,
  isLoading,
}: AddFundsModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const bottomSheetSuccessModalRef = useRef<BottomSheetModal>(null);
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

  const handleAddOrWithdrawFunds = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (amount && amount > 0) {
      onAddOrWithdrawFunds(amount, () => {
        setShowSuccess(true);
        bottomSheetSuccessModalRef.current?.present();
      });
    }
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    setAmount(null);
    bottomSheetSuccessModalRef.current?.dismiss();
  };

  const shouldShowAddFunds = actionType === "add";

  if (showSuccess) {
    return (
      <BottomSheetModal
        ref={bottomSheetSuccessModalRef}
        index={0}
        snapPoints={["100"]}
        onDismiss={handleDismissSuccess}
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
          display: "none",
        }}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        enableOverDrag={false}
      >
        <SuccessScreen
          title={
            shouldShowAddFunds
              ? "Funds Added Successfully!"
              : "Funds Withdrawn Successfully!"
          }
          description={`${
            shouldShowAddFunds ? "Added" : "Withdrawn"
          } $${amount?.toLocaleString()} to ${goalTitle}`}
          icon={shouldShowAddFunds ? "checkmark-circle" : "arrow-up-circle"}
          onDismiss={handleDismissSuccess}
        />
      </BottomSheetModal>
    );
  }

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
              <S.HeaderTitle>
                {shouldShowAddFunds ? "Add Funds" : "Withdraw Funds"}
              </S.HeaderTitle>
              <S.CloseButton
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              >
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </S.CloseButton>
            </S.Header>

            <S.GoalInfo>
              <S.GoalTitle>{goalTitle}</S.GoalTitle>
              <S.GoalSubtitle>
                {shouldShowAddFunds
                  ? "Enter amount to add"
                  : "Enter amount to withdraw"}
              </S.GoalSubtitle>
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
              onPress={handleAddOrWithdrawFunds}
              disabled={!amount || amount <= 0}
            >
              <S.AddButtonText>
                {shouldShowAddFunds ? "Add Funds" : "Withdraw Funds"}
              </S.AddButtonText>
              {isLoading && (
                <ActivityIndicator size="small" color={theme.colors.text} />
              )}
            </S.AddButton>
          </S.Container>
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
};

export default AddFundsModal;
