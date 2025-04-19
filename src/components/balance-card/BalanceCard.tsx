import type React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./BalanceCard.styles";
interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
}) => {
  return (
    <S.CardContainer>
      <S.BalanceSection>
        <S.BalanceLabel>Total Balance</S.BalanceLabel>
        <S.BalanceAmount>${balance.toLocaleString()}</S.BalanceAmount>
      </S.BalanceSection>

      <S.StatsContainer>
        <S.StatItem>
          <S.StatIconContainer color="#4CAF50">
            <Ionicons name="arrow-down" size={16} color="#FFFFFF" />
          </S.StatIconContainer>
          <S.StatContent>
            <S.StatLabel>Income</S.StatLabel>
            <S.StatValue>${income.toLocaleString()}</S.StatValue>
          </S.StatContent>
        </S.StatItem>

        <S.StatDivider />

        <S.StatItem>
          <S.StatIconContainer color="#FF6B6B">
            <Ionicons name="arrow-up" size={16} color="#FFFFFF" />
          </S.StatIconContainer>
          <S.StatContent>
            <S.StatLabel>Expenses</S.StatLabel>
            <S.StatValue>${expenses.toLocaleString()}</S.StatValue>
          </S.StatContent>
        </S.StatItem>
      </S.StatsContainer>
    </S.CardContainer>
  );
};

export default BalanceCard;
