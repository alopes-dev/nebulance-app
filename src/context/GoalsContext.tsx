import type React from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useGoalsQueries } from "@/hooks/useGoalsQueries";
import { IGoal } from "@/types";

type GoalsContextType = {
  goals: IGoal[] | null | undefined;
  isLoadingGoals: boolean;
  createGoal: (
    goal: Omit<IGoal, "id" | "currentAmount">,
    onSuccess: () => void
  ) => void;
  updateGoal: (id: string, goal: Omit<IGoal, "id" | "currentAmount">) => void;
  deleteGoal: (id: string, onSuccess: () => void) => void;
  addAmount: (id: string, amount: number, onSuccess: () => void) => void;
  withdrawAmount: (id: string, amount: number, onSuccess: () => void) => void;
  refreshGoals: () => void;
  isCreatingGoal: boolean;
  isUpdatingGoal: boolean;
  isDeletingGoal: boolean;
  isAddingAmount: boolean;
  isWithdrawingAmount: boolean;
};

const INITIAL_VALUES: GoalsContextType = {
  goals: [],
  isLoadingGoals: false,
  createGoal: () => {},
  updateGoal: () => {},
  deleteGoal: () => {},
  addAmount: () => {},
  withdrawAmount: () => {},
  refreshGoals: () => {},
  isCreatingGoal: false,
  isUpdatingGoal: false,
  isDeletingGoal: false,
  isAddingAmount: false,
  isWithdrawingAmount: false,
};

const GoalsContext = createContext<GoalsContextType>(INITIAL_VALUES);

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    goals,
    isLoadingGoals,
    refetch,
    mutateCreateGoal,
    isCreatingGoal,
    mutateUpdateGoal,
    isUpdatingGoal,
    mutateDeleteGoal,
    isDeletingGoal,
    mutateAddAmount,
    isAddingAmount,
    mutateWithdrawAmount,
    isWithdrawingAmount,
  } = useGoalsQueries();

  const handleCreateGoal = useCallback(
    async (
      goal: Omit<IGoal, "id" | "currentAmount">,
      onSuccess: () => void
    ) => {
      mutateCreateGoal(goal, {
        onSuccess: () => {
          refetch();
          onSuccess();
        },
      });
    },
    [mutateCreateGoal, refetch]
  );

  const handleUpdateGoal = useCallback(
    async (id: string, goal: Omit<IGoal, "id" | "currentAmount">) => {
      mutateUpdateGoal(
        { id, goal },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    },
    [mutateUpdateGoal, refetch]
  );

  const handleDeleteGoal = useCallback(
    async (id: string, onSuccess: () => void) => {
      mutateDeleteGoal(id, {
        onSuccess: () => {
          refetch();
          onSuccess();
        },
      });
    },
    [mutateDeleteGoal, refetch]
  );

  const handleAddAmount = useCallback(
    async (id: string, amount: number, onSuccess: () => void) => {
      mutateAddAmount(
        { id, amount },
        {
          onSuccess: () => {
            refetch();
            onSuccess();
          },
        }
      );
    },
    [mutateAddAmount, refetch]
  );

  const handleWithdrawAmount = useCallback(
    async (id: string, amount: number, onSuccess: () => void) => {
      mutateWithdrawAmount(
        { id, amount },
        {
          onSuccess: () => {
            refetch();
            onSuccess();
          },
        }
      );
    },
    [mutateWithdrawAmount, refetch]
  );

  const values = useMemo(
    () => ({
      goals,
      isLoadingGoals,
      createGoal: handleCreateGoal,
      updateGoal: handleUpdateGoal,
      deleteGoal: handleDeleteGoal,
      addAmount: handleAddAmount,
      withdrawAmount: handleWithdrawAmount,
      refreshGoals: refetch,
      isCreatingGoal,
      isUpdatingGoal,
      isDeletingGoal,
      isAddingAmount,
      isWithdrawingAmount,
    }),
    [
      goals,
      isLoadingGoals,
      handleCreateGoal,
      handleUpdateGoal,
      handleDeleteGoal,
      handleAddAmount,
      handleWithdrawAmount,
      refetch,
      isCreatingGoal,
      isUpdatingGoal,
      isDeletingGoal,
      isAddingAmount,
      isWithdrawingAmount,
    ]
  );

  return (
    <GoalsContext.Provider value={values}>{children}</GoalsContext.Provider>
  );
};
