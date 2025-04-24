// screens/HomeScreen.tsx
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
            <Text style={styles.legendTitle}>صحت کی علامت:</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ff0000' }]} />
              <Text style={styles.legendText}>خراب حالت</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#ffff00' }]} />
              <Text style={styles.legendText}>متوسط حالت</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, { backgroundColor: '#00ff00' }]} />
              <Text style={styles.legendText}>اچھی حالت</Text>
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
          title="کسان آئی" 
          titleStyle={styles.appbarTitle} 
          subtitle="کھیتوں کی صحت مانیٹر"
          subtitleStyle={styles.appbarSubtitle}
        />
        <BatteryStatus batteryPercentage={batteryPercentage} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Farm Status Overview with Visual Indicators */}
        <Card style={styles.statusCard}>
          <Card.Title 
            title="کھیت کی صحت کی حالت" 
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
                <Text style={styles.statusLabel}>نمی:</Text>
                <Text style={styles.statusValue}>اچھی</Text>
              </View>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="white-balance-sunny" size={32} color="#609966" />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>سورج کی روشنی:</Text>
                <Text style={styles.statusValue}>مناسب</Text>
              </View>
            </View>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons name="bug" size={32} color="#609966" />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusLabel}>کیڑے کا خطرہ:</Text>
                <Text style={styles.statusValue}>کم</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Map Selector Component */}
        <MapSelector selectedMap={selectedMap} onMapChange={handleMapChange} />

        {/* Map Display with Zoom Controls */}
        <Card style={styles.mapCard}>
          <Card.Title 
            title="میدانی نقشہ" 
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
              {selectedMap === "NDVI" ? "سبزیاں کی صحت کی حالت" : "معیاری نظارہ"}
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
            ڈرون روانہ کریں
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
            کیڑے مار دوا لگائیں
          </Button>
        </View>

        {/* Help Section with Voice Support Hint */}
        <Card style={styles.helpCard}>
          <Card.Content style={styles.helpContent}>
            <MaterialCommunityIcons name="help-circle-outline" size={36} color="#40513B" />
            <Text style={styles.helpText}>نقشہ کو سمجھنے میں مدد چاہیے؟</Text>
          </Card.Content>
          <Card.Actions style={styles.helpActions}>
            <Button 
              mode="contained"
              icon="play-circle-outline" 
              onPress={() => {}} 
              style={styles.helpButton}
              labelStyle={styles.helpButtonLabel}
            >
              آواز سے رہنمائی
            </Button>
            <Button 
              mode="contained"
              icon="phone" 
              onPress={() => {}} 
              style={styles.helpButton}
              labelStyle={styles.helpButtonLabel}
            >
              سپورٹ سے رابطہ
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
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 24, // Increased font size
    color: "#EDF1D6",
    textAlign: "right",
    marginVertical: 4,
    lineHeight: 32,
  },
  appbarSubtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14, // Increased font size
    color: "#EDF1D6",
    opacity: 0.8,
    textAlign: "right",
  },
  statusCard: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 20, // Increased font size
    color: "#000000", // Changed to black for better readability
    textAlign: "right",
    marginVertical: 4,
    lineHeight: 32,
  },
  mapSubtitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 8,
  },
  mapSubtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#609966",
    textAlign: "right",
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
    justifyContent: "flex-end", // Right align for RTL
    marginBottom: 16,
    paddingVertical: 4,
  },
  statusTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12, // Adjusted for RTL
  },
  statusLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18, // Increased font size
    color: "#000000", // Changed to black
    marginRight: 8,
  },
  statusValue: {
    fontFamily: "NotoNastaliqUrdu-Regular",
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
    right: 16,
    maxWidth: "50%", // Increased width for text
  },
  legendTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 16, // Increased font size
    color: "#000000", // Changed to black
    marginBottom: 8,
    textAlign: "right",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Right align for RTL
    marginTop: 4,
  },
  legendColor: {
    width: 20, // Slightly larger
    height: 20, // Slightly larger
    borderRadius: 4,
    marginLeft: 8, // Adjusted for RTL
  },
  legendText: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14, // Increased font size
    color: "#000000", // Changed to black
    textAlign: "right",
  },
  zoomControlsContainer: {
    position: "absolute",
    left: 16,
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
    flexDirection: "row-reverse", // Icon on the left for RTL
  },
  buttonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 16, // Increased font size
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
    justifyContent: "flex-end", // Right align for RTL
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  helpText: {
    fontFamily: "NotoNastaliqUrdu-SemiBold",
    fontSize: 20, // Increased font size
    color: "#000000", // Changed to black
    marginRight: 12, // Adjusted for RTL
    textAlign: "right",
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
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 14,
    color: "#FFFFFF",
  }
});

export default HomeScreen;