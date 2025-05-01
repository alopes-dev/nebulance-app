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
  const { description, amount, date, type, category } = transaction;
  const isExpense = type === "EXPENSE";

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Determine icon based on category
  let icon = "help-circle";
  if (category === "FOOD") icon = "restaurant";
  else if (category === "OTHERS") icon = "cash";
  else if (category === "ENTERTAINMENT") icon = "film";
  else if (category === "TRANSPORT") icon = "car";
  else if (category === "SHOPPING") icon = "cart";
  else if (category === "UTILITIES") icon = "flash";
  else if (category === "HEALTHCARE") icon = "fitness";

  return (
    <S.ItemContainer>
      <S.IconContainerPreview isExpense={isExpense}>
        <Ionicons name={icon as any} size={20} color="#FFFFFF" />
      </S.IconContainerPreview>

      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{description}</S.Title>
          <S.Amount isExpense={isExpense}>
            {isExpense && "-"}
            {Math.abs(amount).toLocaleString()}
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
