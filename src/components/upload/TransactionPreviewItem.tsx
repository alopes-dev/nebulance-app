import type React from "react";
import { Ionicons } from "@expo/vector-icons";
import type { Transaction } from "../../types";

import * as S from "./Upload.styles";

interface TransactionPreviewItemProps {
  transaction: Transaction;
}

const TransactionPreviewItem: React.FC<TransactionPreviewItemProps> = ({
  transaction,
}) => {
  const { title, amount, date, category } = transaction;
  const isExpense = amount < 0;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Determine icon based on category
  let icon = "help-circle";
  if (category === "Food") icon = "restaurant";
  else if (category === "Income") icon = "cash";
  else if (category === "Entertainment") icon = "film";
  else if (category === "Transportation") icon = "car";
  else if (category === "Shopping") icon = "cart";
  else if (category === "Utilities") icon = "flash";
  else if (category === "Health") icon = "fitness";

  return (
    <S.ItemContainer>
      <S.IconContainerPreview isExpense={isExpense}>
        <Ionicons name={icon as any} size={20} color="#FFFFFF" />
      </S.IconContainerPreview>

      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          <S.Amount isExpense={isExpense}>
            {isExpense ? "-" : "+"}${Math.abs(amount).toLocaleString()}
          </S.Amount>
        </S.TitleContainer>

        <S.DetailsContainer>
          <S.Detail>{category}</S.Detail>
          <S.Detail>{formattedDate}</S.Detail>
        </S.DetailsContainer>
      </S.ContentContainer>
    </S.ItemContainer>
  );
};

export default TransactionPreviewItem;
