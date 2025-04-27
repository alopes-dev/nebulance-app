import type React from "react";
import { Ionicons } from "@expo/vector-icons";
import type { Transaction } from "@/types";

import * as S from "./TransactionItem.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TransactionsStackParamList } from "@/navigation/TransactionsStack";
import { ITransactionDetailsNavigationProp } from "@/navigation/Navigation.types";
import { CATEGORY_ITEMS, TRANSACTIONS_ICONS_MAPS } from "@/helpers";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
interface TransactionItemProps {
  transaction: Transaction;
  expanded?: boolean;
  goalViewer?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  expanded = false,
  goalViewer = false,
}) => {
  const { currency } = useAuth();
  const navigation = useNavigation<ITransactionDetailsNavigationProp>();
  const {
    description: title,
    amount,
    date,
    category,
    type,
    goalId,
  } = transaction;

  const isExpense = useMemo(() => {
    if (goalViewer) return type?.toLowerCase() !== "expense";

    return type?.toLowerCase() === "expense" && !goalId;
  }, [goalViewer, type, goalId]);

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <S.ItemContainer
      onPress={() =>
        navigation.navigate("TransactionDetails", {
          transaction: {
            ...transaction,
            isExpense,
          },
        })
      }
    >
      <S.IconContainer isExpense={isExpense} isGoal={!!goalId && !goalViewer}>
        <Ionicons
          name={
            (TRANSACTIONS_ICONS_MAPS.find((item) => item.category === category)
              ?.icon as any) || "cash"
          }
          size={20}
          color="#FFFFFF"
        />
      </S.IconContainer>

      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title numberOfLines={2} ellipsizeMode="tail">
            {title}
          </S.Title>
          <S.Amount isExpense={isExpense} isGoal={!!goalId && !goalViewer}>
            {isExpense && "-"}
            {Math.abs(amount).toLocaleString()} {currency}
          </S.Amount>
        </S.TitleContainer>

        {expanded && (
          <S.DetailsContainer>
            <S.Detail>
              {CATEGORY_ITEMS.find((item) => item.value === category)?.label ||
                "Other"}
            </S.Detail>
            <S.Detail>{formattedDate}</S.Detail>
          </S.DetailsContainer>
        )}
      </S.ContentContainer>
    </S.ItemContainer>
  );
};

export default TransactionItem;
