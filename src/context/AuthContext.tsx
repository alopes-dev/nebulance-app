import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CreateAccountCredentials,
  RegisterCredentials,
  useAuthQueries,
} from "@/hooks/useAuthQueries";
import { IAccount, IUser, TOnboardingStatus } from "@/types";
import Toast from "react-native-toast-message";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isCheckingAuth: boolean;
  accountInfo?: IAccount;
  isCheckingAccountInfo?: boolean;
  refreshAccountInfo?: () => Promise<IAccount | null>;
  currency: string;
  handleSetCurrency: (currency: string) => void;
  handleRegister: (
    payload: RegisterCredentials,
    onSuccess: () => void
  ) => Promise<void>;
  isRegistering: boolean;
  onboardingStatus: TOnboardingStatus;
  handleCreateAccount: (
    payload: CreateAccountCredentials,
    onSuccess: () => void
  ) => Promise<IAccount>;
  isCreatingAccount: boolean;
  handleUpdateAccount: (
    payload: IAccount,
    onSuccess: () => void
  ) => Promise<IAccount>;
  isUpdatingAccount: boolean;
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
  accountInfo: undefined,
  isCheckingAccountInfo: false,
  refreshAccountInfo: async () => null,
  onboardingStatus: "ACCOUNT_CREATION",
  handleCreateAccount: async (): Promise<IAccount> => {
    return {} as IAccount;
  },
  isCreatingAccount: false,
  handleUpdateAccount: async (): Promise<IAccount> => {
    return {} as IAccount;
  },
  isUpdatingAccount: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [onboardingStatus, setOnboardingStatus] =
    useState<TOnboardingStatus>("ACCOUNT_CREATION");

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
    mutateCreateAccount,
    isCreatingAccount,
    mutateUpdateAccount,
    isUpdatingAccount,
  } = useAuthQueries();

  const handleLogin = useCallback(
    (email: string, password: string) =>
      mutateLogin(
        { email, password },
        {
          onError: (error) => {
            Toast.show({
              text1: "Error logging in",
              text2: error.message,
              type: "error",
              position: "bottom",
            });
          },
        }
      ),
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

  const handleCreateAccount = useCallback(
    (payload: CreateAccountCredentials, onSuccess: () => void) =>
      mutateCreateAccount(payload, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          Toast.show({
            text1: "Error creating account",
            text2: error.message,
            type: "error",
            position: "bottom",
          });
        },
      }),
    [mutateCreateAccount]
  );

  const handleUpdateAccount = useCallback(
    (payload: IAccount, onSuccess: () => void) =>
      mutateUpdateAccount(payload, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          Toast.show({
            text1: "Error updating account",
            text2: error.message,
            type: "error",
            position: "bottom",
          });
        },
      }),
    [mutateUpdateAccount]
  );

  useEffect(() => {
    if (accountInfo || user) {
      setOnboardingStatus(
        (accountInfo?.onboardingStatus as TOnboardingStatus) ||
          (user?.onboardingStatus as TOnboardingStatus) ||
          "ACCOUNT_CREATION"
      );
    }
  }, [accountInfo, user]);

  const values = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      isCheckingAuth,
      isLoading: isLoggingIn || isLoggingOut,
      login: handleLogin,
      logout: handleLogout,
      accountInfo: accountInfo as IAccount,
      isCheckingAccountInfo,
      refreshAccountInfo,
      currency,
      handleSetCurrency,
      handleRegister,
      isRegistering,
      onboardingStatus,
      handleCreateAccount,
      isCreatingAccount,
      handleUpdateAccount,
      isUpdatingAccount,
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
      onboardingStatus,
      handleCreateAccount,
      isCreatingAccount,
      handleUpdateAccount,
      isUpdatingAccount,
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
