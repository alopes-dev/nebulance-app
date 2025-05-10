import { NavigatorScreenParams } from "@react-navigation/native";

export type OnboardingStackParamList = {
  PersonalInfo: undefined;
  InitialBalance: undefined;
  CategoriesSetup: undefined;
  Notifications: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PasswordRecovery: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type MainStackParamList = {
  MainTabs: undefined;
  TransactionUpload: undefined;
  TransactionDetails: undefined;
};
