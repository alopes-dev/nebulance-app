import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import GoalCard from "@/components/goal-card/GoalCard";
import type { IGoal } from "@/types";
import * as Haptics from "expo-haptics";
import * as S from "./GoalsScreen.styles";
import { useMemo, useRef, useState, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddFundsModal from "@/components/add-funds-modal/AddFundsModal";
import AddGoalModal from "@/components/add-goal-modal/AddGoalModal";
import { useTheme } from "@/context/ThemeContext";
import { useGoals } from "@/context/GoalsContext";
import { IGoalsListNavigationProp } from "@/navigation/Navigation.types";
import { useAuth } from "@/context/AuthContext";
import { formatBalance } from "@/helpers";

const mockGoalsT: IGoal[] = [
  {
    id: "1",
    name: "New Laptop",
    targetAmount: 1500,
    currentAmount: 750,
    deadline: new Date("2023-08-15"),
    icon: "laptop",
    color: "#6E5DE7",
  },
  {
    id: "2",
    name: "Vacation Fund",
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: new Date("2023-12-01"),
    icon: "airplane",
    color: "#F5CF6E",
  },
  {
    id: "3",
    name: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 4200,
    deadline: new Date("2023-10-30"),
    icon: "medkit",
    color: "#FF6B6B",
  },
  {
    id: "4",
    name: "New Phone",
    targetAmount: 1000,
    currentAmount: 350,
    deadline: new Date("2023-09-15"),
    icon: "phone-portrait",
    color: "#4CAF50",
  },
];

const GoalsScreen = () => {
  const {
    goals,
    isLoadingGoals,
    addAmount,
    withdrawAmount,
    isAddingAmount,
    isWithdrawingAmount,
    refreshGoals,
    createGoal,
    isCreatingGoal,
  } = useGoals();
  const { accountInfo } = useAuth();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const addGoalModalRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<IGoalsListNavigationProp>();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      refreshGoals();
    } finally {
      setRefreshing(false);
    }
  }, [refreshGoals]);

  const [actionType, setActionType] = useState<"add" | "withdraw" | "details">(
    "add"
  );
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const { isDarkMode, theme } = useTheme();

  const handleAddOrWithdrawFunds = (amount: number, onSuccess: () => void) => {
    if (selectedGoal) {
      if (actionType === "withdraw") {
        withdrawAmount(selectedGoal.id, amount, () => {
          refreshGoals();
          onSuccess();
        });
      } else {
        addAmount(selectedGoal.id, amount, () => {
          refreshGoals();
          onSuccess();
        });
      }
    }
  };

  const handleAddOrWithdraw = (
    goal: IGoal,
    action: "add" | "withdraw" | "details"
  ) => {
    if (action === "details") {
      navigation.navigate("GoalDetails", { goalId: goal.id });
      return;
    }

    setActionType(action);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedGoal(goal);
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleAddNewGoal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (addGoalModalRef.current) {
      addGoalModalRef.current.present();
    }
  };

  const handleCreateGoal = (
    goal: Omit<IGoal, "id" | "currentAmount">,
    onSuccess: () => void
  ) => {
    createGoal(goal, onSuccess);
  };

  const summarySavedValue = useMemo(
    () =>
      formatBalance(
        goals?.reduce((sum, goal) => sum + goal.currentAmount, 0) || 0
      ),
    [goals]
  );

  const summaryTargetValue = useMemo(
    () =>
      formatBalance(
        goals?.reduce((sum, goal) => sum + goal.targetAmount, 0) || 0
      ),
    [goals]
  );

  const renderSkeleton = () => (
    <S.SkeletonContainer>
      <S.SkeletonHeader />
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
          <S.HeaderTitle>Financial Goals</S.HeaderTitle>
          <S.SearchButton>
            <Ionicons
              name="search-outline"
              size={24}
              color={isDarkMode ? theme.colors.text : theme.colors.border}
            />
          </S.SearchButton>
        </S.Header>

        {isLoadingGoals ? (
          renderSkeleton()
        ) : (
          <>
            <S.SummaryCard>
              <S.SummaryTitle>Goals Progress</S.SummaryTitle>
              <S.SummaryContent>
                <S.SummaryItem>
                  <S.SummaryValue>{goals?.length}</S.SummaryValue>
                  <S.SummaryLabel>Active Goals</S.SummaryLabel>
                </S.SummaryItem>
                <S.SummaryDivider />
                <S.SummaryItem>
                  <S.SummaryValue>${summarySavedValue}</S.SummaryValue>
                  <S.SummaryLabel>Saved</S.SummaryLabel>
                </S.SummaryItem>
                <S.SummaryDivider />
                <S.SummaryItem>
                  <S.SummaryValue>${summaryTargetValue}</S.SummaryValue>
                  <S.SummaryLabel>Target</S.SummaryLabel>
                </S.SummaryItem>
              </S.SummaryContent>
            </S.SummaryCard>

            <S.SectionHeader>
              <S.SectionTitle>Your Goals</S.SectionTitle>
            </S.SectionHeader>

            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={theme.colors.text}
                />
              }
            >
              {goals?.length === 0 && (
                <S.EmptyGoalsContainer>
                  <Ionicons
                    name="flag-outline"
                    size={24}
                    color={theme.colors.text}
                  />
                  <S.EmptyGoalsText>No goals found</S.EmptyGoalsText>
                </S.EmptyGoalsContainer>
              )}

              {goals?.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onAddOrWithdraw={(action) =>
                    handleAddOrWithdraw(goal, action)
                  }
                />
              ))}
            </ScrollView>
          </>
        )}

        <S.AddButton onPress={handleAddNewGoal}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </S.AddButton>

        <AddFundsModal
          goalTitle={selectedGoal?.name ?? ""}
          onAddOrWithdrawFunds={handleAddOrWithdrawFunds}
          bottomSheetModalRef={bottomSheetModalRef}
          actionType={actionType}
          isLoading={isAddingAmount || isWithdrawingAmount}
          targetAmount={selectedGoal?.targetAmount ?? 0}
          currentAmount={accountInfo?.balance ?? 0}
        />

        <AddGoalModal
          bottomSheetModalRef={addGoalModalRef}
          onSaveGoal={handleCreateGoal}
          isLoading={isCreatingGoal}
        />
      </S.Container>
    </S.RootContainer>
  );
};

export default GoalsScreen;
