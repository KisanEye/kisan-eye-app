import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
  SafeAreaView, 
  Dimensions,
  TouchableOpacity 
} from "react-native";
import { Text, Appbar, Button, Card, Avatar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BatteryStatus from "../components/BatteryStatus";
import MapSelector from "../components/MapSelector";

// Get screen dimensions for better map sizing
const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [selectedMap, setSelectedMap] = useState("NDVI");
  const [batteryPercentage, setBatteryPercentage] = useState(85);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMapChange = (mapType: string) => {
    setSelectedMap(mapType);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 3) setZoomLevel(zoomLevel + 0.5);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.5);
  };

  const renderMap = () => {
    if (selectedMap === "NDVI") {
      return (
        <View style={styles.mapWrapper}>
          <View style={[styles.mapImageContainer, { transform: [{ scale: zoomLevel }] }]}>
            <Image 
              source={require("../assets/images/ndvi.jpg")} 
              style={styles.mapImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Health Indicator:</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ff0000' }]} />
              <Text style={styles.legendText}>Poor Condition</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ffff00' }]} />
              <Text style={styles.legendText}>Moderate Condition</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#00ff00' }]} />
              <Text style={styles.legendText}>Good Condition</Text>
            </View>
          </View>
          
          {/* Zoom Controls */}
          <View style={styles.zoomControlsContainer}>
            <TouchableOpacity 
              style={styles.zoomButton} 
              onPress={handleZoomIn}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.zoomButton} 
              onPress={handleZoomOut}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="minus" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mapWrapper}>
        <View style={[styles.mapImageContainer, { transform: [{ scale: zoomLevel }] }]}>
          <Image 
            source={require("../assets/images/farm.jpg")} 
            style={styles.mapImage} 
            resizeMode="contain"
          />
        </View>
        
        {/* Zoom Controls for Regular Map Too */}
        <View style={styles.zoomControlsContainer}>
          <TouchableOpacity 
            style={styles.zoomButton} 
            onPress={handleZoomIn}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.zoomButton} 
            onPress={handleZoomOut}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="minus" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed App Header */}
      <Appbar.Header style={styles.appbar}>
        <Avatar.Image 
          size={40} 
          source={require("../assets/images/logo.png")} 
          style={styles.logo}
          backgroundColor="#FFFFFF"
        />
        <Appbar.Content 
          title="KisanEye" 
          titleStyle={styles.appbarTitle} 
          subtitle="Field Health Monitor"
          subtitleStyle={styles.appbarSubtitle}
        />
        <BatteryStatus batteryPercentage={batteryPercentage} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Farm Status Overview with Visual Indicators */}
        <Card style={styles.statusCard}>
          <Card.Title 
            title="Field Health Status" 
            titleStyle={styles.cardTitle}
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon="leaf" 
                style={styles.cardIcon}
                color="#EDF1D6" 
              />
            )}
          />
          <Card.Content style={styles.statusContent}>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="water" size={32} color="#609966" />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Moisture:</Text>
                <Text style={styles.statusValue}>Good</Text>
              </View>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="white-balance-sunny" size={32} color="#609966" />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Sunlight:</Text>
                <Text style={styles.statusValue}>Adequate</Text>
              </View>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="bug" size={32} color="#609966" />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>Pest Risk:</Text>
                <Text style={styles.statusValue}>Low</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Map Selector Component */}
        <MapSelector selectedMap={selectedMap} onMapChange={handleMapChange} />

        {/* Map Display with Zoom Controls */}
        <Card style={styles.mapCard}>
          <Card.Title 
            title="Field Map" 
            titleStyle={styles.cardTitle}
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon="map" 
                style={styles.cardIcon}
                color="#EDF1D6" 
              />
            )}
          />
          <Card.Content style={styles.mapSubtitleContainer}>
            <Text style={styles.mapSubtitle}>
              {selectedMap === "NDVI" ? "Vegetation Health Status" : "Standard View"}
            </Text>
          </Card.Content>
          <Divider />
          <Card.Content style={styles.mapCardContent}>
            {renderMap()}
          </Card.Content>
        </Card>

        {/* Action Buttons with Icons */}
        <View style={styles.actionButtonsContainer}>
          <Button 
            mode="contained" 
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="drone" size={28} color={color} />
            )}
            onPress={() => {}} 
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Deploy Drone
          </Button>
          
          <Button 
            mode="contained" 
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="spray" size={28} color={color} />
            )} 
            onPress={() => {}} 
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Apply Pesticide
          </Button>
        </View>

        {/* Help Section with Voice Support Hint */}
        <Card style={styles.helpCard}>
          <Card.Content style={styles.helpContent}>
            <MaterialCommunityIcons name="help-circle-outline" size={36} color="#40513B" />
            <Text style={styles.helpText}>Need help understanding the map?</Text>
          </Card.Content>
          <Card.Actions style={styles.helpActions}>
            <Button 
              mode="contained"
              icon="play-circle-outline" 
              onPress={() => {}} 
              style={styles.helpButton}
              labelStyle={styles.helpButtonLabel}
            >
              Voice Guidance
            </Button>
            <Button 
              mode="contained"
              icon="phone" 
              onPress={() => {}} 
              style={styles.helpButton}
              labelStyle={styles.helpButtonLabel}
            >
              Contact Support
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EDF1D6",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  appbar: {
    backgroundColor: "#40513B",
    paddingHorizontal: 16,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70, // Increased height for better visibility
  },
  logo: {
    backgroundColor: "transparent",
    marginRight: 8,
  },
  appbarTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24, // Increased font size
    color: "#EDF1D6",
    textAlign: "left",
    marginVertical: 4,
    lineHeight: 32,
  },
  appbarSubtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14, // Increased font size
    color: "#EDF1D6",
    opacity: 0.8,
    textAlign: "left",
  },
  statusCard: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20, // Increased font size
    color: "#000000", // Changed to black for better readability
    textAlign: "left",
    marginVertical: 4,
    lineHeight: 32,
  },
  mapSubtitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 8,
  },
  mapSubtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#609966",
    textAlign: "left",
  },
  cardIcon: {
    backgroundColor: "#609966",
  },
  statusContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align for LTR
    marginBottom: 16,
    paddingVertical: 4,
  },
  statusTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12, // Adjusted for LTR
  },
  statusLabel: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18, // Increased font size
    color: "#000000", // Changed to black
    marginRight: 8,
  },
  statusValue: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18, // Increased font size
    color: "#000000", // Changed to black
  },
  mapCard: {
    marginVertical: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 12,
  },
  mapCardContent: {
    padding: 0,
  },
  mapWrapper: {
    position: "relative",
    width: "100%",
    height: screenWidth * 0.8, // Height proportional to screen width
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // This prevents content from spilling out when zoomed
  },
  mapImageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  legendContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 8,
    position: "absolute",
    bottom: 16,
    left: 16, // Adjusted for LTR
    maxWidth: "50%", // Increased width for text
  },
  legendTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16, // Increased font size
    color: "#000000", // Changed to black
    marginBottom: 8,
    textAlign: "left",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align for LTR
    marginTop: 4,
  },
  legendColor: {
    width: 20, // Slightly larger
    height: 20, // Slightly larger
    borderRadius: 4,
    marginRight: 8, // Adjusted for LTR
  },
  legendText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12.5, // Increased font size
    color: "#000000", // Changed to black
    textAlign: "left",
  },
  zoomControlsContainer: {
    position: "absolute",
    right: 16, // Adjusted for LTR
    bottom: 16,
    flexDirection: "column",
    gap: 8,
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#40513B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#40513B",
    borderRadius: 12,
    elevation: 4,
  },
  buttonContent: {
    height: 70, // Taller buttons
    flexDirection: "row", // Icon on the left for LTR
  },
  buttonLabel: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13.5, // Increased font size
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  helpCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  helpContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align for LTR
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  helpText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16, // Increased font size
    color: "#000000", // Changed to black
    marginLeft: 12, // Adjusted for LTR
    textAlign: "left",
  },
  helpActions: {
    justifyContent: "space-around",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  helpButton: {
    backgroundColor: "#609966",
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  helpButtonLabel: {
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    color: "#FFFFFF",
  }
});

export default HomeScreen;