import * as S from "./TransactionsScreen.styles";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { View } from "react-native";
export const EmptyState = ({ filter }: { filter: string }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <LottieView
        source={require("@/assets/no-result.json")}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          marginBottom: 16,
        }}
      />

      <S.EmptyStateText>No transactions found</S.EmptyStateText>
      <S.EmptyStateSubText>
        {filter === "all"
          ? "Add your first transaction to get started"
          : `No ${filter} transactions found`}
      </S.EmptyStateSubText>
    </View>
  );
};
