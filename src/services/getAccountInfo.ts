import apiServer from "./api";
import { IAccount, IUser } from "@/types";

export const getAccountInfo = async (): Promise<IUser> => {
  const response = await apiServer.get("/accounts/me");

  return response.data as IUser;
};

export const updateAccountInfo = async (
  payload: IAccount & {
    userId: string;
  }
): Promise<IAccount> => {
  try {
    const response = await apiServer.patch(`/accounts/${payload.id}`, {
      name: payload.name,
      type: payload.type,
      currencyStyle: payload.currencyStyle,
      monthlyExpenses: payload.monthlyExpenses ?? 0,
      balance: payload.balance ?? 0,
      userId: payload.userId,
    });

    return response as IAccount;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (
  payload: Pick<IAccount, "name" | "type" | "currencyStyle"> & {
    userId: string;
  }
): Promise<IAccount> => {
  const response = await apiServer.post("/accounts", {
    name: payload.name,
    type: payload.type,
    currencyStyle: payload.currencyStyle,
    monthlyExpenses: 0,
    balance: 0,
    userId: payload.userId,
  });

  return response.data as IAccount;
};
