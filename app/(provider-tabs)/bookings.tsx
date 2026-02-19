import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingDetailsPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Detailssssssssssss</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.clientCard}>
          <View style={styles.clientHeader}>
            <View style={styles.clientImageLarge}>
              <Text style={styles.clientInitials}>MA</Text>
            </View>
            <View>
              <Text style={styles.clientName}>Muhammad Ali</Text>
              <Text style={styles.clientLocation}>
                <Ionicons name="location" size={12} color="#6B7280" /> 2.5 km
                away
              </Text>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call" size={18} color="#3B82F6" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="chatbubble" size={18} color="#3B82F6" />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Service Details</Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={20} color="#6B7280" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>
                Today, Dec 18 • 2:00 PM - 3:30 PM
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="book" size={20} color="#6B7280" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Service Type</Text>
              <Text style={styles.detailValue}>Jummah Prayer Service</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="people" size={20} color="#6B7280" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Number of People</Text>
              <Text style={styles.detailValue}>5 attendees</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cash" size={20} color="#6B7280" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>₦150</Text>
            </View>
          </View>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={40} color="#9CA3AF" />
            <Text style={styles.mapText}>Map View</Text>
          </View>
          <Text style={styles.address}>123 Main Street, Lagos</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
            <Text style={styles.acceptButtonText}>Accept Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  clientCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
  },
  clientHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  clientImageLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  clientInitials: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4B5563",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  clientLocation: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 10,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mapText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  address: {
    fontSize: 14,
    color: "#111827",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#10B981",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  declineButton: {
    backgroundColor: "#FEE2E2",
  },
  declineButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
});
