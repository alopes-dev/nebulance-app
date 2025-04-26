import { GoalsProvider } from "@/context/GoalsContext";
import GoalDetailScreen from "./GoalDetailScreen";

export const GoalDetailContextWrapper = () => {
  return (
    <GoalsProvider>
      <GoalDetailScreen />
    </GoalsProvider>
  );
};
