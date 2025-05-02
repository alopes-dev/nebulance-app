import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { RegisterCredentials, useAuthQueries } from "@/hooks/useAuthQueries";
import { IAccount, IUser } from "@/types";
import Toast from "react-native-toast-message";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isCheckingAuth: boolean;
  accountInfo?: IAccount | null;
  isCheckingAccountInfo?: boolean;
  refreshAccountInfo?: () => Promise<void>;
  currency: string;
  handleSetCurrency: (currency: string) => void;
  handleRegister: (
    payload: RegisterCredentials,
    onSuccess: () => void
  ) => Promise<void>;
  isRegistering: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  isCheckingAuth: true,
  currency: "USD",
  handleSetCurrency: () => {},
  handleRegister: async () => {},
  isRegistering: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("USD");
  const {
    user,
    isCheckingAuth,
    mutateLogin,
    mutateLogout,
    isLoggingIn,
    isLoggingOut,
    accountInfo,
    isCheckingAccountInfo,
    refreshAccountInfo,
    mutateRegister,
    isRegistering,
  } = useAuthQueries();

  const handleLogin = useCallback(
    (email: string, password: string) => mutateLogin({ email, password }),
    [mutateLogin]
  );

  const handleLogout = useCallback(() => mutateLogout(), [mutateLogout]);

  const handleSetCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

  const handleRegister = useCallback(
    (payload: RegisterCredentials, onSuccess: () => void) =>
      mutateRegister(payload, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          Toast.show({
            text1: "Error registering",
            text2: error.message,
            type: "error",
            position: "bottom",
          });
        },
      }),
    [mutateRegister]
  );
  const values = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      isCheckingAuth,
      isLoading: isLoggingIn || isLoggingOut,
      login: handleLogin,
      logout: handleLogout,
      accountInfo,
      isCheckingAccountInfo,
      refreshAccountInfo,
      currency,
      handleSetCurrency,
      handleRegister,
      isRegistering,
    }),
    [
      user,
      isCheckingAuth,
      isLoggingIn,
      isLoggingOut,
      handleLogin,
      handleLogout,
      accountInfo,
      isCheckingAccountInfo,
      refreshAccountInfo,
      currency,
      handleSetCurrency,
      handleRegister,
      isRegistering,
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
