import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import FormInput from "@/components/auth/form-input/FormInput";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./PasswordRecoveryScreen.styles";
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PasswordRecovery: undefined;
};

type PasswordRecoveryScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "PasswordRecovery"
>;

const PasswordRecoveryScreen = () => {
  const navigation = useNavigation<PasswordRecoveryScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const handleSendCode = () => {
    // In a real app, you would send a verification code to the email
    console.log("Sending verification code to:", email);
    // For demo purposes, we'll just move to the next step
    setStep(2);
  };

  const handleVerifyCode = () => {
    // In a real app, you would verify the code with your backend
    console.log("Verifying code:", verificationCode);
    // For demo purposes, we'll just move to the next step
    setStep(3);
  };

  const handleResetPassword = () => {
    // In a real app, you would reset the password with your backend
    console.log("Resetting password to:", newPassword);

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    // For demo purposes, we'll just show a success message and navigate back to login
    Alert.alert("Success", "Your password has been reset successfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
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
              <S.BackButton
                onPress={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    navigation.goBack();
                  }
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text}
                />
              </S.BackButton>
              <S.HeaderTitle>Reset Password</S.HeaderTitle>
              <S.EmptyView />
            </S.Header>

            {step === 1 && (
              <>
                <S.IllustrationContainer>
                  <S.IllustrationBackground>
                    <Ionicons name="mail" size={40} color="#FFFFFF" />
                  </S.IllustrationBackground>
                </S.IllustrationContainer>

                <S.TitleContainer>
                  <S.Title>Forgot Password?</S.Title>
                  <S.Subtitle>
                    Enter your email address and we'll send you a verification
                    code to reset your password
                  </S.Subtitle>
                </S.TitleContainer>

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

                  <S.ActionButton onPress={handleSendCode}>
                    <S.ActionButtonText>Send Code</S.ActionButtonText>
                  </S.ActionButton>
                </S.FormContainer>
              </>
            )}

            {step === 2 && (
              <>
                <S.IllustrationContainer>
                  <S.IllustrationBackground>
                    <Ionicons
                      name="shield-checkmark"
                      size={40}
                      color="#FFFFFF"
                    />
                  </S.IllustrationBackground>
                </S.IllustrationContainer>

                <S.TitleContainer>
                  <S.Title>Verification</S.Title>
                  <S.Subtitle>
                    Enter the verification code we sent to {email}
                  </S.Subtitle>
                </S.TitleContainer>

                <S.FormContainer>
                  <FormInput
                    label="Verification Code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    placeholder="Enter verification code"
                    keyboardType="number-pad"
                    icon="key-outline"
                  />

                  <S.ResendContainer>
                    <S.ResendText>Didn't receive the code?</S.ResendText>
                    <S.ResendButton onPress={() => console.log("Resend code")}>
                      <S.ResendButtonText>Resend</S.ResendButtonText>
                    </S.ResendButton>
                  </S.ResendContainer>

                  <S.ActionButton onPress={handleVerifyCode}>
                    <S.ActionButtonText>Verify Code</S.ActionButtonText>
                  </S.ActionButton>
                </S.FormContainer>
              </>
            )}

            {step === 3 && (
              <>
                <S.IllustrationContainer>
                  <S.IllustrationBackground>
                    <Ionicons name="lock-closed" size={40} color="#FFFFFF" />
                  </S.IllustrationBackground>
                </S.IllustrationContainer>

                <S.TitleContainer>
                  <S.Title>Create New Password</S.Title>
                  <S.Subtitle>
                    Your new password must be different from previously used
                    passwords
                  </S.Subtitle>
                </S.TitleContainer>

                <S.FormContainer>
                  <FormInput
                    label="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    secureTextEntry={!showPassword}
                    icon="lock-closed-outline"
                    rightIcon={
                      <S.TouchableButton
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={theme.colors.textSecondary}
                        />
                      </S.TouchableButton>
                    }
                  />

                  <FormInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm new password"
                    secureTextEntry={!showPassword}
                    icon="lock-closed-outline"
                  />

                  <S.ActionButton onPress={handleResetPassword}>
                    <S.ActionButtonText>Reset Password</S.ActionButtonText>
                  </S.ActionButton>
                </S.FormContainer>
              </>
            )}
          </S.Container>
        </S.RootContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordRecoveryScreen;
