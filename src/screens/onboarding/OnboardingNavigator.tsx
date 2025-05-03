import { createStackNavigator } from "@react-navigation/stack";
import InitialBalanceScreen from "./initial-balance/InitialBalanceScreen";
import CategoriesSetupScreen from "./categories-setup/CategoriesSetupScreen";
import AccountInfoScreen from "./account-info/AccountInfoScreen";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="InitialBalance" component={InitialBalanceScreen} />
      {/* <Stack.Screen name="CategoriesSetup" component={CategoriesSetupScreen} /> */}
      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Stack.Navigator>
  );
}
