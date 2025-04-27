import Toast from "react-native-toast-message";
import * as S from "./Toast.styles";

export const NebulaToast = () => {
  return (
    <Toast
      config={{
        error: ({ text1, text2 }) => (
          <S.ErrorToast>
            <S.ErrorToastText>{text1}</S.ErrorToastText>
            <S.ErrorToastText>{text2}</S.ErrorToastText>
          </S.ErrorToast>
        ),
      }}
    />
  );
};
