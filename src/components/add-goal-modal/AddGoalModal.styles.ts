import styled from "styled-components/native";
import { ThemeProps } from "@/types";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";

export const BottomSheetModal = styled(GorhomBottomSheetModal)`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

export const Title = styled.Text`
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.xl}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.bold};
  color: ${(props: ThemeProps) => props.theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${(props: ThemeProps) => props.theme.spacing.xs}px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
`;

export const Form = styled.View`
  gap: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const Input = styled.TextInput`
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
`;

export const DatePicker = styled(DateTimePicker)`
  background-color: ${(props: ThemeProps) => props.theme.colors.border};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

export const CreateButton = styled.TouchableOpacity`
  background-color: ${(props: ThemeProps & { disabled: boolean }) =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
  padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
  align-items: center;
  margin-top: ${(props: ThemeProps) => props.theme.spacing.lg}px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.5 : 1)};
  flex-direction: row;
  justify-content: center;
  gap: ${(props: ThemeProps) => props.theme.spacing.sm}px;
`;

export const CreateButtonText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.text};
  font-size: ${(props: ThemeProps) => props.theme.fontSizes.md}px;
  font-weight: ${(props: ThemeProps) => props.theme.fontWeights.semiBold};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props: ThemeProps) => props.theme.spacing.sm}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.card};
  border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
`;
