import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as S from "./Upload.styles";

interface FileSourceCardProps {
  title: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const FileSourceCard: React.FC<FileSourceCardProps> = ({
  title,
  icon,
  selected,
  onPress,
  disabled = false,
}) => {
  return (
    <S.FileSourceCardContainer
      selected={selected}
      onPress={onPress}
      disabled={disabled}
    >
      <S.FileSourceIcon selected={selected}>
        <Ionicons
          name={icon as any}
          size={24}
          color={selected ? "#FFFFFF" : "#6E5DE7"}
        />
      </S.FileSourceIcon>
      <S.FileSourceTitle selected={selected}>{title}</S.FileSourceTitle>
    </S.FileSourceCardContainer>
  );
};

export default FileSourceCard;
