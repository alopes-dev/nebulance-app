import { useMutation } from "@tanstack/react-query";
import { storage } from "@/utils/storage";
import * as Haptics from "expo-haptics";
import { authLogin, authRegister, authUser } from "@/services/auth";
import { useEffect } from "react";
import { getAccountInfo } from "@/services/getAccountInfo";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export const useAuthQueries = () => {
  // Query to check authentication status and get user data
  const {
    data: user,
    isPending: isCheckingAuth,
    mutateAsync: mutateCheckAuth,
  } = useMutation({
    mutationFn: async () => {
      const token = await storage.getAuthToken();

      if (!token) return null;

      const response = await authUser();
      return response;
    },
    onSuccess: (data) => {
      mutateCheckAccountInfo();
    },
    onError: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
    retry: false,
  });

  // Register mutation
  const { mutateAsync: mutateRegister, isPending: isRegistering } = useMutation(
    {
      mutationFn: async (payload: RegisterCredentials) => authRegister(payload),
      onSuccess: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      },
      onError: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      },
    }
  );

  const {
    data: accountInfo,
    isPending: isCheckingAccountInfo,
    mutateAsync: mutateCheckAccountInfo,
  } = useMutation({
    mutationFn: async () => {
      const token = await storage.getAuthToken();

      if (!token) return null;

      const response = await getAccountInfo();
      return response;
    },
    retry: false,
  });

  // Login mutation
  const { mutateAsync: mutateLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: async (credentials: LoginCredentials) =>
      authLogin(credentials.email, credentials.password),
    onSuccess: (data) => {
      storage.setAuthToken(data.token);
      mutateCheckAuth();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    onError: (error) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
  });

  // Logout mutation
  const { mutateAsync: mutateLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await storage.removeAuthToken();
      mutateCheckAuth();
    },
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    onError: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
  });

  useEffect(() => {
    mutateCheckAuth();
  }, []);

  useEffect(() => {
    mutateCheckAccountInfo();
  }, []);

  return {
    user,
    isCheckingAuth,
    mutateLogin,
    mutateLogout,
    isLoggingIn,
    isLoggingOut,
    accountInfo,
    isCheckingAccountInfo,
    refreshAccountInfo: mutateCheckAccountInfo,
    mutateRegister,
    isRegistering,
  };
};
