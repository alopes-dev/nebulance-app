import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  AUTH_TOKEN: "@nebulance_auth_token",
};

export const storage = {
  // Save auth token
  setAuthToken: async (token: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error("Error saving auth token:", error);
    }
  },

  // Get auth token
  getAuthToken: async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  },

  // Remove auth token
  removeAuthToken: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  },
};
