import type React from "react";
import { Ionicons } from "@expo/vector-icons";
import type { Transaction } from "@/types";

import * as S from "./TransactionItem.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TransactionsStackParamList } from "@/navigation/TransactionsStack";
import { ITransactionDetailsNavigationProp } from "@/navigation/Navigation.types";
interface TransactionItemProps {
  transaction: Transaction;
  expanded?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  expanded = false,
}) => {
  const navigation = useNavigation<ITransactionDetailsNavigationProp>();
  const { title, amount, date, category, icon } = transaction;
  const isExpense = amount < 0;

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
      <S.IconContainer isExpense={isExpense}>
        <Ionicons name={icon as any} size={20} color="#FFFFFF" />
      </S.IconContainer>

      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          <S.Amount isExpense={isExpense}>
            {isExpense ? "-" : "+"}${Math.abs(amount).toLocaleString()}
          </S.Amount>
        </S.TitleContainer>

        {expanded && (
          <S.DetailsContainer>
            <S.Detail>{category}</S.Detail>
            <S.Detail>{formattedDate}</S.Detail>
          </S.DetailsContainer>
        )}
      </S.ContentContainer>
    </S.ItemContainer>
  );
};

export default TransactionItem;
