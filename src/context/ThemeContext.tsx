import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Appearance } from "react-native";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme } from "../theme";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof darkTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: darkTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  // Update theme when device theme changes
  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    toggleTheme();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
