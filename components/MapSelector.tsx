// components/MapSelector.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme, Surface, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MapSelector = ({ 
  selectedMap, 
  onMapChange 
}: { 
  selectedMap: string, 
  onMapChange: (mapType: string) => void 
}) => {
  const { colors } = useTheme();

  // Map type options with icons and descriptions in Urdu
  const mapTypes = [
    { 
      value: "NDVI", 
      label: "این ڈی وی آئی نقشہ", // Urdu label for NDVI
      icon: "image-filter-hdr", 
      description: "فصل کی صحت کی سطحیں دکھاتا ہے" // Urdu description for NDVI
    },
    { 
      value: "Farm", 
      label: "معمولی کھیت منظر", // Urdu label for Regular Farm View
      icon: "image", 
      description: "عام کھیت کی تصویر" // Urdu description for Regular Farm View
    }
  ];

  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="map-legend" size={24} color="#40513B" />
        <Text style={[styles.headerText, { writingDirection: 'rtl' }]}>نقشہ منتخب کریں</Text> {/* Urdu header text */}
      </View>
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMap}
          onValueChange={onMapChange}
          style={[styles.picker, { color: "#40513B" }]}
          dropdownIconColor="#40513B"
          mode="dropdown"
        >
          {mapTypes.map((type) => (
            <Picker.Item 
              key={type.value} 
              label={type.label} 
              value={type.value} 
            />
          ))}
        </Picker>
      </View>
      
      {/* Current selection info */}
      <View style={styles.selectionInfo}>
        <MaterialCommunityIcons 
          name={mapTypes.find(type => type.value === selectedMap)?.icon || "map"} 
          size={22} 
          color="#609966" 
        />
        <Text style={[styles.selectionText, { writingDirection: 'rtl' }]}>
          {mapTypes.find(type => type.value === selectedMap)?.description || "نقشہ دیکھیں"} {/* Urdu description */}
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#F5F5F5",
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontFamily: "NotoNastaliqUrdu-Bold", 
    fontSize: 16,
    color: "#40513B",
    marginLeft: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#609966",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginVertical: 4,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    fontFamily: "NotoNastaliqUrdu-Regular", 
  },
  selectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  selectionText: {
    fontFamily: "NotoNastaliqUrdu-Regular", 
    fontSize: 14,
    color: "#609966",
    marginLeft: 8,
  }
});

export default MapSelector;
