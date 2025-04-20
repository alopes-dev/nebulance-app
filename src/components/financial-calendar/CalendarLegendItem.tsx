import * as S from "./CalendarLegend.styles";

interface CalendarLegendItemProps {
  description: string;
  color: string;
}

export const CalendarLegendItem = ({
  description,
  color,
}: CalendarLegendItemProps) => {
  return (
    <S.LegendItem>
      <S.LegendDot color={color} />
      <S.LegendText>{description}</S.LegendText>
    </S.LegendItem>
  );
};
