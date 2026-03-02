import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import tab components
import AllTab from "@/components/cards/AllTab";
import Bookings from "../(provider-tabs)/bookings";
import Payments from "../../components/cards/PaymentScreen";
import System from "../../components/cards/ServiceCard";

export default function Notification() {
  const { religion } = useReligion();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#0E9F6E"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const renderTabContent = () => {
    switch (activeTab) {
      case "Bookings":
        return <Bookings themeColor={themeColor} />;
      case "Payments":
        return <Payments themeColor={themeColor} />;
      case "System":
        return <System themeColor={themeColor} />;
      default:
        return <AllTab themeColor={themeColor} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <SafeAreaView>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity style={styles.markBtn}>
              <Text style={styles.markText}>Mark All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSub}>
            <View>
              <Text style={styles.whiteSub}>
                Stay updated with your bookings
              </Text>
              <Text style={styles.unreadCount}>3 unread notifications</Text>
            </View>
            <View style={styles.bellBadge}>
              <Ionicons name="notifications-outline" size={20} color="white" />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.tabWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {["All", "Bookings", "Payments", "System"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: themeColor },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? "white" : "#666" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  markBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  markText: { color: "white", fontSize: 12 },
  headerSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  whiteSub: { color: "white", fontSize: 14, opacity: 0.9 },
  unreadCount: { color: "white", fontSize: 12, opacity: 0.7 },
  bellBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 25,
  },
  tabWrapper: { marginVertical: 15 },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "white",
  },
  tabText: { fontWeight: "600", fontSize: 14 },
  tabContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
