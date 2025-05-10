import type React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

import * as S from "./FormInput.styles";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  icon?: string;
  rightIcon?: React.ReactNode;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  icon,
  rightIcon,
  error,
}) => {
  const { theme } = useTheme();

  return (
    <S.InputContainer>
      <S.InputLabel>{label}</S.InputLabel>
      <S.InputWrapper hasError={!!error}>
        {icon && (
          <S.IconContainer>
            <Ionicons
              name={icon as any}
              size={20}
              color={theme.colors.textSecondary}
            />
          </S.IconContainer>
        )}
        <S.StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          hasIcon={!!icon}
          hasRightIcon={!!rightIcon}
          hasError={!!error}
        />
        {rightIcon && <S.RightIconContainer>{rightIcon}</S.RightIconContainer>}
      </S.InputWrapper>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.InputContainer>
  );
};

export default FormInput;
