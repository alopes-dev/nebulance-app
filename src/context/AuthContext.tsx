import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuthQueries } from "@/hooks/useAuthQueries";
import { IAccount, IUser } from "@/types";

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
  } = useAuthQueries();

  const handleLogin = useCallback(
    (email: string, password: string) => mutateLogin({ email, password }),
    [mutateLogin]
  );

  const handleLogout = useCallback(() => mutateLogout(), [mutateLogout]);

  const handleSetCurrency = useCallback((currency: string) => {
    setCurrency(currency);
  }, []);

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
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
