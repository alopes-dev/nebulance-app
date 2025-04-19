import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SignupScreen from "../screens/auth/signup/SignupScreen";
import PasswordRecoveryScreen from "../screens/auth/password-recovery/PasswordRecoveryScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecoveryScreen}
      />
    </Stack.Navigator>
  );
}
