import { IGoal } from "@/types";
import baseApi from "./api";

export const getGoals = async () => {
  const response = await baseApi.get("/goals");

  return response.data;
};

export const createGoal = async (payload: IGoal) => {
  const response = await baseApi.post("/goals", {
    name: payload.name,
    targetAmount: payload.targetAmount,
    deadline: payload.deadline,
  });
  return response.data;
};

export const updateGoal = async (id: string, payload: IGoal) => {
  const response = await baseApi.patch(`/goals/${id}`, {
    name: payload.name,
    targetAmount: payload.targetAmount,
    deadline: payload.deadline,
  });
  return response.data;
};

export const deleteGoal = async (id: string) => {
  const response = await baseApi.delete(`/goals/${id}`);
  return response.data;
};

export const addAmountToGoal = async (id: string, amount: number) => {
  const response = await baseApi.post(`/goals/${id}/add`, {
    amount,
  });
  return response.data;
};

export const withdrawAmountFromGoal = async (id: string, amount: number) => {
  const response = await baseApi.post(`/goals/${id}/withdraw`, {
    amount,
  });
  return response.data;
};
