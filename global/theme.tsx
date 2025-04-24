// global/theme.tsx
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { useFonts } from 'expo-font';

// Define font variants for Material Design 3 (MD3) with all Urdu fonts
const fontConfig = {
  displayLarge: {
    fontFamily: 'NotoNastaliqUrdu-Bold', // Using Bold font
    fontSize: 57,
  },
  displayMedium: {
    fontFamily: 'NotoNastaliqUrdu-Bold',
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: 'NotoNastaliqUrdu-Medium', // Using Medium font for display
    fontSize: 36,
  },
  headlineLarge: {
    fontFamily: 'NotoNastaliqUrdu-SemiBold', // Using SemiBold font
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: 'NotoNastaliqUrdu-SemiBold',
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: 'NotoNastaliqUrdu-Regular', // Regular font for smaller headlines
    fontSize: 24,
  },
  titleLarge: {
    fontFamily: 'NotoNastaliqUrdu-Bold', // Bold for titles
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: 'NotoNastaliqUrdu-SemiBold',
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: 'NotoNastaliqUrdu-Medium',
    fontSize: 14,
  },
  bodyLarge: {
    fontFamily: 'NotoNastaliqUrdu-Regular', // Regular font for body text
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: 'NotoNastaliqUrdu-Regular',
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'NotoNastaliqUrdu-Regular',
    fontSize: 12,
  },
  labelLarge: {
    fontFamily: 'NotoNastaliqUrdu-SemiBold',
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: 'NotoNastaliqUrdu-Regular',
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: 'NotoNastaliqUrdu-Regular',
    fontSize: 11,
  },
};

// Define your color palette
const colors = {
  lightestGreen: "#EDF1D6", // Background color
  mediumGreen: "#9DC08B", // Secondary highlights
  darkGreen: "#609966", // Text and body
  darkestGreen: "#40513B", // Primary action buttons
};

// Define the theme with your color scheme and font configuration
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.lightestGreen,
    primary: colors.mediumGreen,
    accent: colors.darkGreen,
    surface: colors.lightestGreen,
    text: colors.darkestGreen,
    placeholder: colors.darkGreen,
    disabled: colors.darkGreen,
  },
  fonts: configureFonts({ config: fontConfig }), // Apply font configuration to the theme
};

// Add font loading hook directly in theme file
export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    'NotoNastaliqUrdu-Bold': require('../assets/fonts/NotoNastaliqUrdu-Bold.ttf'),
    'NotoNastaliqUrdu-Medium': require('../assets/fonts/NotoNastaliqUrdu-Medium.ttf'),
    'NotoNastaliqUrdu-Regular': require('../assets/fonts/NotoNastaliqUrdu-Regular.ttf'),
    'NotoNastaliqUrdu-SemiBold': require('../assets/fonts/NotoNastaliqUrdu-SemiBold.ttf'),
  });
  return fontsLoaded;
};

export default theme;
