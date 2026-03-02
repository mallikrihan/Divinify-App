import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LogoutScreen = () => {
  const { religion } = useReligion(); // Get religion from context
  const router = useRouter();

  // Dynamic Theme Color Logic based on actual religion from context
  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981" // Green
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B" // Orange/Gold
        : "#3B82F6"; // Blue (Default/Christian/Other)

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Logout",
        style: "destructive",
        onPress: async () => {
          // Add your auth logic here
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 1. Dynamic Header based on Religion */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Logout</Text>

          <View style={styles.headerIconCircle}>
            <Ionicons name="log-out" size={40} color="white" />
          </View>
          <Text style={styles.headerMainTitle}>Come Back Soon</Text>
          <Text style={styles.headerSubText}>
            We hope to serve you again. May peace be with you.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.questionIconBg}>
                <Ionicons name="help" size={20} color="#B45309" />
              </View>
              <Text style={styles.cardTitle}>Are You Sure?</Text>
              <Text style={styles.cardSubText}>
                You will be logged out of your account and returned to the login
                screen.
              </Text>

              {/* 3. Data Safety Info */}
              <View style={styles.infoBox}>
                <View style={styles.infoBoxHeader}>
                  <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
                  <Text style={styles.infoBoxTitle}>Your Data is Safe</Text>
                </View>
                <Text style={styles.infoBoxDesc}>
                  All your information and bookings will be securely saved.
                </Text>

                <View style={styles.checkRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.checkText}>
                    Profile & account details preserved
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.checkText}>
                    Booking history & reviews saved
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.checkText}>
                    Services & availability retained
                  </Text>
                </View>
                <View style={styles.checkRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.checkText}>
                    Easy login anytime you return
                  </Text>
                </View>
              </View>
              <View style={styles.orangeCard}>
                <View style={styles.orangeIconBg}>
                  <Ionicons name="notifications" size={18} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orangeTitle}>Active Sessions</Text>
                  <Text style={styles.orangeSubText}>
                    Logging out will end your session on this device. you will
                    need to login to access your account.
                  </Text>
                  <View style={styles.deviceRow}>
                    <Ionicons name="phone-portrait" size={14} color="#B45309" />
                    <Text style={styles.deviceText}>
                      Current Device: Mobile App
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 2. Quick Actions Section */}
            <Text style={styles.sectionHeading}>Before You Go...</Text>

            {/* View Bookings Card */}
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(provider-tabs)/bookings")}
            >
              <View
                style={[styles.iconBox, { backgroundColor: `${themeColor}20` }]}
              >
                <Ionicons name="calendar" size={20} color={themeColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>View Bookings</Text>
                <Text style={styles.actionSub}>Check upcoming services</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>
            {/* check earnings */}
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/booking/ProfileEdit")}
            >
              <View
                style={[styles.iconBox, { backgroundColor: `${themeColor}20` }]}
              >
                <Ionicons name="wallet-outline" size={20} color={themeColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Check Earnings</Text>
                <Text style={styles.actionSub}>Review your income</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>
            {/* Update Profile Card */}
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/booking/ProfileEdit")}
            >
              <View
                style={[styles.iconBox, { backgroundColor: `${themeColor}20` }]}
              >
                <Ionicons name="person" size={20} color={themeColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Update Profile</Text>
                <Text style={styles.actionSub}>Edit your information</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            {/* 3. Action Buttons */}
            <TouchableOpacity
              style={[styles.btnMain, { backgroundColor: "#EF4444" }]}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.btnMainText}>Yes, Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => router.back()}
            >
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* 4. Contact Support Card */}
            <TouchableOpacity
              style={styles.supportBox}
              onPress={() => router.push("/booking/help")}
            >
              <View
                style={[
                  styles.supportIconBg,
                  { backgroundColor: `${themeColor}20` },
                ]}
              >
                <Ionicons name="headset" size={20} color={themeColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.supportTitle, { color: themeColor }]}>
                  Need Assistance?
                </Text>
                <Text style={styles.supportSub}>
                  Our support team is available 24/7. to help you with any
                  questions or concerns
                </Text>
                <TouchableOpacity onPress={() => router.push("/booking/help")}>
                  <Text style={[styles.supportLink, { color: themeColor }]}>
                    Contact Support →
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 30,
    paddingTop: 40,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIconCircle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 25,
    marginVertical: 15,
  },
  headerMainTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubText: {
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
    marginTop: -30,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
    bottom: 10,
  },
  questionIconBg: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  cardSubText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748B",
    marginTop: 8,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
    marginTop: 5,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  iconBox: {
    padding: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  actionTitle: {
    fontWeight: "bold",
    color: "#1E293B",
    fontSize: 14,
  },
  actionSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  btnMain: {
    height: 55,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnMainText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnCancel: {
    height: 55,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btnCancelText: {
    color: "#64748B",
    fontWeight: "600",
  },
  supportBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  supportIconBg: {
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  supportSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  supportLink: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 20,
    top: -1,
  },
  infoBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoBoxTitle: { marginLeft: 10, fontWeight: "bold", color: "#1E40AF" },
  infoBoxDesc: {
    fontSize: 12,
    color: "#3B82F6",
    marginBottom: 12,
    marginLeft: 30,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 5,
  },
  checkText: { marginLeft: 10, fontSize: 12, color: "#475569" },
  orangeCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FEF3C7",
    bottom: -20,
  },
  orangeIconBg: {
    backgroundColor: "#F59E0B",
    padding: 8,
    borderRadius: 12,
    marginRight: 15,
    height: 35,
  },
  orangeTitle: { fontWeight: "bold", color: "#92400E" },
  orangeSubText: { fontSize: 12, color: "#B45309", marginTop: 2 },
  deviceRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  deviceText: {
    fontSize: 11,
    color: "#B45309",
    marginLeft: 6,
    fontWeight: "600",
  },
});

export default LogoutScreen;
