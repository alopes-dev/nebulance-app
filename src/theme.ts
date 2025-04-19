// Light theme
export const lightTheme = {
  colors: {
    primary: "#6E5DE7",
    secondary: "#F5CF6E",
    background: "#FFFFFF",
    card: "#F9F9F9",
    text: "#333333",
    textSecondary: "#9E9E9E",
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FFC107",
    info: "#2196F3",
    expense: "#FF6B6B",
    income: "#4CAF50",
    border: "#EEEEEE",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
};

// Dark theme
export const darkTheme = {
  colors: {
    primary: "#8A7BFF", // Slightly lighter purple for dark mode
    secondary: "#F5CF6E",
    background: "#121212", // Dark background
    card: "#1E1E1E", // Dark card background
    text: "#FFFFFF", // White text
    textSecondary: "#AAAAAA", // Light gray text
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FFC107",
    info: "#2196F3",
    expense: "#FF6B6B",
    income: "#4CAF50",
    border: "#333333", // Dark border
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
};

export type Theme = typeof darkTheme;
