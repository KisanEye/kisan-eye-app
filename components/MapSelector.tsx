// components/MapSelector.tsx
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
  // Map type options with icons and descriptions in Urdu
  const mapTypes = [
    { 
      value: "NDVI", 
      label: "این ڈی وی آئی نقشہ", 
      icon: "image-filter-hdr", 
      description: "فصل کی صحت کا نقشہ", 
      color: "#4CAF50" 
    },
    { 
      value: "Farm", 
      label: "معمولی کھیت منظر", 
      icon: "image", 
      description: "عام کھیت کی تصویر",
      color: "#5D8AA8" 
    }
  ];

  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>نقشہ منتخب کریں</Text>
        <MaterialCommunityIcons name="map-legend" size={28} color="#40513B" />
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
        <Text style={styles.selectionText}>
          {mapTypes.find(type => type.value === selectedMap)?.description || "نقشہ دیکھیں"}
        </Text>
        <MaterialCommunityIcons 
          name="information-outline" 
          size={24} 
          color="#609966" 
        />
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
    justifyContent: "flex-end", // Right align for RTL
    marginBottom: 12,
  },
  headerText: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 20,
    color: "#000000",
    marginRight: 8, // Adjusted for RTL
    textAlign: "right",
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
    fontFamily: "NotoNastaliqUrdu-Medium",
    fontSize: 16,
    color: "#40513B",
    marginTop: 8,
    textAlign: "center",
  },
  selectedText: {
    color: "#FFFFFF",
    fontFamily: "NotoNastaliqUrdu-Bold",
  },
  selectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Right align for RTL
    marginTop: 12,
    paddingHorizontal: 4,
  },
  selectionText: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#609966",
    marginRight: 8, // Adjusted for RTL
    textAlign: "right",
  }
});

export default MapSelector;