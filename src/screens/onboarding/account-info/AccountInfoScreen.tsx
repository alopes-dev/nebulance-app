import { Fragment, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/auth/form-input/FormInput";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./AccountInfoScreen.styles";
import { NebulaToast } from "@/components/toast/Toast";
import Toast from "react-native-toast-message";
import { OnboardingStackParamList } from "@/types/navigation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAuth } from "@/context/AuthContext";

type PersonalInfoScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "PersonalInfo"
>;

const accountInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  currencyStyle: z.string().min(1, "Currency is required"),
});

type AccountInfoFormData = z.infer<typeof accountInfoSchema>;

const AccountInfoScreen = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { handleCreateAccount, isCreatingAccount } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInfoFormData>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      name: "",
      type: "",
      currencyStyle: "EUR",
    },
  });

  const onSubmit = async (data: AccountInfoFormData) => {
    try {
      handleCreateAccount(
        {
          name: data.name,
          type: data.type,
          currencyStyle: data.currencyStyle,
        },
        () => {
          navigation.navigate("InitialBalance");
        }
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save account information",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (user?.onboardingStatus === "MONTHLY_BUDGET") {
      bottomSheetModalRef.current?.close();
      navigation.navigate("InitialBalance");
    }
  }, [user]);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <Fragment>
      <S.RootContainer>
        <S.Header>
          <S.HeaderTitle>Account Information</S.HeaderTitle>
        </S.Header>

        <S.ProgressContainer>
          <S.ProgressStep active>
            <S.ProgressStepCircle active>
              <S.ProgressStepNumber>1</S.ProgressStepNumber>
            </S.ProgressStepCircle>
            <S.ProgressStepLabel active>Account</S.ProgressStepLabel>
          </S.ProgressStep>

          <S.ProgressLine />

          <S.ProgressStep>
            <S.ProgressStepCircle>
              <S.ProgressStepNumber>2</S.ProgressStepNumber>
            </S.ProgressStepCircle>
            <S.ProgressStepLabel>Monthly Budget</S.ProgressStepLabel>
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
                    <S.StepTitle>Configure your account</S.StepTitle>
                    <S.StepDescription>
                      Please provide account detail. This helps us customize
                      your financial experience and ensure secure account
                      access.
                    </S.StepDescription>

                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <FormInput
                          label="Account Name"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Account Name"
                          icon="business-outline"
                          error={errors.name?.message}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="type"
                      render={({ field: { onChange, value } }) => (
                        <FormInput
                          label="Account Type"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Account Type"
                          icon="layers-outline"
                          error={errors.type?.message}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="currencyStyle"
                      render={({ field: { onChange, value } }) => (
                        <S.CurrencyStyleContainer>
                          <S.CurrencyStyleLabel>
                            Currency Style
                          </S.CurrencyStyleLabel>
                          <S.CurrencyStyleOptionsContainer>
                            <S.CurrencyStyleOption
                              selected={value === "EUR"}
                              onPress={() => onChange("EUR")}
                            >
                              <S.CurrencyStyleOptionText
                                selected={value === "EUR"}
                              >
                                EUR
                              </S.CurrencyStyleOptionText>
                              <S.CurrencyStyleExample
                                selected={value === "EUR"}
                              >
                                1.000,00 €
                              </S.CurrencyStyleExample>
                            </S.CurrencyStyleOption>

                            <S.CurrencyStyleOption
                              selected={value === "USD"}
                              onPress={() => onChange("USD")}
                            >
                              <S.CurrencyStyleOptionText
                                selected={value === "USD"}
                              >
                                USD
                              </S.CurrencyStyleOptionText>
                              <S.CurrencyStyleExample
                                selected={value === "USD"}
                              >
                                $1,000.00
                              </S.CurrencyStyleExample>
                            </S.CurrencyStyleOption>

                            <S.CurrencyStyleOption
                              selected={value === "FR"}
                              onPress={() => onChange("FR")}
                            >
                              <S.CurrencyStyleOptionText
                                selected={value === "FR"}
                              >
                                FRENCH
                              </S.CurrencyStyleOptionText>
                              <S.CurrencyStyleExample selected={value === "FR"}>
                                1 234,56 €
                              </S.CurrencyStyleExample>
                            </S.CurrencyStyleOption>

                            <S.CurrencyStyleOption
                              selected={value === "GBP"}
                              onPress={() => onChange("GBP")}
                            >
                              <S.CurrencyStyleOptionText
                                selected={value === "CHF"}
                              >
                                CHF
                              </S.CurrencyStyleOptionText>
                              <S.CurrencyStyleExample
                                selected={value === "CHF"}
                              >
                                1'234.56 CHF
                              </S.CurrencyStyleExample>
                            </S.CurrencyStyleOption>
                          </S.CurrencyStyleOptionsContainer>
                          {errors.currencyStyle?.message && (
                            <S.ErrorText>
                              {errors.currencyStyle.message}
                            </S.ErrorText>
                          )}
                        </S.CurrencyStyleContainer>
                      )}
                    />
                  </S.FormContent>
                  <S.ContinueButton
                    onPress={handleSubmit(onSubmit)}
                    disabled={isCreatingAccount}
                  >
                    <S.ContinueButtonText>
                      {isCreatingAccount ? "Saving..." : "Continue"}
                    </S.ContinueButtonText>
                    {isCreatingAccount && (
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

export default AccountInfoScreen;
