import React from "react";
import { Transaction } from "@/types";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ITransactionListNavigationProp } from "@/navigation/Navigation.types";
import * as S from "./TransactionDetailsScreen.styles";
import { useTheme } from "@/context/ThemeContext";
type TransactionDetailsParams = {
  TransactionDetails: {
    transaction: Transaction;
  };
};

const TransactionDetailsScreen = () => {
  const navigation = useNavigation<ITransactionListNavigationProp>();
  const { isDarkMode, theme } = useTheme();
  const route =
    useRoute<RouteProp<TransactionDetailsParams, "TransactionDetails">>();
  const { transaction } = route.params;

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? theme.colors.text : theme.colors.border}
            />
          </S.BackButton>
          <S.HeaderTitle>Transaction Details</S.HeaderTitle>
          <S.CloseButton onPress={() => navigation.goBack()}>
            <Ionicons
              name="close"
              size={24}
              color={isDarkMode ? theme.colors.text : theme.colors.border}
            />
          </S.CloseButton>
        </S.Header>
        <S.IconContainer isExpense={transaction.isExpense}>
          <Ionicons name={transaction.icon as any} size={30} color="#FFFFFF" />
        </S.IconContainer>

        <S.Title>{transaction.title}</S.Title>

        <S.DetailRow>
          <S.Label>Amount</S.Label>
          <S.Value>
            {transaction.isExpense ? "-" : "+"}$
            {Math.abs(transaction.amount).toFixed(2)}
          </S.Value>
        </S.DetailRow>

        <S.DetailRow>
          <S.Label>Category</S.Label>
          <S.Value>{transaction.category}</S.Value>
        </S.DetailRow>

        <S.DetailRow>
          <S.Label>Date</S.Label>
          <S.Value>{new Date(transaction.date).toLocaleDateString()}</S.Value>
        </S.DetailRow>
      </S.Container>
    </S.RootContainer>
  );
};

export default TransactionDetailsScreen;
