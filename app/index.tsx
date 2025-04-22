// screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { Text, Appbar, Button, Card, Avatar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BatteryStatus from "../components/BatteryStatus";
import MapSelector from "../components/MapSelector";

// Get screen dimensions for better map sizing
const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [selectedMap, setSelectedMap] = useState("NDVI");
  const [batteryPercentage, setBatteryPercentage] = useState(85);

  const handleMapChange = (mapType: string) => {
    setSelectedMap(mapType);
  };

  const renderMap = () => {
    if (selectedMap === "NDVI") {
      return (
        <View style={styles.mapWrapper}>
          <Image 
            source={require("../assets/images/ndvi.jpg")} 
            style={styles.mapImage}
            resizeMode="contain"
          />
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Health Legend:</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ff0000' }]} />
              <Text style={styles.legendText}>Poor Health</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ffff00' }]} />
              <Text style={styles.legendText}>Fair Health</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#00ff00' }]} />
              <Text style={styles.legendText}>Good Health</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mapWrapper}>
        <Image 
          source={require("../assets/images/farm.jpg")} 
          style={styles.mapImage} 
          resizeMode="contain"
        />
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
          backgroundColor="#609966"
        />
        <Appbar.Content 
          title="KisanEye" 
          titleStyle={styles.appbarTitle} 
          subtitle="Farm Health Monitor" 
          subtitleStyle={styles.appbarSubtitle}
        />
        <BatteryStatus batteryPercentage={batteryPercentage} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Farm Status Overview */}
        <Card style={styles.statusCard}>
          <Card.Title 
            title="Farm Health Status" 
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
              <MaterialCommunityIcons name="water" size={24} color="#609966" />
              <Text style={styles.statusText}>Moisture: Good</Text>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="white-balance-sunny" size={24} color="#609966" />
              <Text style={styles.statusText}>Sun Exposure: Optimal</Text>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="bug" size={24} color="#609966" />
              <Text style={styles.statusText}>Pest Risk: Low</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Map Selector Component */}
        <MapSelector selectedMap={selectedMap} onMapChange={handleMapChange} />

        {/* Map Display - Now Much Larger */}
        <Card style={styles.mapCard}>
          <Card.Title 
            title="Field Map" 
            titleStyle={styles.cardTitle}
            subtitle={selectedMap === "NDVI" ? "Vegetation Health Index" : "Standard View"}
            subtitleStyle={styles.cardSubtitle}
            left={(props) => (
              <Avatar.Icon 
                {...props} 
                icon="map" 
                style={styles.cardIcon}
                color="#EDF1D6" 
              />
            )}
          />
          <Divider />
          <Card.Content style={styles.mapCardContent}>
            {renderMap()}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button 
            mode="contained" 
            icon="drone" 
            onPress={() => {}} 
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Launch Drone
          </Button>
          
          <Button 
            mode="contained" 
            icon="spray" 
            onPress={() => {}} 
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Apply Pesticides
          </Button>
        </View>

        {/* Help Section */}
        <Card style={styles.helpCard}>
          <Card.Content style={styles.helpContent}>
            <MaterialCommunityIcons name="help-circle-outline" size={28} color="#40513B" />
            <Text style={styles.helpText}>Need help understanding the map?</Text>
          </Card.Content>
          <Card.Actions style={styles.helpActions}>
            <Button 
              mode="text" 
              onPress={() => {}} 
              style={{marginRight: 8}}
              labelStyle={{color: "#609966"}}
            >
              View Guide
            </Button>
            <Button 
              mode="text" 
              onPress={() => {}} 
              labelStyle={{color: "#609966"}}
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
    justifyContent: "space-between"
  },
  logo: {
    backgroundColor: "transparent",
    marginRight: 8,
  },
  appbarTitle: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: "#EDF1D6",
  },
  appbarSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#EDF1D6",
    opacity: 0.8,
  },
  statusCard: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: "#40513B",
  },
  cardSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#609966",
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
    marginBottom: 12,
  },
  statusText: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: "#333333",
    marginLeft: 12,
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
    height: screenWidth * 0.8, // Adjusted to be proportional to screen width
    backgroundColor: "#F5F5F5",
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
    right: 16,
    maxWidth: "40%",
  },
  legendTitle: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#40513B",
    marginBottom: 4,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#40513B",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#40513B",
    borderRadius: 8,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontFamily: "MontserratBold",
    fontSize: 13,
    color: "#fff"
  },
  helpCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
  },
  helpContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  helpText: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: "#40513B",
    marginLeft: 12,
  },
  helpActions: {
    justifyContent: "flex-end",
    paddingTop: 0,
  }
});

export default HomeScreen;