import { GoalsProvider } from "@/context/GoalsContext";
import GoalsScreen from "./GoalsScreen";

export const GoalsContextWrapper = () => {
  return (
    <GoalsProvider>
      <GoalsScreen />
    </GoalsProvider>
  );
};
