import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SignupScreen from "../screens/auth/signup/SignupScreen";
import PasswordRecoveryScreen from "../screens/auth/password-recovery/PasswordRecoveryScreen";
import TransactionDetailsScreen from "@/screens/transaction-details/TransactionDetailsScreen";
import TransactionUploadScreen from "@/screens/transactions-upload/TransactionUploadScreen";
import { MainTabs } from "./MainTabs";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen
        name="TransactionUpload"
        component={TransactionUploadScreen}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
      />
    </Stack.Navigator>
  );
}
