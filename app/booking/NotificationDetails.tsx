import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationDetails() {
  const { religion } = useReligion();
  const router = useRouter();
  const params = useLocalSearchParams();

  const themeColor = (params.themeColor as string) || "#0E9F6E";

  const handleAccept = () => {
    Alert.alert(
      "Accept Booking",
      "Are you sure you want to accept this booking request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            Alert.alert("Success", "Booking request accepted successfully!");
            router.replace("/home");
          },
          style: "default",
        },
      ],
    );
  };

  const handleDecline = () => {
    Alert.alert(
      "Decline Booking",
      "Are you sure you want to decline this booking request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Decline",
          onPress: () => {
            Alert.alert("Declined", "Booking request has been declined.");
            router.replace("/home");
          },
          style: "destructive",
        },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert("Deleted", "Notification has been deleted.");
            router.back();
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <SafeAreaView>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notification Details</Text>
            <TouchableOpacity onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.statusIcon, { backgroundColor: themeColor }]}>
            <Ionicons name="calendar-outline" size={30} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.badgeRow}>
              <View
                style={[styles.badge, { backgroundColor: themeColor + "20" }]}
              >
                <Text
                  style={{
                    color: themeColor,
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  New Booking
                </Text>
              </View>
              <View style={[styles.dot, { backgroundColor: themeColor }]} />
            </View>
            <Text style={styles.mainTitle}>New Booking Request</Text>
            <Text style={styles.mainTime}>
              5 minutes ago • March 18, 2024 at 2:45 PM
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <SectionHeader
          icon="person-outline"
          title="Customer Information"
          color={themeColor}
        />
        <View style={styles.infoCard}>
          <View style={styles.custRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={25} color="#CCC" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.custName}>Sarah Ahmed</Text>
              <Text style={styles.custStatus}>New Customer</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call" size={20} color={themeColor} />
            </TouchableOpacity>
          </View>
          <InfoItem
            icon="mail-outline"
            label="Email"
            value="sarah.ahmed@email.com"
          />
          <InfoItem
            icon="call-outline"
            label="Phone"
            value="+1 (555) 123-4567"
          />
        </View>

        {/* Service Details */}
        <SectionHeader
          icon="list-outline"
          title="Service Details"
          color={themeColor}
        />
        <View style={styles.infoCard}>
          <DetailRow label="Service Type" value="Nikah Ceremony" />
          <DetailRow label="Date & Time" value="March 25, 2024 at 2:00 PM" />
          <DetailRow label="Duration" value="2 hours" />
          <DetailRow
            label="Location"
            value="Al-Noor Community Center"
            subValue="123 Main Street, Springfield, IL 62701"
          />
          <View style={styles.divider} />
          <DetailRow
            label="Service Fee"
            value="₹150.00"
            valueStyle={{ color: themeColor, fontWeight: "800", fontSize: 18 }}
          />
        </View>

        {/* Special Instructions */}
        <SectionHeader
          icon="information-circle-outline"
          title="Special Instructions"
          color={themeColor}
        />
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>
            Please arrive 30 minutes early for setup. The ceremony will be
            conducted in both English and Arabic.
          </Text>
        </View>

        {/* Timeline */}
        <SectionHeader
          icon="git-branch-outline"
          title="Booking Timeline"
          color={themeColor}
        />
        <View style={styles.timelineBox}>
          <TimelineItem
            title="Request Received"
            time="Today at 2:45 PM"
            completed
            color={themeColor}
          />
          <TimelineItem
            title="Awaiting Response"
            time="Respond within 24 hours"
            active
            color={themeColor}
          />
          <TimelineItem
            title="Service Date"
            time="Feb 25, 2026"
            isLast
            color={themeColor}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionBtnA, { backgroundColor: themeColor }]}
            onPress={handleAccept}
          >
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={styles.actionTextA}>Accept Booking Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnD} onPress={handleDecline}>
            <Ionicons name="close-circle" size={20} color="#EF4444" />
            <Text style={styles.actionTextD}>Decline Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Sub-components for cleaner code
const SectionHeader = ({ icon, title, color }: any) => (
  <View style={styles.sectionHeader}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const InfoItem = ({ icon, label, value }: any) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={16} color="#9CA3AF" />
    <Text style={styles.infoLabel}>{label}: </Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const DetailRow = ({ label, value, subValue, valueStyle }: any) => (
  <View style={styles.detailRow}>
    <View style={{ flex: 1 }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
      {subValue && <Text style={styles.detailSub}>{subValue}</Text>}
    </View>
  </View>
);

const TimelineItem = ({
  title,
  time,
  completed,
  active,
  isLast,
  color,
}: any) => (
  <View style={styles.tItem}>
    <View style={styles.tLineWrapper}>
      <View
        style={[
          styles.tDot,
          completed && { backgroundColor: color },
          active && {
            borderWidth: 2,
            borderColor: color,
            backgroundColor: "white",
          },
        ]}
      />
      {!isLast && <View style={styles.tLine} />}
    </View>
    <View style={styles.tContent}>
      <Text
        style={[styles.tTitle, (completed || active) && { color: "#1A1A1A" }]}
      >
        {title}
      </Text>
      <Text style={styles.tTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { paddingBottom: 40 },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  scrollContent: { paddingHorizontal: 16, marginTop: -30, paddingBottom: 40 },
  statusCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 8,
  },
  mainTitle: { fontSize: 18, fontWeight: "800", color: "#1A1A1A" },
  mainTime: { fontSize: 11, color: "#9CA3AF" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },
  sectionText: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#1A1A1A",
    fontSize: 15,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  custRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  custName: { fontWeight: "700", fontSize: 16 },
  custStatus: { fontSize: 12, color: "#9CA3AF" },
  callBtn: { padding: 8, backgroundColor: "#F3F4F6", borderRadius: 10 },
  infoItem: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  infoLabel: { marginLeft: 10, fontSize: 13, color: "#6B7280" },
  infoValue: { fontSize: 13, fontWeight: "600", color: "#1A1A1A" },
  detailRow: { marginBottom: 12 },
  detailLabel: { fontSize: 12, color: "#9CA3AF", marginBottom: 2 },
  detailValue: { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
  detailSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 10 },
  instructionBox: {
    backgroundColor: "#EBF5FF",
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  instructionText: { fontSize: 13, color: "#1E40AF", lineHeight: 20 },
  timelineBox: { paddingLeft: 10 },
  tItem: { flexDirection: "row", marginBottom: 8 },
  tLineWrapper: { alignItems: "center", marginRight: 15, position: "relative" },
  tDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#E5E7EB" },
  tLine: { width: 2, height: 40, backgroundColor: "#E5E7EB", marginTop: 2 },
  tContent: { paddingTop: 0, flex: 1 },
  tTitle: { fontSize: 14, fontWeight: "700", color: "#9CA3AF" },
  tTime: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  actionButtonsContainer: { marginTop: 30, marginBottom: 20 },
  actionBtnA: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
  },
  actionBtnD: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    backgroundColor: "white",
  },
  actionTextA: { color: "white", fontWeight: "bold", marginLeft: 10 },
  actionTextD: { color: "#EF4444", fontWeight: "bold", marginLeft: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
