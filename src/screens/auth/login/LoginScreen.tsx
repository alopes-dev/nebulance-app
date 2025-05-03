import { useMemo, useState } from "react";
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
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/auth/form-input/FormInput";

import { useTheme } from "@/context/ThemeContext";

import * as S from "./LoginScreen.styles";
import { useAuth } from "@/context/AuthContext";
import { NebulaToast } from "@/components/toast/Toast";

// Define the login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    // .min(8, "Password must be at least 8 characters")
    .max(50, "Password is too long"),
  rememberMe: z.boolean(),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PasswordRecovery: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const { login, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (payload: any) => {
    login(payload.email, payload.password);
  };

  const isDisabled = useMemo(() => !isValid || isLoading, [isValid, isLoading]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.RootContainer>
          <S.Container>
            <S.LogoContainer>
              <S.LogoBackground>
                <Ionicons name="wallet" size={40} color="#FFFFFF" />
              </S.LogoBackground>
              <S.AppName>Nebulance</S.AppName>
            </S.LogoContainer>

            <S.WelcomeContainer>
              <S.WelcomeTitle>Welcome Back!</S.WelcomeTitle>
              <S.WelcomeText>
                Sign in to continue managing your finances
              </S.WelcomeText>
            </S.WelcomeContainer>

            <S.FormContainer>
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
                    placeholder="Enter your password"
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

              <S.OptionsRow>
                <Controller
                  control={control}
                  name="rememberMe"
                  render={({ field: { onChange, value } }) => (
                    <S.RememberMeContainer onPress={() => onChange(!value)}>
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
                      <S.RememberMeText>Remember me</S.RememberMeText>
                    </S.RememberMeContainer>
                  )}
                />

                <S.ForgotPasswordButton
                  onPress={() => navigation.navigate("PasswordRecovery")}
                >
                  <S.ForgotPasswordText>Forgot Password?</S.ForgotPasswordText>
                </S.ForgotPasswordButton>
              </S.OptionsRow>

              <S.LoginButton
                onPress={handleSubmit(onSubmit)}
                disabled={isDisabled}
              >
                <S.LoginButtonText>Sign In</S.LoginButtonText>
                {isLoading && <ActivityIndicator size="small" color="white" />}
              </S.LoginButton>
            </S.FormContainer>

            <S.SignupContainer>
              <S.SignupText>Don't have an account?</S.SignupText>
              <S.SignupButton onPress={() => navigation.navigate("Signup")}>
                <S.SignupButtonText>Sign Up</S.SignupButtonText>
              </S.SignupButton>
            </S.SignupContainer>
          </S.Container>
        </S.RootContainer>
        <NebulaToast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
