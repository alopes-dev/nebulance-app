import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView, Alert, ActivityIndicator, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IGoal } from "@/types";
import * as S from "./GoalDetailScreen.styles";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import GoalCard from "@/components/goal-card/GoalCard";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import TransactionItem from "@/components/transaction-item/TransactionItem";
import { EmptyState } from "../transactions/EmptyState";
import { useGoals } from "@/context/GoalsContext";
import AddFundsModal from "@/components/add-funds-modal/AddFundsModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import AddGoalModal from "@/components/add-goal-modal/AddGoalModal";
import { useAuth } from "@/context/AuthContext";
interface RouteParams {
  goalId: string;
}

const GoalDetailScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { accountInfo } = useAuth();
  const navigation = useNavigation();
  const editGoalModalRef = useRef<BottomSheetModal>(null);
  const { transactions, isLoadingTransactions, refetch } =
    useTransactionsQueries();
  const route = useRoute();
  const { goalId } = route.params as RouteParams;
  const [actionType, setActionType] = useState<"add" | "withdraw" | "details">(
    "add"
  );

  const {
    deleteGoal,
    isDeletingGoal,
    addAmount,
    withdrawAmount,
    isAddingAmount,
    isWithdrawingAmount,
    isLoadingGoal,
    goal,
    handleGetGoal,
    updateGoal,
    isUpdatingGoal,
  } = useGoals();

  useEffect(() => {
    handleGetGoal(goalId);
  }, [goalId]);

  useEffect(() => {
    refetch();
  }, [goal]);

  const goalTransactions = useMemo(() => {
    return transactions?.filter((transaction) => transaction.goalId === goalId);
  }, [transactions, goalId]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleAddOrWithdrawFunds = useCallback(
    (amount: number, onSuccess: () => void) => {
      if (goal) {
        if (actionType === "withdraw") {
          withdrawAmount(goal.id, amount, () => {
            onSuccess();
            handleGetGoal(goalId);
            refetch();
          });
        } else {
          addAmount(goal.id, amount, () => {
            onSuccess();
            handleGetGoal(goalId);
            refetch();
          });
        }
      }
    },
    [goal, goalId, actionType, withdrawAmount, addAmount, handleGetGoal]
  );

  const handleEditGoal = (
    goal: Omit<IGoal, "id" | "currentAmount">,
    onSuccess: () => void
  ) => {
    updateGoal(goalId, goal, () => {
      onSuccess();
      handleGetGoal(goalId);
    });
  };

  const handleAddOrWithdraw = (action: "add" | "withdraw" | "details") => {
    setActionType(action);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleDeleteGoal = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteGoal(goalId, () => {
            navigation.goBack();
          });
        },
      },
    ]);
  };

  const renderSkeleton = () => (
    <S.SkeletonContainer>
      <S.SkeletonSummaryCard />
      <S.SkeletonSectionHeader />
      {[1, 2, 3].map((i) => (
        <S.SkeletonGoalCard key={i} />
      ))}
    </S.SkeletonContainer>
  );

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.ActionButtonsContainer>
            <S.ActionButtons onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={20}
                color={isDarkMode ? theme.colors.text : theme.colors.border}
              />
            </S.ActionButtons>
          </S.ActionButtonsContainer>
          <S.HeaderTitle>{goal?.name}</S.HeaderTitle>
          <S.ActionButtonsContainer>
            <S.ActionButtons
              onPress={() => editGoalModalRef.current?.present()}
            >
              <EvilIcons
                name="pencil"
                size={20}
                color={isDarkMode ? theme.colors.text : theme.colors.border}
              />
            </S.ActionButtons>
          </S.ActionButtonsContainer>
        </S.Header>

        {isLoadingGoal ? (
          renderSkeleton()
        ) : (
          <>
            {goal && (
              <GoalCard
                goal={goal}
                preventPress
                onAddOrWithdraw={(action) => handleAddOrWithdraw(action)}
                onDelete={handleDeleteGoal}
                isDeletingGoal={isDeletingGoal}
              />
            )}

            <S.TransactionDescription>
              Historic of transactions
            </S.TransactionDescription>
            <ScrollView>
              <S.Content>
                <S.TransactionsList>
                  {isLoadingTransactions ? (
                    <ActivityIndicator size="large" color={theme.colors.text} />
                  ) : goalTransactions?.length === 0 ? (
                    <EmptyState filter={"all"} />
                  ) : (
                    goalTransactions?.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        expanded
                        goalViewer
                      />
                    ))
                  )}
                </S.TransactionsList>
              </S.Content>
            </ScrollView>
          </>
        )}
      </S.Container>

      <AddFundsModal
        goalTitle={goal?.name ?? ""}
        onAddOrWithdrawFunds={handleAddOrWithdrawFunds}
        bottomSheetModalRef={bottomSheetModalRef}
        actionType={actionType}
        isLoading={isAddingAmount || isWithdrawingAmount}
        targetAmount={goal?.targetAmount ?? 0}
        currentAmount={accountInfo?.balance ?? 0}
      />

      <AddGoalModal
        bottomSheetModalRef={editGoalModalRef}
        onSaveGoal={handleEditGoal}
        isLoading={isUpdatingGoal}
        goal={goal ?? undefined}
      />
    </S.RootContainer>
  );
};

export default GoalDetailScreen;
