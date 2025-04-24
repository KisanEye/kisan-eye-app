import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Image } from "react-native";
import { Text, Button, Avatar, Card, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();

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
            <Text style={styles.subtitle}>کھیتوں کی صحت کا محافظ</Text>
          </View>
        </View>
      </Surface>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Farm Status Card */}
        <Card style={styles.statusCard}>
          <Card.Content style={styles.statusCardContent}>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>آپ کے کھیت کی حالت</Text>
              <Text style={styles.statusValue}>اچھی</Text>
            </View>
            <View style={styles.statusIconContainer}>
              <MaterialCommunityIcons name="leaf" size={64} color="#4CAF50" />
            </View>
          </Card.Content>
          <Card.Content style={styles.lastUpdatedContainer}>
            <MaterialCommunityIcons name="clock-outline" size={18} color="#666" />
            <Text style={styles.lastUpdatedText}>آخری اپڈیٹ: آج، صبح 6:30 بجے</Text>
          </Card.Content>
        </Card>

        {/* Menu Options */}
        <View style={styles.buttonsGrid}>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              icon={({size, color}) => (
                <MaterialCommunityIcons name="map" size={28} color={color} />
              )}
              contentStyle={styles.buttonContent}
              onPress={() => router.push("/map")}
              style={styles.menuButton}
              labelStyle={styles.buttonLabel}
            >
              نقشہ دیکھیں
            </Button>
            
            <Button
              mode="contained"
              icon={({size, color}) => (
                <MaterialCommunityIcons name="clipboard-text" size={28} color={color} />
              )}
              contentStyle={styles.buttonContent}
              onPress={() => router.push("/status")}
              style={styles.menuButton}
              labelStyle={styles.buttonLabel}
            >
              حالت چیک کریں
            </Button>
          </View>
          
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              icon={({size, color}) => (
                <MaterialCommunityIcons name="cog" size={28} color={color} />
              )}
              contentStyle={styles.buttonContent}
              onPress={() => router.push("/actions")}
              style={styles.menuButton}
              labelStyle={styles.buttonLabel}
            >
              عمل کریں
            </Button>
            
            <Button
              mode="contained"
              icon={({size, color}) => (
                <MaterialCommunityIcons name="help-circle" size={28} color={color} />
              )}
              contentStyle={styles.buttonContent}
              onPress={() => router.push("/help")}
              style={styles.menuButton}
              labelStyle={styles.buttonLabel}
            >
              مدد حاصل کریں
            </Button>
          </View>
        </View>

        {/* Bottom Image */}
        <View style={styles.bottomImageContainer}>
          <Image 
            source={require("../assets/images/farm2.jpg")} 
            style={styles.bottomImage}
            resizeMode="cover"
          />
        </View>
      </View>
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
    textAlign: "right"
  },
  subtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#E0F2C3",
    textAlign: "right"
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statusCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  statusCardContent: {
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  statusTextContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  statusLabel: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#555555",
    marginBottom: 8,
    textAlign: "right"
  },
  statusValue: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 28,
    color: "#4CAF50",
    textAlign: "right"
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 40,
    marginLeft: 16,
  },
  lastUpdatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
  },
  lastUpdatedText: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14,
    color: "#666666",
    marginRight: 6,
  },
  buttonsGrid: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  menuButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "#4F7D4A",
    elevation: 2,
  },
  buttonContent: {
    height: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18,
    marginTop: 8,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bottomImageContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
  },
  bottomImage: {
    width: "100%",
    height: "100%",
  }
});

export default HomeScreen;