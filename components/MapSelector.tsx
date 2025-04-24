import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Reimagined Map Selector with large easy-to-tap options instead of dropdown
const MapSelector = ({ 
  selectedMap, 
  onMapChange 
}: { 
  selectedMap: string, 
  onMapChange: (mapType: string) => void 
}) => {
  // Map type options with icons and descriptions in English
  const mapTypes = [
    { 
      value: "NDVI", 
      label: "NDVI Map", 
      icon: "image-filter-hdr", 
      description: "Crop Health Map", 
      color: "#4CAF50" 
    },
    { 
      value: "Farm", 
      label: "Standard Field View", 
      icon: "image", 
      description: "Regular Field Image",
      color: "#5D8AA8" 
    }
  ];

  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="map-legend" size={28} color="#40513B" />
        <Text style={styles.headerText}>Select Map</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {mapTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.optionButton,
              selectedMap === type.value && styles.selectedOption
            ]}
            onPress={() => onMapChange(type.value)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons 
              name={type.icon} 
              size={32} 
              color={selectedMap === type.value ? "#FFFFFF" : type.color}
            />
            <Text style={[
              styles.optionLabel,
              selectedMap === type.value && styles.selectedText
            ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Description of selected map type */}
      <View style={styles.selectionInfo}>
        <MaterialCommunityIcons 
          name="information-outline" 
          size={24} 
          color="#609966" 
        />
        <Text style={styles.selectionText}>
          {mapTypes.find(type => type.value === selectedMap)?.description || "View Map"}
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#F5F5F5",
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align for LTR
    marginBottom: 12,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#000000",
    marginLeft: 8, // Adjusted for LTR
    textAlign: "left",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    gap: 12,
  },
  optionButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#609966",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  selectedOption: {
    backgroundColor: "#609966",
    borderColor: "#40513B",
  },
  optionLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#40513B",
    marginTop: 8,
    textAlign: "center",
  },
  selectedText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-Bold",
  },
  selectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align for LTR
    marginTop: 12,
    paddingHorizontal: 4,
  },
  selectionText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#609966",
    marginLeft: 8, // Adjusted for LTR
    textAlign: "left",
  }
});

export default MapSelector;