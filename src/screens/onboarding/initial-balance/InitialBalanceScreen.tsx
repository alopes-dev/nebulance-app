import { Fragment, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/auth/form-input/FormInput";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./InitialBalanceScreen.styles";
import { NebulaToast } from "@/components/toast/Toast";
import Toast from "react-native-toast-message";
import { OnboardingStackParamList } from "@/types/navigation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CurrencyInput from "react-native-currency-input";
import { useAuth } from "@/context/AuthContext";

type InitialBalanceScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "InitialBalance"
>;

const initialBalanceSchema = z.object({
  amount: z.number().min(1, "Minimum monthly budget is 1").nullable(),
  currency: z.string().min(1, "Currency is required").nullable(),
});

type InitialBalanceFormData = z.infer<typeof initialBalanceSchema>;

const InitialBalanceScreen = () => {
  const navigation = useNavigation<InitialBalanceScreenNavigationProp>();
  const { theme } = useTheme();
  const { user, accountInfo, handleUpdateAccount, isUpdatingAccount } =
    useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialBalanceFormData>({
    resolver: zodResolver(initialBalanceSchema),
    defaultValues: {
      amount: 0,
      currency: "USD",
    },
  });

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSubmit = async (data: InitialBalanceFormData) => {
    try {
      handleUpdateAccount(
        {
          ...accountInfo,
          monthlyExpenses: data.amount ?? 0,
          currency: data.currency ?? "USD",
        },
        () => {
          Toast.show({
            type: "success",
            text1: "Account updated",
            text2: "You can now start tracking your expenses",
            position: "bottom",
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save initial balance",
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <S.RootContainer>
        <S.Header>
          <S.HeaderTitle>Initial Balance</S.HeaderTitle>
        </S.Header>

        <S.ProgressContainer>
          <S.ProgressStep active completed>
            <S.ProgressStepCircle active completed>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </S.ProgressStepCircle>
            <S.ProgressStepLabel active>Account</S.ProgressStepLabel>
          </S.ProgressStep>

          <S.ProgressLine active />

          <S.ProgressStep active>
            <S.ProgressStepCircle active>
              <S.ProgressStepNumber>2</S.ProgressStepNumber>
            </S.ProgressStepCircle>
            <S.ProgressStepLabel>Balance</S.ProgressStepLabel>
          </S.ProgressStep>
        </S.ProgressContainer>
      </S.RootContainer>

      <S.BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["76%"]}
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
          display: "none",
        }}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        enableOverDrag={false}
        keyboardBehavior="extend"
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        enableHandlePanningGesture
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <S.RootContainer>
              <S.Container>
                <S.FormContainer>
                  <S.FormContent>
                    <S.StepTitle>Set Your Monthly Budget</S.StepTitle>
                    <S.StepDescription>
                      Let's start by setting up your monthly budget.
                    </S.StepDescription>

                    <S.InputContainer error={!!errors.amount}>
                      <Controller
                        control={control}
                        name="amount"
                        render={({ field: { onChange, value } }) => (
                          <CurrencyInput
                            value={Number(value)}
                            onChangeValue={onChange}
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
                              fontSize: 20,
                              color: theme.colors.text,
                              flex: 1,
                              fontWeight: "bold",
                              textAlign: "left",
                              padding: 12,
                              height: 40,
                            }}
                          />
                        )}
                      />
                    </S.InputContainer>
                    <S.ErrorText>{errors.amount?.message}</S.ErrorText>

                    <Controller
                      control={control}
                      name="currency"
                      render={({ field: { onChange, value } }) => (
                        <FormInput
                          label="Currency"
                          value={value || ""}
                          onChangeText={onChange}
                          placeholder="USD"
                          icon="cash-outline"
                          error={errors.currency?.message}
                        />
                      )}
                    />
                  </S.FormContent>
                  <S.ContinueButton
                    onPress={handleSubmit(onSubmit)}
                    disabled={isUpdatingAccount}
                  >
                    <S.ContinueButtonText>
                      {isUpdatingAccount ? "Saving..." : "Finish"}
                    </S.ContinueButtonText>
                    {isUpdatingAccount && (
                      <ActivityIndicator
                        size="small"
                        color={theme.colors.text}
                      />
                    )}
                  </S.ContinueButton>
                </S.FormContainer>
              </S.Container>
            </S.RootContainer>
            <NebulaToast />
          </ScrollView>
        </KeyboardAvoidingView>
      </S.BottomSheetModal>
    </Fragment>
  );
};

export default InitialBalanceScreen;
