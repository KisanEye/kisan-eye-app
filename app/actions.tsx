import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Text, Button, Avatar, Card, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const ActionCard = ({ title, description, icon, buttonText, onPress, color }) => {
  return (
    <Card style={styles.actionCard} elevation={2}>
      <Card.Content style={styles.actionCardContent}>
        <View style={[styles.iconContainer, { backgroundColor: color + "30" }]}>
          <MaterialCommunityIcons name={icon} size={56} color={color} />
        </View>
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDescription}>{description}</Text>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={onPress}
          style={[styles.actionButton, { backgroundColor: color }]}
          labelStyle={styles.actionButtonLabel}
          contentStyle={styles.actionButtonContent}
        >
          {buttonText}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const ActionsScreen = () => {
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
            <Text style={styles.subtitle}>فارم مینیجمنٹ</Text>
          </View>
        </View>
      </Surface>

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>مطلوبہ عمل کا انتخاب کریں</Text>

        <ActionCard
          title="ڈرون سروے شروع کریں"
          description="کھیتوں کی صحت کی تفصیلات حاصل کرنے کے لئے ڈرون بھیجیں"
          icon="drone"
          buttonText="ڈرون روانہ کریں"
          onPress={() => {}}
          color="#4CAF50"
        />

        <ActionCard
          title="کیڑے مار دوا کا چھڑکاؤ"
          description="چنیدہ مقامات پر کیڑے مار دوا کا چھڑکاؤ کریں"
          icon="spray"
          buttonText="چھڑکاؤ شروع کریں"
          onPress={() => {}}
          color="#FF9800"
        />
      </ScrollView>
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
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "transparent",
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 28,
    color: "#FFFFFF",
    textAlign: "right",
  },
  subtitle: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#E0F2C3",
    textAlign: "right",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 24,
    color: "#2E5E3E",
    marginBottom: 24,
    textAlign: "right",
  },
  actionCard: {
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  actionCardContent: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  actionTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actionTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 22,
    color: "#333333",
    marginBottom: 8,
    textAlign: "right",
  },
  actionDescription: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    color: "#666666",
    textAlign: "right",
  },
  actionButtons: {
    justifyContent: "flex-end",
    padding: 16,
  },
  actionButton: {
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  actionButtonContent: {
    height: 56,
  },
  actionButtonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default ActionsScreen;