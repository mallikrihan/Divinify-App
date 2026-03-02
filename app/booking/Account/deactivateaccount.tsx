import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const reasons = [
  { id: "break", text: "Taking a temporary break" },
  { id: "busy", text: "Too busy with other commitments" },
  { id: "bookings", text: "Not receiving enough bookings" },
  { id: "tech", text: "Technical or app issues" },
  { id: "other", text: "Other reason" },
];

const DeactivateAccountScreen = () => {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const DESTRUCTIVE_RED = "#EF4444";
  const handleDeactivate = () => {
    Alert.alert(
      "Confirm Deactivation",
      "Are you sure you want to deactivate? Your profile will be hidden until you log back in.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: async () => {
            try {
              // 1. Perform your Supabase/Backend logout here
              // await supabase.auth.signOut();

              // 2. Redirect to Login Screen
              // Use .replace so they can't go 'back' into the app
              router.replace("/(auth)/login");
            } catch (error) {
              Alert.alert("Error", "Could not deactivate at this time.");
            }
          },
        },
      ],
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 1. Header Section */}
        <View style={[styles.header, { backgroundColor: DESTRUCTIVE_RED }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTopTitle}>Deactivate Account</Text>

          <View style={styles.headerIconCircle}>
            <Ionicons name="person-remove" size={35} color="white" />
          </View>
          <Text style={styles.headerMainTitle}>We are Sorry to See You Go</Text>
          <Text style={styles.headerSubText}>
            Your account will be temporarily disabled. You can reactivate
            anytime.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerPadding}>
            {/* 2. Impact Card */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.warningIconBg}>
                  <Ionicons name="alert-circle" size={18} color="#B45309" />
                </View>
                <Text style={styles.cardTitle}>
                  What Happens When You Deactivate?
                </Text>
              </View>
              <Text style={styles.cardDescription}>
                Understanding the impact of temporarily disabling your account.
              </Text>

              <View style={styles.infoRow}>
                <Ionicons
                  name="eye-off-outline"
                  size={18}
                  color={DESTRUCTIVE_RED}
                />
                <Text style={styles.infoText}>
                  Profile Hidden: Your profile will be hidden from users.
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="pause-circle-outline"
                  size={18}
                  color={DESTRUCTIVE_RED}
                />
                <Text style={styles.infoText}>
                  Bookings Paused: You wont receive new requests.
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={DESTRUCTIVE_RED}
                />
                <Text style={styles.infoText}>
                  Data Preserved: Reviews and history remain safe.
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="refresh-outline"
                  size={18}
                  color={DESTRUCTIVE_RED}
                />
                <Text style={styles.infoText}>
                  Easy Reactivation: Simply log back in to restore.
                </Text>
              </View>
            </View>

            {/* 3. Active Bookings Notice (Yellow Card) */}
            <View style={styles.noticeCard}>
              <View style={styles.noticeHeader}>
                <View style={styles.clockIconBg}>
                  <Ionicons name="time" size={14} color="white" />
                </View>
                <Text style={styles.noticeTitle}>Active Bookings Notice</Text>
              </View>
              <Text style={styles.noticeSubText}>
                You have 2 upcoming bookings scheduled
              </Text>

              <View style={styles.bookingItem}>
                <View>
                  <Text style={styles.bookingName}>Nikah Ceremony</Text>
                  <Text style={styles.bookingMeta}>
                    Tomorrow, 10:00 AM • Ahmed Khan
                  </Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Confirmed</Text>
                </View>
              </View>

              <View style={styles.bookingItem}>
                <View>
                  <Text style={styles.bookingName}>Quran Khani</Text>
                  <Text style={styles.bookingMeta}>
                    Dec 28, 2:00 PM • Fatima Ali
                  </Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Confirmed</Text>
                </View>
              </View>

              <Text style={styles.noticeFooter}>
                Please complete these bookings before deactivating.
              </Text>
            </View>

            {/* 4. Reasons Selection */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Help Us Improve (Optional)</Text>
              {reasons.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.reasonRow}
                  onPress={() => setSelectedReason(r.id)}
                >
                  <View
                    style={[
                      styles.radio,
                      selectedReason === r.id && {
                        borderColor: DESTRUCTIVE_RED,
                      },
                    ]}
                  >
                    {selectedReason === r.id && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: DESTRUCTIVE_RED },
                        ]}
                      />
                    )}
                  </View>
                  <Text style={styles.reasonText}>{r.text}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 5. Confirmation & Buttons */}
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setAgreed(!agreed)}
            >
              <View
                style={[
                  styles.checkbox,
                  agreed && {
                    backgroundColor: DESTRUCTIVE_RED,
                    borderColor: DESTRUCTIVE_RED,
                  },
                ]}
              >
                {agreed && (
                  <Ionicons name="checkmark" size={12} color="white" />
                )}
              </View>
              <Text style={styles.checkText}>
                I understand that my account will be temporarily disabled.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnMain,
                {
                  backgroundColor:
                    agreed && selectedReason ? DESTRUCTIVE_RED : "#FECACA",
                },
              ]}
              onPress={handleDeactivate} // Add this line
              disabled={!agreed || !selectedReason}
            >
              <Ionicons
                name="person-remove-outline"
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.btnMainText}>Deactivate My Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => router.back()}
            >
              <Text style={styles.btnCancelText}>✕ Cancel</Text>
            </TouchableOpacity>

            {/* 6. Support Card */}
            <View style={styles.supportCard}>
              <View style={styles.headsetBg}>
                <Ionicons name="headset" size={24} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.supportTitle}>Need Help?</Text>
                <Text style={styles.supportSub}>
                  If you are facing issues, our support team is here.
                </Text>
                <TouchableOpacity>
                  <Text style={styles.supportLink}>Contact Support</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 50 }} />
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
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  headerTopTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerIconCircle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  headerMainTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubText: {
    color: "white",
    opacity: 0.8,
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    paddingHorizontal: 20,
  },
  scrollContent: { flex: 1, marginTop: -30 },
  innerPadding: { paddingHorizontal: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  warningIconBg: {
    backgroundColor: "#FEF3C7",
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#1E293B" },
  cardDescription: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 15,
    marginLeft: 35,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 5,
  },
  infoText: { marginLeft: 12, fontSize: 13, color: "#475569" },
  noticeCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  noticeHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  clockIconBg: {
    backgroundColor: "#F59E0B",
    padding: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  noticeTitle: { fontSize: 14, fontWeight: "bold", color: "#92400E" },
  noticeSubText: {
    fontSize: 12,
    color: "#B45309",
    marginBottom: 15,
    marginLeft: 28,
  },
  bookingItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bookingName: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },
  bookingMeta: { fontSize: 11, color: "#64748B", marginTop: 2 },
  badge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { color: "#166534", fontSize: 10, fontWeight: "bold" },
  noticeFooter: {
    fontSize: 11,
    color: "#92400E",
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  reasonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  radio: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: { height: 8, width: 8, borderRadius: 4 },
  reasonText: { color: "#334155", fontSize: 13 },
  checkRow: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkText: { flex: 1, fontSize: 12, color: "#64748B" },
  btnMain: {
    height: 55,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  btnMainText: { color: "white", fontWeight: "bold", fontSize: 16 },
  btnCancel: {
    height: 55,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btnCancelText: { color: "#64748B", fontWeight: "600" },
  supportCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headsetBg: {
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
  },
  supportTitle: { fontSize: 14, fontWeight: "bold", color: "#1E40AF" },
  supportSub: { fontSize: 12, color: "#3B82F6", marginTop: 2 },
  supportLink: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 8,
  },
});

export default DeactivateAccountScreen;
