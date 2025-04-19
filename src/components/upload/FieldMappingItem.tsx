import type React from "react";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./Upload.styles";

interface FieldMappingItemProps {
  field: {
    id: string;
    label: string;
    mappedTo: string;
  };
  onChange: (mappedTo: string) => void;
}

const fieldOptions = [
  { value: "title", label: "Transaction Title" },
  { value: "amount", label: "Amount" },
  { value: "date", label: "Date" },
  { value: "category", label: "Category" },
  { value: "notes", label: "Notes" },
  { value: "ignore", label: "Ignore this field" },
];

const FieldMappingItem: React.FC<FieldMappingItemProps> = ({
  field,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    fieldOptions.find((option) => option.value === field.mappedTo) ||
    fieldOptions[0];

  return (
    <S.Container>
      <S.FieldLabel>{field.label}</S.FieldLabel>

      <S.DropdownButton onPress={() => setIsOpen(!isOpen)}>
        <S.DropdownButtonText>{selectedOption.label}</S.DropdownButtonText>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9E9E9E"
        />
      </S.DropdownButton>

      {isOpen && (
        <S.OptionsContainer>
          {fieldOptions.map((option) => (
            <S.OptionItem
              key={option.value}
              onPress={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              isSelected={option.value === field.mappedTo}
            >
              <S.OptionText isSelected={option.value === field.mappedTo}>
                {option.label}
              </S.OptionText>
              {option.value === field.mappedTo && (
                <Ionicons name="checkmark" size={18} color="#6E5DE7" />
              )}
            </S.OptionItem>
          ))}
        </S.OptionsContainer>
      )}
    </S.Container>
  );
};

export default FieldMappingItem;
