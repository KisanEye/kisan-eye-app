import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Text, Avatar, Surface, Card, ProgressBar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import BatteryStatus from "../components/BatteryStatus";

const StatusItem = ({ icon, title, value, status, color }) => {
  return (
    <View style={styles.statusItem}>
      <View style={styles.statusTextContainer}>
        <Text style={styles.statusItemValue}>{value}</Text>
        <Text style={styles.statusItemTitle}>{title}</Text>
        <Text style={[styles.statusItemStatus, { color }]}>{status}</Text>
      </View>
      <View style={[styles.statusIconContainer, { backgroundColor: color + "15" }]}>
        <MaterialCommunityIcons name={icon} size={40} color={color} />
      </View>
    </View>
  );
};

const StatusScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerContent}>
          <Avatar.Image
            size={60}
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>کسان آئی</Text>
            <Text style={styles.subtitle}>کھیت کی تفصیلی حالت</Text>
          </View>
        </View>
      </Surface>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Summary Card */}
        <Card style={styles.summaryCard} elevation={2}>
          <Card.Content style={styles.summaryContent}>
            <View style={styles.summaryIconContainer}>
              <MaterialCommunityIcons name="leaf" size={56} color="#4CAF50" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryTitle}>مجموعی صحت کی حالت</Text>
              <Text style={styles.summaryValue}>84%</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={0.84} color="#4CAF50" style={styles.progressBar} />
              </View>
              <Text style={styles.summaryDescription}>آپ کی فصل صحت مند ہے</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Status Details */}
        <Text style={styles.sectionTitle}>کھیت کی تفصیلات</Text>
        <Card style={styles.detailsCard} elevation={2}>
          <Card.Content style={styles.detailsCardContent}>
            <StatusItem
              icon="water"
              title="نمی کی سطح"
              value="78%"
              status="مناسب سطح"
              color="#2196F3"
            />
            <Divider style={styles.divider} />
            <StatusItem
              icon="white-balance-sunny"
              title="سورج کی روشنی"
              value="68%"
              status="مناسب سطح"
              color="#FF9800"
            />
            <Divider style={styles.divider} />
            <StatusItem
              icon="nutrition"
              title="غذائی صحت"
              value="92%"
              status="اچھی حالت"
              color="#4CAF50"
            />
            <Divider style={styles.divider} />
            <StatusItem
              icon="bug"
              title="کیڑوں کا خطرہ"
              value="12%"
              status="کم خطرہ"
              color="#8BC34A"
            />
            <Divider style={styles.divider} />
            <StatusItem
              icon="molecule"
              title="زمین کی صحت"
              value="76%"
              status="مناسب حالت"
              color="#795548"
            />
          </Card.Content>
        </Card>

        {/* Drone Status */}
        <Text style={styles.sectionTitle}>ڈرون کی حالت</Text>
        <Card style={styles.droneCard} elevation={2}>
          <Card.Content>
            <Text style={styles.droneTitle}>ڈرون بیٹری</Text>
            <BatteryStatus batteryPercentage={75} />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#2E5E3E",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 28,
    color: "#EDF1D6",
    textAlign: "right",
  },
  subtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#EDF1D6",
    opacity: 0.8,
    textAlign: "right",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 28,
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  summaryIconContainer: {
    marginRight: 20,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18,
    color: "#40513B",
    marginBottom: 6,
    textAlign: "right",
  },
  summaryValue: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 36,
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "right",
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  summaryDescription: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#40513B",
    textAlign: "right",
  },
  sectionTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 20,
    color: "#40513B",
    marginBottom: 16,
    textAlign: "right",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 28,
  },
  detailsCardContent: {
    padding: 20,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusItemValue: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 28,
    color: "#40513B",
    textAlign: "right",
  },
  statusItemTitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#40513B",
    marginTop: 6,
    textAlign: "right",
  },
  statusItemStatus: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14,
    marginTop: 6,
    textAlign: "right",
  },
  statusIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "#E0E0E0",
  },
  droneCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  droneTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 20,
    color: "#40513B",
    marginBottom: 10,
    textAlign: "right",
  },
});

export default StatusScreen;