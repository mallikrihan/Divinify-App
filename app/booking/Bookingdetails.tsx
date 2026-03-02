import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const mockBookingDetails = {
  id: "BK102",
  status: "pending",
  clientInfo: {
    name: "Fatima Hassan",
    image: "https://i.pravatar.cc/150?u=2",
    phone: "+1 234 567 8900",
    email: "fatima.h@example.com",
    rating: 4.8,
    totalBookings: 12,
  },
  serviceInfo: {
    type: "Quran Recitation",
    category: "Religious Service",
    duration: "1 hour",
    fee: "$50.00",
    location: "Home Service",
    address: "123 Maple Street, Apt 4B, Springfield, IL 62701",
    date: "Friday, Dec 20, 2024",
    time: "5:30 PM - 6:30 PM",
    distance: "1.2 km away",
    instructions:
      "Please bring your own Quran. We prefer recitation of Surah Yaseen and Surah Rahman. Family will be present during the session.",
  },
};

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { religion } = useReligion();
  const { bookingId } = useLocalSearchParams();
  const theme = getTheme(religion);

  const [booking] = useState(mockBookingDetails);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestedTime, setSuggestedTime] = useState("");

  const handleCall = () => {
    Linking.openURL(`tel:${booking.clientInfo.phone}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${booking.clientInfo.phone}`);
  };

  const handleAccept = () => {
    Alert.alert(
      "Accept Booking",
      "Are you sure you want to accept this booking?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: () => {
            router.push({
              pathname: "/booking/ServiceProgress",
              params: {
                bookingId,
                status: "approved",
                clientName: booking.clientInfo.name,
                serviceType: booking.serviceInfo.type,
                address: booking.serviceInfo.address,
                time: booking.serviceInfo.time,
                fee: booking.serviceInfo.fee,
              },
            });
          },
        },
      ],
    );
  };

  const handleDecline = () => {
    setShowDeclineModal(true);
  };

  const confirmDecline = () => {
    setShowDeclineModal(false);
    Alert.alert("Declined", "Booking has been declined", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  const handleSuggestTime = () => {
    if (suggestedTime.trim()) {
      Alert.alert("Time Suggested", `Suggested time: ${suggestedTime}`, [
        {
          text: "OK",
          onPress: () => setShowSuggestModal(false),
        },
      ]);
      setSuggestedTime("");
    }
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.serviceInfo.address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: theme.primary + "20" }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Booking Request</Text>
          <Text style={styles.headerSubtitle}>Pending Approval</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: "#F59E0B20" }]}>
          <Text style={[styles.statusText, { color: "#F59E0B" }]}>Pending</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Client Info Card */}
        <View style={styles.card}>
          <View style={styles.clientHeader}>
            <Image
              source={{ uri: booking.clientInfo.image }}
              style={styles.clientImage}
            />
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{booking.clientInfo.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>
                  {booking.clientInfo.rating} Rating ·{" "}
                  {booking.clientInfo.totalBookings} Bookings
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={handleCall}
            >
              <Ionicons name="call-outline" size={18} color="#3B82F6" />
              <Text style={styles.callBtnText}>Call Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.messageBtn]}
              onPress={() => router.push("/(provider-tabs)/messages")}
            >
              <Ionicons name="chatbubble-outline" size={18} color="#10B981" />
              <Text style={styles.messageBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Type</Text>
            <Text style={styles.detailValue}>{booking.serviceInfo.type}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <View>
              <Text style={styles.detailValue}>{booking.serviceInfo.date}</Text>
              <Text style={styles.detailSubValue}>
                {booking.serviceInfo.time}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.detailValue}>
                {booking.serviceInfo.location}
              </Text>
              <Text style={styles.detailSubValue}>
                {booking.serviceInfo.address}
              </Text>
              <TouchableOpacity onPress={openMaps}>
                <Text style={[styles.mapLink, { color: theme.primary }]}>
                  View on Map →
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Fee</Text>
            <Text style={[styles.feeValue, { color: theme.primary }]}>
              {booking.serviceInfo.fee}
            </Text>
          </View>
        </View>

        {/* Special Instructions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Special Instructions</Text>
          <Text style={styles.instructions}>
            {booking.serviceInfo.instructions}
          </Text>
        </View>

        {/* Important Notes Card */}
        <View style={[styles.card, styles.notesCard]}>
          <Text style={styles.cardTitle}>Important Notes</Text>
          <View style={styles.noteItem}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#6B7280"
            />
            <Text style={styles.noteText}>
              You can cancel up to 2 hours before the service
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#6B7280"
            />
            <Text style={styles.noteText}>
              Payment will be processed after service completion
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#6B7280"
            />
            <Text style={styles.noteText}>
              Client has been verified by Faithful Services
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.bottomBtn, styles.declineBottomBtn]}
          onPress={handleDecline}
        >
          <Text style={styles.declineBottomText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomBtn, styles.suggestBtn]}
          onPress={() => setShowSuggestModal(true)}
        >
          <Text style={styles.suggestBtnText}>Suggest Time</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomBtn,
            styles.acceptBottomBtn,
            { backgroundColor: theme.primary },
          ]}
          onPress={handleAccept}
        >
          <Text style={styles.acceptBottomText}>Accept</Text>
        </TouchableOpacity>
      </View>

      {/* Decline Modal */}
      <Modal visible={showDeclineModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={50} color="#EF4444" />
            <Text style={styles.modalTitle}>Decline Booking?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to decline this booking?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelModalBtn]}
                onPress={() => setShowDeclineModal(false)}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmModalBtn]}
                onPress={confirmDecline}
              >
                <Text style={styles.confirmModalText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Suggest Time Modal */}
      <Modal visible={showSuggestModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="time-outline" size={50} color={theme.primary} />
            <Text style={styles.modalTitle}>Suggest Different Time</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="e.g., Tomorrow 7:00 PM"
              value={suggestedTime}
              onChangeText={setSuggestedTime}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelModalBtn]}
                onPress={() => setShowSuggestModal(false)}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                onPress={handleSuggestTime}
              >
                <Text style={styles.confirmModalText}>Suggest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getTheme(r?: string) {
  const rel = r?.toLowerCase();
  if (rel === "islam") return { primary: "#0E9F6E", label: "Islamic Scholar" };
  if (rel === "hinduism") return { primary: "#F59E0B", label: "Hindu Scholar" };
  if (rel === "christianity")
    return { primary: "#3B82F6", label: "Christian Scholar" };
  return { primary: "#6366F1", label: "Scholar" };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  headerSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: "600" },
  scrollView: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  clientHeader: { flexDirection: "row", alignItems: "center" },
  clientImage: { width: 60, height: 60, borderRadius: 30 },
  clientInfo: { flex: 1, marginLeft: 15 },
  clientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 13, color: "#6B7280", marginLeft: 4 },
  actionButtons: { flexDirection: "row", gap: 10, marginTop: 15 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  callBtn: { borderColor: "#3B82F6", backgroundColor: "#3B82F610" },
  callBtnText: { color: "#3B82F6", fontWeight: "600", marginLeft: 8 },
  messageBtn: { borderColor: "#10B981", backgroundColor: "#10B98110" },
  messageBtnText: { color: "#10B981", fontWeight: "600", marginLeft: 8 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 15,
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
    color: "#6B7280",
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  detailSubValue: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  locationInfo: { flex: 1 },
  mapLink: { fontSize: 13, fontWeight: "600", marginTop: 4 },
  feeValue: { fontSize: 18, fontWeight: "700" },
  instructions: { fontSize: 14, color: "#4B5563", lineHeight: 22 },
  notesCard: { backgroundColor: "#F9FAFB" },
  noteItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  noteText: { fontSize: 13, color: "#6B7280", marginLeft: 10, flex: 1 },
  bottomContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 10,
  },
  bottomBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  declineBottomBtn: { backgroundColor: "#FEE2E2" },
  declineBottomText: { color: "#EF4444", fontWeight: "700" },
  suggestBtn: { backgroundColor: "#F3F4F6" },
  suggestBtnText: { color: "#6B7280", fontWeight: "700" },
  acceptBottomBtn: { backgroundColor: "#0E9F6E" },
  acceptBottomText: { color: "#FFF", fontWeight: "700" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: width * 0.8,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginVertical: 15,
  },
  modalText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", gap: 10, width: "100%" },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelModalBtn: { backgroundColor: "#F3F4F6" },
  cancelModalText: { color: "#6B7280", fontWeight: "600" },
  confirmModalBtn: { backgroundColor: "#EF4444" },
  confirmModalText: { color: "#FFF", fontWeight: "600" },
  timeInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
});
// this code is temporay at this moment ok
