import { useMutation, useQuery } from "@tanstack/react-query";
import { storage } from "@/utils/storage";
import { createTransaction, getTransactions } from "@/services/transactions";
import { Transaction } from "@/types";

export const useTransactionsQueries = () => {
  const {
    data: transactions,
    isPending: isLoadingTransactions,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const token = await storage.getAuthToken();

      if (!token) return null;

      const response = await getTransactions();
      return response as Transaction[];
    },
    retry: false,
  });

  const { mutate: mutateCreateTransaction, isPending: isCreatingTransaction } =
    useMutation({
      mutationFn: async (transaction: Omit<Transaction, "id">) => {
        const token = await storage.getAuthToken();

        if (!token) return null;

        console.log(transaction);

        const response = await createTransaction(transaction);
        return response as Transaction;
      },
      onSuccess: () => {
        refetch();
      },
    });

  return {
    transactions,
    isLoadingTransactions,
    refetch,
    mutateCreateTransaction,
    isCreatingTransaction,
  };
};
