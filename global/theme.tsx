import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { useFonts } from 'expo-font';

// Define font variants for Material Design 3 (MD3) with Montserrat fonts
const fontConfig = {
  displayLarge: {
    fontFamily: 'Montserrat-Black',
    fontSize: 57,
  },
  displayMedium: {
    fontFamily: 'Montserrat-Black',
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
  },
  headlineLarge: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
  },
  titleLarge: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  bodyLarge: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  labelLarge: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: 'Montserrat-Regular',
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
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-ThinItalic': require('../assets/fonts/Montserrat-ThinItalic.ttf'),
  });
  return fontsLoaded;
};

export default theme;