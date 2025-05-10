import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
import SuccessScreen from "../successfly/successfly";
import { formatCurrency } from "@/helpers";
import { NebulaToast } from "../toast/Toast";
import AppModal from "../app-modal/AppModal";
import Successfly from "../successfly/successfly";

interface AddFundsModalProps {
  goalTitle: string;
  onAddOrWithdrawFunds: (amount: number, onSuccess: () => void) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  actionType: "add" | "withdraw" | "details";
  isLoading: boolean;
  targetAmount: number;
  currentAmount: number;
  onSuccess: () => void;
}

const AddFundsModal = ({
  goalTitle,
  onAddOrWithdrawFunds,
  bottomSheetModalRef,
  actionType,
  isLoading,
  targetAmount,
  currentAmount,
  onSuccess,
}: AddFundsModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const bottomSheetSuccessModalRef = useRef<BottomSheetModal>(null);
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const shouldShowAddFunds = actionType === "add";
  const isWithdraw = actionType === "withdraw";
  const isAdd = actionType === "add";

  const validateWithdrawal = useCallback(() => {
    const isExceedingTarget = amount && amount > targetAmount;
    if (isExceedingTarget) {
      const formattedTarget = formatCurrency(targetAmount);
      return `You have ${formattedTarget} in your target amount. You cannot withdraw more than this.`;
    }
    return null;
  }, [amount, targetAmount]);

  const validateAddition = useCallback(() => {
    const isExceedingBalance = amount && amount > currentAmount;
    if (isExceedingBalance) {
      const formattedBalance = formatCurrency(currentAmount);
      return `You have ${formattedBalance} in your account. You cannot add more than this.`;
    }
    return null;
  }, [amount, currentAmount]);

  useEffect(() => {
    if (isWithdraw) {
      setError(validateWithdrawal());
    } else if (isAdd) {
      setError(validateAddition());
    }
  }, [isWithdraw, isAdd, validateAddition, validateWithdrawal]);

  const handleAddOrWithdrawFunds = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (amount && amount > 0 && (!isWithdraw || amount <= targetAmount)) {
      onAddOrWithdrawFunds(amount, () => {
        onSuccess();
        setTimeout(() => {
          setShowSuccess(true);
        }, 300);
      });
    }
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    setAmount(null);
    bottomSheetSuccessModalRef.current?.dismiss();
  };

  if (showSuccess) {
    return (
      <Successfly
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
    );
  }

  return (
    <AppModal
      bottomSheetModalRef={bottomSheetModalRef}
      title={shouldShowAddFunds ? "Add Funds" : "Withdraw Funds"}
    >
      <S.FormContainer>
        <S.Form>
          <S.GoalInfo>
            <S.GoalTitle>{goalTitle}</S.GoalTitle>
            <S.GoalSubtitle>
              {shouldShowAddFunds
                ? "Enter amount to add"
                : "Enter amount to withdraw"}
            </S.GoalSubtitle>
          </S.GoalInfo>

          <S.InputContainer error={!!error}>
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

          {error && <S.ErrorText>{error}</S.ErrorText>}
        </S.Form>

        <S.FormActions>
          <S.AddButton
            onPress={handleAddOrWithdrawFunds}
            disabled={isLoading || !!error}
          >
            <S.AddButtonText>
              {shouldShowAddFunds ? "Add Funds" : "Withdraw Funds"}
            </S.AddButtonText>
            {isLoading && (
              <ActivityIndicator size="small" color={theme.colors.text} />
            )}
          </S.AddButton>
        </S.FormActions>

        <NebulaToast />
      </S.FormContainer>
    </AppModal>
  );
};

export default AddFundsModal;
