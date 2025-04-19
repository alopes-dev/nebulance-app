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
import FormInput from "../../../components/auth/form-input/FormInput";
import SocialButton from "../../../components/auth/social-button/SocialButton";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./SignupScreen.styles";
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PasswordRecovery: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { theme } = useTheme();
  const handleSignup = () => {
    // Implement actual signup logic here
    console.log("Signup with:", fullName, email, password);
    // For demo purposes, we'll just navigate to the login screen
    // In a real app, you would register with a backend
    navigation.navigate("Login");
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
              <S.WelcomeTitle>Join Budget Finance</S.WelcomeTitle>
              <S.WelcomeText>
                Create an account to start managing your finances
              </S.WelcomeText>
            </S.WelcomeContainer>

            <S.FormContainer>
              <FormInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                icon="person-outline"
              />

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
                placeholder="Create a password"
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

              <FormInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                icon="lock-closed-outline"
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                }
              />

              <S.TermsContainer onPress={() => setAgreeToTerms(!agreeToTerms)}>
                <S.CheckboxContainer>
                  {agreeToTerms ? (
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

              <S.SignupButton onPress={handleSignup}>
                <S.SignupButtonText>Create Account</S.SignupButtonText>
              </S.SignupButton>

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

            <S.LoginContainer>
              <S.LoginText>Already have an account?</S.LoginText>
              <S.LoginButton onPress={() => navigation.navigate("Login")}>
                <S.LoginButtonText>Sign In</S.LoginButtonText>
              </S.LoginButton>
            </S.LoginContainer>
          </S.Container>
        </S.RootContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
