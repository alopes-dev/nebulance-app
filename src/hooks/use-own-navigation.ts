import { RootStackParamList } from "@/navigation/Navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp<T extends keyof RootStackParamList = any> =
  NativeStackNavigationProp<RootStackParamList, T>; // Where T is the current route

export const useOwnNavigation = () => {
  const navigation = useNavigation<NavigationProp>();

  return navigation;
};
