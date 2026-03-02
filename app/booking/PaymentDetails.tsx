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

export default function PaymentDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const themeColor = (params.themeColor as string) || "#0E9F6E";
  const amount = (params.amount as string) || "₹150.00";
  const customerName = (params.customerName as string) || "Ahmed Hassan";
  const paymentMethod = (params.paymentMethod as string) || "Credit Card";
  const transactionId = (params.transactionId as string) || "TXN123456789";
  const date = (params.date as string) || "March 18, 2024";
  const serviceType = (params.serviceType as string) || "Nikah Ceremony";

  const handleDownloadReceipt = () => {
    Alert.alert(
      "Download Receipt",
      "Receipt will be downloaded to your device",
    );
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Support team will contact you shortly");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header - cleaner, more modern with subtle gradient potential */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <SafeAreaView>
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Payment Details</Text>
              <TouchableOpacity onPress={handleDownloadReceipt}>
                <Ionicons name="download-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Banner - more prominent & celebratory */}
          <View
            style={[
              styles.successBanner,
              { backgroundColor: `${themeColor}15` },
            ]}
          >
            <Ionicons name="checkmark-circle" size={64} color={themeColor} />
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successSubtitle}>
              Your transaction has been completed securely.
            </Text>
          </View>

          {/* Hero Amount Card - bigger, bolder, centered */}
          <View style={styles.heroAmountCard}>
            <Text style={styles.amountLabel}>Total Paid</Text>
            <Text style={[styles.heroAmount, { color: themeColor }]}>
              {amount}
            </Text>
            <View style={[styles.methodBadge, { borderColor: themeColor }]}>
              <Text style={[styles.methodBadgeText, { color: themeColor }]}>
                Paid via {paymentMethod}
              </Text>
            </View>
          </View>

          {/* Sections – cleaner cards with subtle borders & more spacing */}
          <SectionHeader
            icon="receipt-outline"
            title="Transaction Details"
            color={themeColor}
          />
          <View style={styles.card}>
            <DetailRow label="Transaction ID" value={transactionId} />
            <DetailRow label="Payment Date" value={date} />
            <DetailRow label="Payment Method" value={paymentMethod} />
            <DetailRow
              label="Status"
              value="Completed"
              valueStyle={{ color: themeColor, fontWeight: "700" }}
            />
          </View>

          <SectionHeader
            icon="person-outline"
            title="Customer Information"
            color={themeColor}
          />
          <View style={styles.card}>
            <View style={styles.customerHeader}>
              <View
                style={[styles.avatar, { backgroundColor: `${themeColor}15` }]}
              >
                <Ionicons name="person" size={28} color={themeColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{customerName}</Text>
                <Text style={styles.customerStatus}>Verified Customer</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.messageButton,
                  { backgroundColor: `${themeColor}10` },
                ]}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={22}
                  color={themeColor}
                />
              </TouchableOpacity>
            </View>

            <InfoItem
              icon="mail-outline"
              label="Email"
              value="customer@email.com"
            />
            <InfoItem
              icon="call-outline"
              label="Phone"
              value="+1 (555) 123-4567"
            />
          </View>

          <SectionHeader
            icon="calendar-outline"
            title="Service Details"
            color={themeColor}
          />
          <View style={styles.card}>
            <DetailRow label="Service Type" value={serviceType} />
            <DetailRow label="Booking Date" value="March 25, 2024 at 2:00 PM" />
            <DetailRow label="Duration" value="2 hours" />
          </View>

          <SectionHeader
            icon="calculator-outline"
            title="Payment Breakdown"
            color={themeColor}
          />
          <View style={styles.card}>
            <BreakdownRow label="Service Fee" value={amount} />
            <BreakdownRow label="Platform Fee" value="₹10.00" />
            <BreakdownRow label="Tax" value="₹7.50" />
            <View style={styles.divider} />
            <BreakdownRow
              label="Total"
              value={amount}
              bold
              valueStyle={{ color: themeColor, fontWeight: "700" }}
            />
          </View>

          {/* Actions – larger buttons, better contrast */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: themeColor }]}
              onPress={handleDownloadReceipt}
            >
              <Ionicons name="document-text-outline" size={22} color="white" />
              <Text style={styles.buttonText}>Download Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleContactSupport}
            >
              <Ionicons name="headset-outline" size={22} color={themeColor} />
              <Text style={[styles.secondaryButtonText, { color: themeColor }]}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

// ────────────────────────────────────────────────
// Sub-components (mostly same, minor prop tweaks)
// ────────────────────────────────────────────────
const SectionHeader = ({ icon, title, color }: any) => (
  <View style={styles.sectionHeader}>
    <Ionicons name={icon} size={22} color={color} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const InfoItem = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#6B7280" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const DetailRow = ({ label, value, valueStyle }: any) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, valueStyle]}>{value}</Text>
  </View>
);

const BreakdownRow = ({ label, value, bold, valueStyle }: any) => (
  <View style={styles.row}>
    <Text style={[styles.rowLabel, bold && styles.boldLabel]}>{label}</Text>
    <Text style={[styles.rowValue, bold && styles.boldValue, valueStyle]}>
      {value}
    </Text>
  </View>
);

// ────────────────────────────────────────────────
// Updated Styles – cleaner, modern, more premium
// ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingBottom: 50, // more space for scroll overlap
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 60,
  },

  // Success banner
  successBanner: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginTop: 16,
  },
  successSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  // Hero amount
  heroAmountCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  amountLabel: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 44,
    fontWeight: "800",
    marginBottom: 12,
  },
  methodBadge: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  methodBadgeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Cards
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  // Customer
  customerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  customerStatus: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  messageButton: {
    padding: 12,
    borderRadius: 14,
  },

  // Rows (shared for detail & breakdown)
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 15,
    color: "#4B5563",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
  },
  boldLabel: { fontWeight: "700", color: "#111827" },
  boldValue: { fontWeight: "700" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  // Buttons
  actions: {
    marginTop: 16,
    gap: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
