import { useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import FormInput from "@/components/auth/form-input/FormInput";
import SocialButton from "@/components/auth/social-button/SocialButton";
import { useTheme } from "@/context/ThemeContext";

import * as S from "./LoginScreen.styles";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { theme } = useTheme();
  const handleLogin = () => {
    // Implement actual login logic here
    console.log("Login with:", email, password);
    // For demo purposes, we'll just navigate to the main app
    // In a real app, you would authenticate with a backend
  };

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
              <S.AppName>Budget Finance</S.AppName>
            </S.LogoContainer>

            <S.WelcomeContainer>
              <S.WelcomeTitle>Welcome Back!</S.WelcomeTitle>
              <S.WelcomeText>
                Sign in to continue managing your finances
              </S.WelcomeText>
            </S.WelcomeContainer>

            <S.FormContainer>
              <FormInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                icon="lock-closed-outline"
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                }
              />

              <S.OptionsRow>
                <S.RememberMeContainer
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <S.CheckboxContainer>
                    {rememberMe ? (
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

                <S.ForgotPasswordButton
                  onPress={() => navigation.navigate("PasswordRecovery")}
                >
                  <S.ForgotPasswordText>Forgot Password?</S.ForgotPasswordText>
                </S.ForgotPasswordButton>
              </S.OptionsRow>

              <S.LoginButton onPress={handleLogin}>
                <S.LoginButtonText>Sign In</S.LoginButtonText>
              </S.LoginButton>

              <S.OrContainer>
                <S.OrLine />
                <S.OrText>OR</S.OrText>
                <S.OrLine />
              </S.OrContainer>

              <S.SocialButtonsContainer>
                <SocialButton icon="logo-google" color="#DB4437" />
                <SocialButton icon="logo-apple" color="#000000" />
                <SocialButton icon="logo-facebook" color="#4267B2" />
              </S.SocialButtonsContainer>
            </S.FormContainer>

            <S.SignupContainer>
              <S.SignupText>Don't have an account?</S.SignupText>
              <S.SignupButton onPress={() => navigation.navigate("Signup")}>
                <S.SignupButtonText>Sign Up</S.SignupButtonText>
              </S.SignupButton>
            </S.SignupContainer>
          </S.Container>
        </S.RootContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
