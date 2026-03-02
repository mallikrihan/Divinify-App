import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RaiseSupportTicketScreen() {
  const { religion } = useReligion();
  const router = useRouter();
  const [category, setCategory] = useState("Booking");
  const [priority, setPriority] = useState("Medium");
  const [contactPref, setContactPref] = useState("App Notification");

  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const categories = [
    { id: "Booking", icon: "calendar" },
    { id: "Payment", icon: "card" },
    { id: "Account", icon: "person" },
    { id: "Technical", icon: "bug" },
  ];

  const handleSubmit = () => {
    Alert.alert(
      "Success",
      "Your support ticket has been raised successfully.",
      [{ text: "OK", onPress: () => router.replace("/(provider-tabs)/home") }],
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <SafeAreaView>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Raise Support Ticket</Text>
              <View style={{ width: 24 }} />
            </View>
            <View style={styles.headerContent}>
              <View style={styles.iconCircle}>
                <Ionicons name="ticket" size={30} color="white" />
              </View>
              <Text style={styles.mainHeading}>Need Help?</Text>
              <Text style={styles.headerSubtitle}>
                Describe your issue and we will help you resolve it quickly.
              </Text>
            </View>
          </SafeAreaView>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Issue Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setCategory(item.id)}
                style={[
                  styles.catItem,
                  category === item.id && {
                    backgroundColor: themeColor + "10",
                    borderColor: themeColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.catIcon,
                    {
                      backgroundColor:
                        category === item.id ? themeColor : "#F3F4F6",
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={category === item.id ? "white" : "#9CA3AF"}
                  />
                </View>
                <Text
                  style={[
                    styles.catText,
                    category === item.id && {
                      color: themeColor,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {item.id} Issues
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Priority Level</Text>
          <View style={styles.priorityContainer}>
            {["Low", "Medium", "High"].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                style={[
                  styles.priorityBtn,
                  priority === p && {
                    backgroundColor:
                      p === "High"
                        ? "#EF4444"
                        : p === "Medium"
                          ? "#F59E0B"
                          : "#10B981",
                  },
                ]}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        priority === p
                          ? "white"
                          : p === "High"
                            ? "#EF4444"
                            : p === "Medium"
                              ? "#F59E0B"
                              : "#10B981",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.priorityText,
                    priority === p && { color: "white" },
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Subject</Text>
          <TextInput
            placeholder="Brief description of your issue"
            style={styles.input}
          />

          <Text style={styles.label}>Detailed Description</Text>
          <TextInput
            placeholder="Please provide detailed information about your issue..."
            style={[styles.input, { height: 120, textAlignVertical: "top" }]}
            multiline
          />

          <Text style={styles.label}>Booking Reference (Optional)</Text>
          <TextInput
            placeholder="Enter booking ID if related"
            style={styles.input}
          />

          <Text style={styles.label}>Attachments (Optional)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={30} color="#9CA3AF" />
            <Text style={styles.uploadTitle}>
              Upload Screenshots or Documents
            </Text>
            <Text style={styles.uploadSub}>PNG, JPG, PDF up to 5MB</Text>
            <TouchableOpacity
              style={[styles.chooseBtn, { backgroundColor: themeColor }]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Choose Files
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.label}>Contact Preference</Text>
          <View style={styles.card}>
            <PreferenceItem
              label="Email"
              sub="Get updates via email"
              selected={contactPref === "Email"}
              onSelect={() => setContactPref("Email")}
              icon="mail"
              theme={themeColor}
            />
            <PreferenceItem
              label="SMS"
              sub="Get updates via text message"
              selected={contactPref === "SMS"}
              onSelect={() => setContactPref("SMS")}
              icon="chatbox"
              theme={themeColor}
            />
            <PreferenceItem
              label="App Notification"
              sub="Get updates in the app"
              selected={contactPref === "App Notification"}
              onSelect={() => setContactPref("App Notification")}
              icon="notifications"
              theme={themeColor}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: themeColor + "70" }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit Ticket</Text>
          </TouchableOpacity>
          <Text style={styles.terms}>
            By submitting this ticket, you agree to our{" "}
            <Text style={{ color: themeColor }}>Terms of Service</Text> and{" "}
            <Text style={{ color: themeColor }}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const PreferenceItem = ({
  label,
  sub,
  selected,
  onSelect,
  icon,
  theme,
}: any) => (
  <TouchableOpacity style={styles.prefItem} onPress={onSelect}>
    <Ionicons
      name={icon}
      size={20}
      color="#4B5563"
      style={{ marginRight: 15 }}
    />
    <View style={{ flex: 1 }}>
      <Text style={styles.prefLabel}>{label}</Text>
      <Text style={styles.prefSub}>{sub}</Text>
    </View>
    <View
      style={[styles.radio, selected && { borderColor: theme, borderWidth: 6 }]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: { paddingBottom: 30 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerContent: { alignItems: "center", marginTop: 10 },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mainHeading: { color: "white", fontSize: 22, fontWeight: "800" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 13,
    paddingHorizontal: 50,
    marginTop: 5,
  },
  scrollContent: { padding: 16, paddingBottom: 40 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  catItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  catIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  catText: { fontSize: 13, color: "#4B5563" },
  priorityContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  priorityBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  priorityText: { fontWeight: "bold", color: "#6B7280" },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  uploadBox: {
    backgroundColor: "white",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 5,
  },
  uploadTitle: { fontWeight: "bold", color: "#1F2937", marginTop: 10 },
  uploadSub: { fontSize: 12, color: "#9CA3AF", marginVertical: 5 },
  chooseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  card: { backgroundColor: "white", borderRadius: 15, padding: 10 },
  prefItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  prefLabel: { fontWeight: "bold", color: "#1F2937" },
  prefSub: { fontSize: 11, color: "#9CA3AF" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  submitBtn: {
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "bold" },
  terms: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 16,
  },
});
