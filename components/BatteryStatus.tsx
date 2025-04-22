// components/BatteryStatus.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BatteryStatus = ({ batteryPercentage }: { batteryPercentage: number }) => {
  // Determine battery icon and color based on percentage
  const getBatteryInfo = () => {
    if (batteryPercentage >= 80) {
      return { icon: "battery", color: "#4CAF50" };
    } else if (batteryPercentage >= 50) {
      return { icon: "battery-60", color: "#8BC34A" };
    } else if (batteryPercentage >= 30) {
      return { icon: "battery-40", color: "#FFC107" };
    } else if (batteryPercentage >= 15) {
      return { icon: "battery-20", color: "#FF9800" };
    } else {
      return { icon: "battery-alert", color: "#F44336" };
    }
  };

  const { icon, color } = getBatteryInfo();

  return (
    <Surface style={styles.container}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
      <Text style={styles.text}>{batteryPercentage}%</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    elevation: 2,
  },
  text: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    marginLeft: 4,
    color: "#40513B",
  }
});

export default BatteryStatus;