import { ActivityIndicator, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

import AuthNavigator from "@/navigation/AuthNavigator";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import MainNavigator from "./navigation/MainNavigator";
import LottieView from "lottie-react-native";
import OnboardingNavigator from "./screens/onboarding/OnboardingNavigator";

function AppContent() {
  const { isAuthenticated, user, isCheckingAuth, onboardingStatus } = useAuth();
  const { isDarkMode, theme } = useTheme();

  if (isCheckingAuth) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("@/assets/react.json")}
          autoPlay
          loop
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <LottieView
          source={require("@/assets/loading.json")}
          autoPlay
          loop
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />

      {isAuthenticated ? (
        onboardingStatus === "COMPLETE" ? (
          <MainNavigator />
        ) : (
          <OnboardingNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <AppContent />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
