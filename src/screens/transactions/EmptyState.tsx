import * as S from "./TransactionsScreen.styles";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export const EmptyState = ({ filter }: { filter: string }) => {
  const { theme } = useTheme();

  return (
    <S.EmptyStateContainer>
      <Ionicons
        name="document-text-outline"
        size={48}
        color={theme.colors.text}
      />
      <S.EmptyStateText>No transactions found</S.EmptyStateText>
      <S.EmptyStateSubText>
        {filter === "all"
          ? "Add your first transaction to get started"
          : `No ${filter} transactions found`}
      </S.EmptyStateSubText>
    </S.EmptyStateContainer>
  );
};
