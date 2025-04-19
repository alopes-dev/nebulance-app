import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import GoalCard from "@/components/goal-card/GoalCard";
import type { Goal } from "@/types";

import * as S from "./GoalsScreen.styles";
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "New Laptop",
    targetAmount: 1500,
    currentAmount: 750,
    deadline: new Date("2023-08-15"),
    icon: "laptop",
    color: "#6E5DE7",
  },
  {
    id: "2",
    title: "Vacation Fund",
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: new Date("2023-12-01"),
    icon: "airplane",
    color: "#F5CF6E",
  },
  {
    id: "3",
    title: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 4200,
    deadline: new Date("2023-10-30"),
    icon: "medkit",
    color: "#FF6B6B",
  },
  {
    id: "4",
    title: "New Phone",
    targetAmount: 1000,
    currentAmount: 350,
    deadline: new Date("2023-09-15"),
    icon: "phone-portrait",
    color: "#4CAF50",
  },
];

const GoalsScreen = () => {
  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Financial Goals</S.HeaderTitle>
          <S.SearchButton>
            <Ionicons name="search-outline" size={24} color="#333" />
          </S.SearchButton>
        </S.Header>

        <S.SummaryCard>
          <S.SummaryTitle>Goals Progress</S.SummaryTitle>
          <S.SummaryContent>
            <S.SummaryItem>
              <S.SummaryValue>{mockGoals.length}</S.SummaryValue>
              <S.SummaryLabel>Active Goals</S.SummaryLabel>
            </S.SummaryItem>
            <S.SummaryDivider />
            <S.SummaryItem>
              <S.SummaryValue>
                $
                {mockGoals
                  .reduce((sum, goal) => sum + goal.currentAmount, 0)
                  .toLocaleString()}
              </S.SummaryValue>
              <S.SummaryLabel>Saved</S.SummaryLabel>
            </S.SummaryItem>
            <S.SummaryDivider />
            <S.SummaryItem>
              <S.SummaryValue>
                $
                {mockGoals
                  .reduce((sum, goal) => sum + goal.targetAmount, 0)
                  .toLocaleString()}
              </S.SummaryValue>
              <S.SummaryLabel>Target</S.SummaryLabel>
            </S.SummaryItem>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SectionHeader>
          <S.SectionTitle>Your Goals</S.SectionTitle>
        </S.SectionHeader>

        <ScrollView showsVerticalScrollIndicator={false}>
          {mockGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </ScrollView>

        <S.AddButton>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </S.AddButton>
      </S.Container>
    </S.RootContainer>
  );
};

export default GoalsScreen;
