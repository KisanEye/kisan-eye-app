import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text, Avatar, Card, Surface, Button, Divider, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HelpCard = ({ title, icon, description, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={styles.helpCard} elevation={2}>
      <TouchableOpacity 
        onPress={() => setExpanded(!expanded)}
        style={styles.helpCardHeader}
      >
        <View style={styles.helpCardTitleContainer}>
          <Text style={styles.helpCardTitle}>{title}</Text>
          <IconButton
            icon={expanded ? "chevron-up" : "chevron-down"}
            size={28}
            iconColor="#2E5E3E"
            onPress={() => setExpanded(!expanded)}
          />
        </View>
        <View style={styles.helpCardIconContainer}>
          <MaterialCommunityIcons name={icon} size={32} color="#2E5E3E" />
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <>
          <Divider style={styles.divider} />
          <Card.Content style={styles.helpCardContent}>
            <Text style={styles.helpCardDescription}>{description}</Text>
            <Button 
              mode="contained" 
              style={styles.helpButton}
              labelStyle={styles.helpButtonLabel}
              onPress={onPress}
            >
              مزید معلومات
            </Button>
          </Card.Content>
        </>
      )}
    </Card>
  );
};

const ContactCard = () => {
  return (
    <Card style={styles.helpCard} elevation={2}>
      <Card.Content style={styles.contactCardContent}>
        <View style={styles.contactIconContainer}>
          <MaterialCommunityIcons name="headset" size={48} color="#2E5E3E" />
        </View>
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactTitle}>سپورٹ ٹیم سے رابطہ کریں</Text>
          <Text style={styles.contactDescription}>
            ہماری ٹیم آپ کی مدد کے لیے دستیاب ہے
          </Text>
          <View style={styles.contactButtons}>
            <Button 
              mode="contained" 
              icon="phone"
              style={styles.contactButton}
              labelStyle={styles.contactButtonLabel}
              onPress={() => {}}
            >
              کال کریں
            </Button>
            <Button 
              mode="contained" 
              icon="message-text"
              style={[styles.contactButton, {backgroundColor: "#4CAF50"}]}
              labelStyle={styles.contactButtonLabel}
              onPress={() => {}}
            >
              پیغام بھیجیں
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const HelpScreen = () => {
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
            <Text style={styles.subtitle}>مدد اور رہنمائی</Text>
          </View>
        </View>
      </Surface>

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>مدد کے اختیارات</Text>
        
        <HelpCard 
          title="نقشہ کو کیسے سمجھیں؟"
          icon="map-legend"
          description="نقشہ پر مختلف رنگ آپ کے کھیت کی صحت کی علامت ہیں۔ سبز رنگ صحت مند علاقہ، پیلا رنگ ہلکی مسئلہ، اور سرخ رنگ فوری توجہ کی ضرورت کی علامت ہے۔"
          onPress={() => {}}
        />
        
        <HelpCard 
          title="ڈرون کو کیسے بھیجیں؟"
          icon="drone"
          description="'عمل' والے صفحہ پر جاکر 'ڈرون روانہ کریں' کا بٹن دبائیں۔ ڈرون خود بخود پورے کھیت کی سروے کرے گا اور آپ کو نتائج دکھائے گا۔"
          onPress={() => {}}
        />
        
        <ContactCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 22,
    color: "#000000",
    marginBottom: 16,
    textAlign: "right",
  },
  helpCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F9F9F9",
  },
  helpCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  helpCardTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  helpCardTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18,
    color: "#000000",
    marginRight: 8,
    textAlign: "right",
  },
  helpCardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  helpCardContent: {
    padding: 16,
    alignItems: "flex-end",
  },
  helpCardDescription: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#333333",
    textAlign: "right",
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: "#2E5E3E",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  helpButtonLabel: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 16,
  },
  contactCardContent: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  contactIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  contactTextContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  contactTitle: {
    fontFamily: "NotoNastaliqUrdu-Bold",
    fontSize: 18,
    color: "#000000",
    marginBottom: 8,
    textAlign: "right",
  },
  contactDescription: {
    fontFamily: "NotoNastaliqUrdu-Regular",
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
    textAlign: "right",
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contactButton: {
    marginLeft: 12,
    borderRadius: 12,
    backgroundColor: "#2196F3",
  },
  contactButtonLabel: {
    fontFamily: "NotoNastaliqUrdu-Medium",
    fontSize: 14,
  },
});

export default HelpScreen;