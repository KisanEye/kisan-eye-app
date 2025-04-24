import { Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme, useAppFonts } from "../global/theme";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const insets = useSafeAreaInsets();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#2E5E3E",
          tabBarInactiveTintColor: "#6B8E61",
          tabBarStyle: { 
            backgroundColor: "#FFFFFF", 
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 10,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            borderTopWidth: 0,
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarLabelStyle: {
            fontFamily: "NotoNastaliqUrdu-Medium",
            fontSize: 12,
            marginTop: 0,
            marginBottom: 8,
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "ہوم",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "نقشہ",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="status"
          options={{
            title: "حالت",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-text" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="actions"
          options={{
            title: "عمل",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: "مدد",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="help-circle" color={color} size={28} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
});