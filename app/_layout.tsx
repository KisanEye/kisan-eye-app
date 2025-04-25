// _layout.tsx
import { Stack } from "expo-router"; // Import Stack from expo-router
import { PaperProvider } from "react-native-paper"; // Import PaperProvider for theme
import { theme, useAppFonts } from "../global/theme"; // Import custom theme
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      {/* Here we are rendering the route stack */}
      <Stack>
        {/* If you want to hide the header in the Home Screen */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="map"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
