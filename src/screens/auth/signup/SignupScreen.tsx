import { useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/auth/form-input/FormInput";
import SocialButton from "../../../components/auth/social-button/SocialButton";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./SignupScreen.styles";
import { useAuth } from "@/context/AuthContext";
import { NebulaToast } from "@/components/toast/Toast";
import Toast from "react-native-toast-message";
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PasswordRecovery: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();
  const { handleRegister, isRegistering } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: SignupFormData) => {
    handleRegister(
      {
        name: data.fullName,
        email: data.email,
        password: data.password,
      },
      () => {
        Toast.show({
          text1: "Account created successfully",
          text2: "Please sign in to continue",
          type: "success",
          position: "bottom",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.RootContainer>
          <S.Container>
            <S.Header>
              <S.BackButton onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text}
                />
              </S.BackButton>
              <S.HeaderTitle>Create Account</S.HeaderTitle>
              <S.EmptyView />
            </S.Header>

            <S.WelcomeContainer>
              <S.WelcomeTitle>Join Nebulance</S.WelcomeTitle>
              <S.WelcomeText>
                Create an account to start managing your finances
              </S.WelcomeText>
            </S.WelcomeContainer>

            <S.FormContainer>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Full Name"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter your full name"
                    icon="person-outline"
                    error={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="mail-outline"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Create a password"
                    secureTextEntry={!showPassword}
                    icon="lock-closed-outline"
                    error={errors.password?.message}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={theme.colors.textSecondary}
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Confirm your password"
                    secureTextEntry={!showConfirmPassword}
                    icon="lock-closed-outline"
                    error={errors.confirmPassword?.message}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Ionicons
                          name={
                            showConfirmPassword
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={20}
                          color={theme.colors.textSecondary}
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="agreeToTerms"
                render={({ field: { onChange, value } }) => (
                  <S.TermsContainer onPress={() => onChange(!value)}>
                    <S.CheckboxContainer>
                      {value ? (
                        <Ionicons
                          name="checkbox"
                          size={20}
                          color={theme.colors.primary}
                        />
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={20}
                          color={theme.colors.textSecondary}
                        />
                      )}
                    </S.CheckboxContainer>
                    <S.TermsText>
                      I agree to the{" "}
                      <S.TermsHighlight>Terms of Service</S.TermsHighlight> and{" "}
                      <S.TermsHighlight>Privacy Policy</S.TermsHighlight>
                    </S.TermsText>
                  </S.TermsContainer>
                )}
              />

              {errors.agreeToTerms && (
                <S.ErrorText>{errors.agreeToTerms.message}</S.ErrorText>
              )}

              <S.SignupButton onPress={handleSubmit(onSubmit)}>
                <S.SignupButtonText>Create Account</S.SignupButtonText>
                {isRegistering && (
                  <ActivityIndicator size="small" color={theme.colors.text} />
                )}
              </S.SignupButton>
            </S.FormContainer>

            <S.LoginContainer>
              <S.LoginText>Already have an account?</S.LoginText>
              <S.LoginButton onPress={() => navigation.navigate("Login")}>
                <S.LoginButtonText>Sign In</S.LoginButtonText>
              </S.LoginButton>
            </S.LoginContainer>
          </S.Container>
        </S.RootContainer>
        <NebulaToast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
