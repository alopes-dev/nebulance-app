import { Transaction } from "@/types";
import apiServer from "./api";

export const getTransactions = async () => {
  const response = await apiServer.get("/transactions");

  return response.data;
};

export const createTransaction = async (
  transaction: Omit<Transaction, "id">
) => {
  const response = await apiServer.post("/transactions", transaction);

  return response.data;
};
