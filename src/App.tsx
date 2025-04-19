import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AuthNavigator from "@/navigation/AuthNavigator";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import MainNavigator from "./navigation/MainNavigator";

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

      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
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
