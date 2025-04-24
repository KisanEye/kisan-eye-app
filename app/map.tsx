import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Text, Appbar, Card, Avatar, Surface, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const screenWidth = Dimensions.get("window").width;

const MapScreen = () => {
  const [selectedMap, setSelectedMap] = useState("NDVI");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [statsVisible, setStatsVisible] = useState(false);

  const handleMapChange = (mapType) => {
    setSelectedMap(mapType);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.5);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.5);
  };

  const renderMap = () => {
    if (selectedMap === "NDVI") {
      return (
        <View style={styles.mapContainer}>
          <View style={styles.mapWrapper}>
            <Image
              source={require("../assets/images/ndvi.jpg")}
              style={[styles.mapImage, { transform: [{ scale: zoomLevel }] }]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>نقشہ کی راہنمائی:</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: "#ff0000" }]} />
              <Text style={styles.legendText}>فوری توجہ درکار</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: "#ffff00" }]} />
              <Text style={styles.legendText}>معتدل حالت</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: "#00ff00" }]} />
              <Text style={styles.legendText}>صحت مند علاقہ</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mapContainer}>
        <View style={styles.mapWrapper}>
          <Image
            source={require("../assets/images/farm.jpg")}
            style={[styles.mapImage, { transform: [{ scale: zoomLevel }] }]}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerContent}>
          <Avatar.Image
            size={52}
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>کسان آئی</Text>
            <Text style={styles.subtitle}>کھیت کا نقشہ</Text>
          </View>
        </View>
      </Surface>

      {/* Map Type Selector with Icons */}
      <View style={styles.mapTypeContainer}>
        <TouchableOpacity
          style={[
            styles.mapTypeButton,
            selectedMap === "NDVI" && styles.mapTypeButtonActive,
          ]}
          onPress={() => handleMapChange("NDVI")}
        >
          <MaterialCommunityIcons
            name="leaf"
            size={24}
            color={selectedMap === "NDVI" ? "#FFFFFF" : "#2E5E3E"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mapTypeButton,
            selectedMap === "RGB" && styles.mapTypeButtonActive,
          ]}
          onPress={() => handleMapChange("RGB")}
        >
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color={selectedMap === "RGB" ? "#FFFFFF" : "#2E5E3E"}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.mapCard} elevation={3}>
          <Card.Content style={styles.mapCardContent}>
            {renderMap()}
            <View style={styles.mapControls}>
              <IconButton
                icon="plus"
                size={28}
                mode="contained"
                iconColor="#FFFFFF"
                containerColor="#2E5E3E"
                onPress={handleZoomIn}
                style={styles.zoomButton}
              />
              <IconButton
                icon="minus"
                size={28}
                mode="contained"
                iconColor="#FFFFFF"
                containerColor="#2E5E3E"
                onPress={handleZoomOut}
                style={styles.zoomButton}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            icon="refresh"
            style={styles.updateButton}
            labelStyle={styles.updateButtonLabel}
            onPress={() => {}}
          >
            تازہ ترین نقشہ حاصل کریں
          </Button>
          <Button
            mode="contained"
            icon="share-variant"
            style={styles.shareButton}
            labelStyle={styles.shareButtonLabel}
            onPress={() => {}}
          >
            نقشہ شیئر کریں
          </Button>
        </View>

        {/* Stats Button */}
        <Button
          mode="outlined"
          onPress={() => setStatsVisible(true)}
          style={styles.statsButton}
        >
          نقشہ کی تفصیلات دیکھیں
        </Button>
      </ScrollView>

      {/* Stats Modal */}
      <Modal visible={statsVisible} onDismiss={() => setStatsVisible(false)} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>نقشہ کی تفصیلات</Text>
          <Card style={styles.statsCard}>
            <Card.Content style={styles.statsCardContent}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>68%</Text>
                <Text style={styles.statLabel}>صحت مند علاقہ</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>23%</Text>
                <Text style={styles.statLabel}>معتدل حالت</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>9%</Text>
                <Text style={styles.statLabel}>توجہ درکار</Text>
              </View>
            </Card.Content>
          </Card>
          <Button
            mode="contained"
            onPress={() => setStatsVisible(false)}
            style={styles.closeButton}
          >
            بند کریں
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7EA",
  },
  header: {
    backgroundColor: "#2E5E3E",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "transparent",
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "right",
  },
  subtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#E0F2C3",
    textAlign: "right",
  },
  mapTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  mapTypeButton: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: "#E8F5E9",
  },
  mapTypeButtonActive: {
    backgroundColor: "#2E5E3E",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32, // Ensures bottom content isn’t too close to edge
  },
  mapCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  mapCardContent: {
    padding: 0,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: screenWidth * 0.8, // Larger map area
  },
  mapWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  legendContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
  },
  legendTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
    textAlign: "right",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 6,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 6,
    marginLeft: 8,
  },
  legendText: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14,
    color: "#333333",
    textAlign: "right",
  },
  mapControls: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "column",
  },
  zoomButton: {
    margin: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  updateButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    marginRight: 8,
  },
  updateButtonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 14,
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    marginLeft: 8,
  },
  shareButtonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 14,
  },
  statsButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  statsCard: {
    width: "80%",
    borderRadius: 16,
  },
  statsCardContent: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  statItem: {
    alignItems: "center",
    marginVertical: 10,
  },
  statValue: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 28,
    color: "#2E5E3E",
  },
  statLabel: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#666666",
  },
  statDivider: {
    width: "80%",
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2E5E3E",
  },
});

export default MapScreen;