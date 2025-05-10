import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/auth/form-input/FormInput";
import { useTheme } from "@/context/ThemeContext";
import * as S from "./CategoriesSetupScreen.styles";
import { NebulaToast } from "@/components/toast/Toast";
import Toast from "react-native-toast-message";
import { OnboardingStackParamList } from "@/types/navigation";

type CategoriesSetupScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "CategoriesSetup"
>;

const defaultCategories = [
  { id: "1", name: "Food & Dining", type: "expense", icon: "restaurant" },
  { id: "2", name: "Transportation", type: "expense", icon: "car" },
  { id: "3", name: "Housing", type: "expense", icon: "home" },
  { id: "4", name: "Utilities", type: "expense", icon: "flash" },
  { id: "5", name: "Shopping", type: "expense", icon: "cart" },
  { id: "6", name: "Entertainment", type: "expense", icon: "game-controller" },
  { id: "7", name: "Healthcare", type: "expense", icon: "medkit" },
  { id: "8", name: "Education", type: "expense", icon: "school" },
  { id: "9", name: "Salary", type: "income", icon: "cash" },
  { id: "10", name: "Investments", type: "income", icon: "trending-up" },
];

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["income", "expense"]),
  icon: z.string().min(1, "Icon is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoriesSetupScreen = () => {
  const navigation = useNavigation<CategoriesSetupScreenNavigationProp>();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "expense",
      icon: "cash",
    },
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      setShowAddCategory(false);
      reset();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save category",
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    navigation.navigate("Notifications");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.RootContainer>
          <S.Container>
            <S.Header>
              <S.BackButton onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text}
                />
              </S.BackButton>
              <S.HeaderTitle>Categories Setup</S.HeaderTitle>
              <S.EmptyView />
            </S.Header>

            <S.ProgressContainer>
              <S.ProgressStep active completed>
                <S.ProgressStepCircle active completed>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </S.ProgressStepCircle>
                <S.ProgressStepLabel active>Account</S.ProgressStepLabel>
              </S.ProgressStep>

              <S.ProgressLine active />

              <S.ProgressStep active completed>
                <S.ProgressStepCircle active completed>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </S.ProgressStepCircle>
                <S.ProgressStepLabel active>Personal Info</S.ProgressStepLabel>
              </S.ProgressStep>

              <S.ProgressLine active />

              <S.ProgressStep active completed>
                <S.ProgressStepCircle active completed>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </S.ProgressStepCircle>
                <S.ProgressStepLabel active>Balance</S.ProgressStepLabel>
              </S.ProgressStep>

              <S.ProgressLine active />

              <S.ProgressStep active>
                <S.ProgressStepCircle active>
                  <S.ProgressStepNumber>4</S.ProgressStepNumber>
                </S.ProgressStepCircle>
                <S.ProgressStepLabel active>Categories</S.ProgressStepLabel>
              </S.ProgressStep>

              <S.ProgressLine />

              <S.ProgressStep>
                <S.ProgressStepCircle>
                  <S.ProgressStepNumber>5</S.ProgressStepNumber>
                </S.ProgressStepCircle>
                <S.ProgressStepLabel>Notifications</S.ProgressStepLabel>
              </S.ProgressStep>
            </S.ProgressContainer>

            <S.FormContainer>
              <S.StepTitle>Set Up Your Categories</S.StepTitle>
              <S.StepDescription>
                Select your default categories or add custom ones
              </S.StepDescription>

              <FlatList
                data={defaultCategories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <S.CategoryItem
                    onPress={() => toggleCategory(item.id)}
                    selected={selectedCategories.includes(item.id)}
                  >
                    <S.CategoryIcon
                      selected={selectedCategories.includes(item.id)}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={
                          selectedCategories.includes(item.id)
                            ? "#FFFFFF"
                            : theme.colors.text
                        }
                      />
                    </S.CategoryIcon>
                    <S.CategoryName
                      selected={selectedCategories.includes(item.id)}
                    >
                      {item.name}
                    </S.CategoryName>
                    <S.CategoryType
                      selected={selectedCategories.includes(item.id)}
                    >
                      {item.type}
                    </S.CategoryType>
                  </S.CategoryItem>
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
              />

              {showAddCategory && (
                <S.AddCategoryContainer>
                  <S.AddCategoryTitle>Add Custom Category</S.AddCategoryTitle>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <FormInput
                        label="Category Name"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter category name"
                        icon="pencil-outline"
                        error={errors.name?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value } }) => (
                      <FormInput
                        label="Category Type"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Select type"
                        icon="swap-horizontal-outline"
                        error={errors.type?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="icon"
                    render={({ field: { onChange, value } }) => (
                      <FormInput
                        label="Icon"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Select icon"
                        icon="image-outline"
                        error={errors.icon?.message}
                      />
                    )}
                  />

                  <S.AddCategoryButton
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  >
                    <S.AddCategoryButtonText>
                      {isSubmitting ? "Adding..." : "Add Category"}
                    </S.AddCategoryButtonText>
                  </S.AddCategoryButton>
                </S.AddCategoryContainer>
              )}

              <S.ButtonsContainer>
                <S.AddButton
                  onPress={() => setShowAddCategory(!showAddCategory)}
                >
                  <S.AddButtonText>
                    {showAddCategory ? "Cancel" : "Add Custom Category"}
                  </S.AddButtonText>
                </S.AddButton>

                <S.ContinueButton
                  onPress={handleContinue}
                  disabled={selectedCategories.length === 0}
                >
                  <S.ContinueButtonText>
                    {selectedCategories.length === 0
                      ? "Select at least one category"
                      : "Continue"}
                  </S.ContinueButtonText>
                </S.ContinueButton>
              </S.ButtonsContainer>
            </S.FormContainer>
          </S.Container>
        </S.RootContainer>
        <NebulaToast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CategoriesSetupScreen;
