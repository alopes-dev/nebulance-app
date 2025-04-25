import { useState } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "@/context/ThemeContext";
import * as Haptics from "expo-haptics";

import type { ICategory, Transaction } from "@/types";
import * as S from "./TransactionForm.styles";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import { CATEGORY_ITEMS } from "@/helpers";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import { useAuth } from "@/context/AuthContext";
type TransactionFormProps = {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  onSubmit: (transaction: Omit<Transaction, "id" | "date">) => void;
};

const TransactionForm = ({
  bottomSheetRef,
  onSubmit,
}: TransactionFormProps) => {
  const { theme, isDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, accountInfo } = useAuth();
  const { mutateCreateTransaction, isCreatingTransaction } =
    useTransactionsQueries();
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      type: "expense" as "expense" | "income",
      icon: "cart",
    },
  });

  const transactionType = watch("type");

  const snapPoints = ["64%"];

  const onSubmitForm = (data: any) => {
    console.log(data);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    mutateCreateTransaction(
      {
        description: data.title,
        amount: data.amount,
        category: data.category,
        type: data.type?.toUpperCase(),
        date: new Date().toISOString(),
        userId: user?.id,
        accountId: accountInfo?.id,
      },
      {
        onSuccess: () => {
          bottomSheetRef.current?.dismiss();
          reset();
        },
        onError: () => {
          alert("Error creating transaction");
        },
      }
    );
  };

  const isDisabled =
    isCreatingTransaction ||
    watch("title") === "" ||
    watch("amount") === 0 ||
    watch("category") === "";

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={() => {
        bottomSheetRef.current?.dismiss();
        reset();
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
        style={{ flex: 1, padding: 16 }}
      >
        <S.FormTitle>Add Transaction</S.FormTitle>

        <S.FormRow>
          <S.TypeButton
            active={transactionType === "expense"}
            color={
              transactionType === "expense"
                ? theme.colors.expense
                : theme.colors.card
            }
            onPress={() => setValue("type", "expense")}
          >
            <S.TypeText active={transactionType === "expense"}>
              Expense
            </S.TypeText>
          </S.TypeButton>
          <S.TypeButton
            active={transactionType === "income"}
            color={
              transactionType === "income"
                ? theme.colors.income
                : theme.colors.card
            }
            onPress={() => setValue("type", "income")}
          >
            <S.TypeText active={transactionType === "income"}>
              Income
            </S.TypeText>
          </S.TypeButton>
        </S.FormRow>

        <S.FormInput
          placeholder="Title"
          onChangeText={(text: string) => setValue("title", text)}
          {...register("title")}
        />
        <S.InputContainer>
          <CurrencyInput
            value={watch("amount")}
            onChangeValue={(value) => setValue("amount", value || 0)}
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
              fontSize: theme.fontSizes.xl,
              color: theme.colors.text,
              flex: 1,
              fontWeight: "bold",
              textAlign: "left",
              padding: 12,
            }}
          />
        </S.InputContainer>

        <S.DropdownContainer>
          <DropDownPicker
            open={dropdownOpen}
            value={watch("category")}
            items={CATEGORY_ITEMS}
            setOpen={setDropdownOpen}
            setValue={(callback) => {
              if (typeof callback === "function") {
                const newValue = callback(watch("category"));
                setValue("category", newValue);
              } else {
                setValue("category", callback);
              }
            }}
            style={{
              backgroundColor: theme.colors.card,
              borderColor: "transparent",
              height: 80,
              borderRadius: theme.borderRadius.lg,
            }}
            textStyle={{
              color: theme.colors.text,
              paddingHorizontal: theme.spacing.md,
              fontSize: theme.fontSizes.xl,
              fontWeight: "bold",
            }}
            dropDownContainerStyle={{
              backgroundColor: theme.colors.card,
              borderColor: "transparent",
            }}
            theme={isDarkMode ? "DARK" : "LIGHT"}
          />
        </S.DropdownContainer>

        <S.SubmitButton
          onPress={handleSubmit(onSubmitForm)}
          disabled={isDisabled}
        >
          <S.SubmitButtonText>Add Transaction</S.SubmitButtonText>
          {isCreatingTransaction && (
            <ActivityIndicator size="small" color={theme.colors.text} />
          )}
        </S.SubmitButton>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
};

export default TransactionForm;
