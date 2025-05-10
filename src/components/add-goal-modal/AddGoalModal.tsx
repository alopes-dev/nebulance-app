import React, { useEffect, useMemo, useState, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { IGoal } from "@/types";
import * as S from "./AddGoalModal.styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ActivityIndicator, Keyboard } from "react-native";
import CurrencyInput from "react-native-currency-input";
import SuccessScreen from "../success-screen/SuccessScreen";

interface AddGoalModalProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  onSaveGoal: (
    goal: Omit<IGoal, "id" | "currentAmount">,
    onSuccess: () => void
  ) => void;
  isLoading: boolean;
  goal?: IGoal;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  bottomSheetModalRef,
  onSaveGoal,
  isLoading,
  goal,
}) => {
  const { theme, isDarkMode } = useTheme();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [deadline, setDeadline] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const bottomSheetSuccessModalRef = useRef<BottomSheetModal>(null);

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

  const resetForm = () => {
    setName("");
    setTargetAmount(null);
    setDeadline(new Date());
  };
  const isEditing = !!goal;

  const handleSaveGoal = () => {
    if (!name || !targetAmount || !deadline) return;

    onSaveGoal(
      {
        name,
        targetAmount,
        deadline,
      },
      () => {
        setShowSuccess(true);
        bottomSheetSuccessModalRef.current?.present();
      }
    );
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    resetForm();
    bottomSheetModalRef.current?.dismiss();
    bottomSheetSuccessModalRef.current?.dismiss();
  };

  useEffect(() => {
    if (isEditing) {
      setName(goal?.name ?? "");
      setTargetAmount(goal?.targetAmount ?? null);
      setDeadline(new Date(goal?.deadline ?? new Date()));
    }
  }, [goal]);

  const isFormValid = name && targetAmount && deadline;

  if (showSuccess) {
    bottomSheetSuccessModalRef.current?.present();
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
          shadowRadius: 8,
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
            isEditing
              ? "Goal Updated Successfully!"
              : "Goal Created Successfully!"
          }
          description={`${
            isEditing ? "Updated" : "Created"
          } goal "${name}" with target amount of $${targetAmount?.toLocaleString()}`}
          icon="checkmark-circle"
          onDismiss={handleDismissSuccess}
        />
      </BottomSheetModal>
    );
  }

  return (
    <S.BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
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
      <S.Container>
        <S.Header>
          <S.Title>{isEditing ? "Edit Goal" : "Add New Goal"}</S.Title>
          <S.CloseButton onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <Ionicons name="close" size={24} color={theme.colors.text} />
          </S.CloseButton>
        </S.Header>

        <S.Form>
          <S.Input
            placeholder="Goal name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.colors.border}
          />
          <S.InputContainer>
            <CurrencyInput
              value={targetAmount}
              onChangeValue={setTargetAmount}
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
                fontSize: 18,
                color: theme.colors.text,
                flex: 1,
                fontWeight: "bold",
                textAlign: "left",
                padding: 12,
                height: 40,
              }}
            />
          </S.InputContainer>

          <DateTimePicker
            value={deadline}
            onChange={(event: any, selectedDate?: Date) => {
              if (selectedDate) {
                setDeadline(selectedDate);
              }
            }}
            minimumDate={new Date()}
            mode="date"
            display="default"
            textColor={theme.colors.text}
            themeVariant={isDarkMode ? "dark" : "light"}
          />
          <S.CreateButton
            onPress={handleSaveGoal}
            disabled={!isFormValid || isLoading}
          >
            <S.CreateButtonText>
              {isLoading ? "Saving..." : "Save"}
            </S.CreateButtonText>
            {isLoading && (
              <ActivityIndicator size="small" color={theme.colors.text} />
            )}
          </S.CreateButton>
        </S.Form>
      </S.Container>
    </S.BottomSheetModal>
  );
};

export default AddGoalModal;
