import type React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./Upload.styles";

interface FileSourceCardProps {
  title: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

const FileSourceCard: React.FC<FileSourceCardProps> = ({
  title,
  icon,
  selected,
  onPress,
}) => {
  return (
    <S.CardContainer selected={selected} onPress={onPress}>
      <S.IconContainer selected={selected}>
        <Ionicons
          name={icon as any}
          size={24}
          color={selected ? "#FFFFFF" : "#6E5DE7"}
        />
      </S.IconContainer>
      <S.CardTitle selected={selected}>{title}</S.CardTitle>
      {selected && (
        <S.CheckmarkContainer>
          <Ionicons name="checkmark-circle" size={20} color="#6E5DE7" />
        </S.CheckmarkContainer>
      )}
    </S.CardContainer>
  );
};

export default FileSourceCard;
