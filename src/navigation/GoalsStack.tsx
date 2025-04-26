import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@/context/ThemeContext";

import { GoalsContextWrapper } from "@/screens/goals";
import { GoalDetailContextWrapper } from "@/screens/goal-detail";
export type GoalsStackParamList = {
  GoalsList: undefined;
  GoalDetails: { goalId: string };
};

const Stack = createStackNavigator<GoalsStackParamList>();

export const GoalsStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GoalsList" component={GoalsContextWrapper} />
      <Stack.Screen name="GoalDetails" component={GoalDetailContextWrapper} />
    </Stack.Navigator>
  );
};
