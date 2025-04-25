import { useMutation, useQuery } from "@tanstack/react-query";
import { storage } from "@/utils/storage";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  addAmountToGoal,
  withdrawAmountFromGoal,
} from "@/services/goals";
import { IGoal } from "@/types";

export const useGoalsQueries = () => {
  // Query for fetching all goals
  const {
    data: goals,
    isPending: isLoadingGoals,
    refetch,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const token = await storage.getAuthToken();
      if (!token) return null;
      const response = await getGoals();
      return response as IGoal[];
    },
    retry: false,
  });

  // Mutation for creating a new goal
  const { mutate: mutateCreateGoal, isPending: isCreatingGoal } = useMutation({
    mutationFn: async (goal: Omit<IGoal, "id" | "currentAmount">) => {
      const token = await storage.getAuthToken();
      if (!token) return null;
      const response = await createGoal(goal as IGoal);
      return response as IGoal;
    },
  });

  // Mutation for updating a goal
  const { mutate: mutateUpdateGoal, isPending: isUpdatingGoal } = useMutation({
    mutationFn: async ({
      id,
      goal,
    }: {
      id: string;
      goal: Omit<IGoal, "id" | "currentAmount">;
    }) => {
      const token = await storage.getAuthToken();
      if (!token) return null;
      const response = await updateGoal(id, goal as IGoal);
      return response as IGoal;
    },
  });

  // Mutation for deleting a goal
  const { mutate: mutateDeleteGoal, isPending: isDeletingGoal } = useMutation({
    mutationFn: async (id: string) => {
      const token = await storage.getAuthToken();
      if (!token) return null;
      const response = await deleteGoal(id);
      return response;
    },
  });

  // Mutation for adding amount to a goal
  const { mutate: mutateAddAmount, isPending: isAddingAmount } = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      const token = await storage.getAuthToken();
      if (!token) return null;
      const response = await addAmountToGoal(id, amount);
      return response as IGoal;
    },
  });

  // Mutation for withdrawing amount from a goal
  const { mutate: mutateWithdrawAmount, isPending: isWithdrawingAmount } =
    useMutation({
      mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
        const token = await storage.getAuthToken();
        if (!token) return null;
        const response = await withdrawAmountFromGoal(id, amount);
        return response as IGoal;
      },
    });

  return {
    // Queries
    goals: goals ?? [],
    isLoadingGoals,
    refetch,

    // Create
    mutateCreateGoal,
    isCreatingGoal,

    // Update
    mutateUpdateGoal,
    isUpdatingGoal,

    // Delete
    mutateDeleteGoal,
    isDeletingGoal,

    // Add amount
    mutateAddAmount,
    isAddingAmount,

    // Withdraw amount
    mutateWithdrawAmount,
    isWithdrawingAmount,
  };
};
