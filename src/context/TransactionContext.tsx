import React, { createContext, useContext, useState, ReactNode } from "react";

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(5000);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setBalance((prev) => {
      const amount =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;
      return prev + amount;
    });
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => {
      const transaction = prev.find((t) => t.id === id);
      if (transaction) {
        setBalance((current) => {
          const amount =
            transaction.type === "income"
              ? -transaction.amount
              : transaction.amount;
          return current + amount;
        });
      }
      return prev.filter((t) => t.id !== id);
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
