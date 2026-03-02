import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpSupportScreen() {
  const { religion } = useReligion();
  const router = useRouter();

  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const faqs = [
    "How do I update my availability?",
    "How do I view my earnings?",
    "How do I cancel a booking?",
    "How do I update my profile?",
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <SafeAreaView>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Help & Support</Text>
              <View style={{ width: 24 }} />
            </View>
            <View style={styles.headerContent}>
              <View style={styles.iconCircle}>
                <Ionicons name="headset-outline" size={30} color="white" />
              </View>
              <Text style={styles.mainHeading}>Were Here to Help</Text>
              <Text style={styles.headerSubtitle}>
                Get assistance with your account, bookings, and any questions
                you may have.
              </Text>
            </View>
          </SafeAreaView>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/booking/RaiseSupportTicket")}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: themeColor + "15" },
                ]}
              >
                <Ionicons name="ticket-outline" size={24} color={themeColor} />
              </View>
              <Text style={styles.actionLabel}>Raise Ticket</Text>
              <Text style={styles.actionSub}>Report an issue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="list-outline" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.actionLabel}>Ticket Status</Text>
              <Text style={styles.actionSub}>Track progress</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Ionicons name="help-circle" size={20} color={themeColor} />
          </View>
          <View style={styles.card}>
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.faqItem,
                  index === faqs.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Text style={styles.faqText}>{faq}</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.viewAllBtn, { borderColor: themeColor + "40" }]}
            >
              <Text style={[styles.viewAllText, { color: themeColor }]}>
                View All FAQs
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            <ContactItem
              icon="mail"
              title="Email Support"
              sub="support@faithfulservices.com"
              note="Response within 24 hours"
              color="#EF4444"
            />
            <ContactItem
              icon="call"
              title="Phone Support"
              sub="+1 (800) 123-4567"
              note="Mon-Fri 9AM-6PM EST"
              color="#10B981"
            />
            <ContactItem
              icon="chatbubbles"
              title="Live Chat"
              sub="Chat with our support team"
              note="Online now"
              color="#3B82F6"
              isLive
            />
          </View>

          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.card}>
            <InfoRow icon="shield-checkmark-outline" title="Privacy Policy" />
            <InfoRow icon="document-text-outline" title="Terms of Service" />
            <View style={styles.versionRow}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color="#9CA3AF"
              />
              <Text style={styles.versionText}>App Version</Text>
              <Text style={styles.versionNum}>v2.1.0</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.rateCard, { backgroundColor: themeColor + "10" }]}
          >
            <View style={[styles.starCircle, { backgroundColor: themeColor }]}>
              <Ionicons name="star" size={20} color="white" />
            </View>
            <Text style={styles.rateTitle}>Rate Our App</Text>
            <Text style={styles.rateSub}>
              Help us improve by sharing your experience
            </Text>
            <TouchableOpacity
              style={[styles.rateBtn, { backgroundColor: themeColor }]}
            >
              <Text style={styles.rateBtnText}>Rate on App Store</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const ContactItem = ({ icon, title, sub, note, color, isLive }: any) => (
  <TouchableOpacity style={styles.contactItem}>
    <View style={[styles.contactIcon, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSub}>{sub}</Text>
      <Text style={[styles.contactNote, isLive && { color: "#10B981" }]}>
        {isLive && <Text style={{ fontSize: 18 }}>• </Text>}
        {note}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

const InfoRow = ({ icon, title }: any) => (
  <TouchableOpacity style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="#4B5563" />
    <Text style={styles.infoRowText}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    paddingBottom: 40,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerContent: { alignItems: "center", marginTop: 10, paddingHorizontal: 40 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  mainHeading: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
  },
  scrollContent: { padding: 16, marginTop: -30, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    marginTop: 10,
    bottom: -5,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionLabel: { fontWeight: "bold", fontSize: 14, color: "#1F2937" },
  actionSub: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  faqText: { fontSize: 14, color: "#374151", fontWeight: "500" },
  viewAllBtn: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  viewAllText: { fontWeight: "bold", fontSize: 14 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactTitle: { fontSize: 14, fontWeight: "bold", color: "#1F2937" },
  contactSub: { fontSize: 12, color: "#4B5563", marginVertical: 2 },
  contactNote: { fontSize: 11, color: "#9CA3AF" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoRowText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  versionRow: { flexDirection: "row", alignItems: "center", paddingTop: 15 },
  versionText: { flex: 1, marginLeft: 12, fontSize: 14, color: "#9CA3AF" },
  versionNum: { fontSize: 14, color: "#9CA3AF" },
  rateCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  starCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  rateTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  rateSub: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 8,
  },
  rateBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  rateBtnText: { color: "white", fontWeight: "bold", fontSize: 14 },
});
