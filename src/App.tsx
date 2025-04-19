import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AuthNavigator from "@/navigation/AuthNavigator";
import TransactionUploadScreen from "@/screens/transactions-upload/TransactionUploadScreen";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { MainTabs } from "./navigation/MainTabs";

const Stack = createStackNavigator();

function AppContent() {
  // In a real app, this would be determined by checking if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { isDarkMode, theme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />

      {isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="TransactionUpload"
            component={TransactionUploadScreen}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <AppContent />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
