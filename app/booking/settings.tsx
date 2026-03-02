import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useReligion } from "../../contexts/ReligionContext";
// 1. Define the Missing Interface
interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
  showSwitch?: boolean;
  color?: string;
  isDestructive?: boolean;
}
const Settings = () => {
  const router = useRouter();
  const { religion, themeColor } = useReligion(); // Assuming context provides these
  const [notifications, setNotifications] = React.useState(true);

  // 2. Religion Theme Logic
  const activeThemeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const SettingRow: React.FC<SettingRowProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    showSwitch = false,
    color = activeThemeColor, // Default to theme color
    isDestructive = false,
  }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: isDestructive ? "#FEE2E2" : `${color}15` },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={isDestructive ? "#EF4444" : color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.rowTitle, isDestructive && { color: "#EF4444" }]}>
          {title}
        </Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ true: activeThemeColor, false: "#CBD5E1" }}
          thumbColor="white"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Dynamic Header */}
      <View style={[styles.header, { backgroundColor: activeThemeColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerIconBg}>
          <Ionicons name="settings-outline" size={40} color="white" />
        </View>
        <Text style={styles.headerTitle}>Manage Your Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your experience and manage preferences
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>
        <SettingRow
          icon="person-outline"
          title="Edit Profile"
          subtitle="Update your personal info"
          onPress={() => router.push("/booking/ProfileEdit")}
          color="#3B82F6" // UI standard colors
        />
        <SettingRow
          icon="lock-closed-outline"
          title="Change Password"
          subtitle="Update your credentials"
          onPress={() => router.push("/booking/Account/PasswordScreen")}
          color="#8B5CF6"
        />
        <SettingRow
          icon="shield-checkmark-outline"
          title="Verification Status"
          subtitle="Manage your documents"
          onPress={() => router.push("/booking/Account/VerificationStatus")}
          color="#10B981"
        />
        <SettingRow
          icon="business-outline"
          title="Bank Details"
          subtitle="Manage payment information"
          onPress={() => router.push("/booking/BankDetails/Userbankdetails")}
          color="#06B6D4"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>SERVICE MANAGEMENT</Text>
        <SettingRow
          icon="briefcase-outline"
          title="Manage Services"
          subtitle="Edit Services you offer"
          onPress={() => router.push("/booking/Account/VerificationStatus")}
          color="#3B82F6" // UI standard colors
        />
        <SettingRow
          icon="time-outline"
          title="Availability"
          subtitle="Set your working hours"
          onPress={() => router.push("/booking/Availability")}
          color="#8B5CF6"
        />
        <SettingRow
          icon="location-outline"
          title="Service Locations"
          subtitle="Manage service areas"
          onPress={() => router.push("/booking/Locations")}
          color="#10B981"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <SettingRow
          icon="notifications-outline"
          title="Push Notifications"
          subtitle="Get booking updates"
          showSwitch
          color="#F59E0B"
        />
        <SettingRow
          icon="mail-outline"
          title="Email Notifications"
          subtitle="Revice Emails Updates"
          showSwitch
          color="#F59E0B"
        />
        <SettingRow
          icon="contrast-outline"
          title="Push Notifications"
          subtitle="Switch to dark theme"
          showSwitch
          color="#F59E0B"
        />
        <SettingRow
          icon="language-outline"
          title="Language"
          subtitle="English"
          onPress={() => router.push("/")}
          color="#3B82F6"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>SUPPORT & LEGAL</Text>
        <SettingRow
          icon="help-circle-outline"
          title="Help Center"
          subtitle="FAQs and guides"
          onPress={() => router.push("/booking/help")}
          color="#3B82F6"
        />
        <SettingRow
          icon="headset-outline"
          title="Contact Support"
          subtitle="FAQs and guides"
          onPress={() => router.push("/booking/help")}
          color="#3B82F6"
        />
        <SettingRow
          icon="document-text-outline"
          title="Terms of Services"
          subtitle="How we protect your data"
          onPress={() => router.push("/booking/Account/Privacyaccount")}
          color="#6366F1"
        />
        <SettingRow
          icon="information-circle-outline"
          title="About Faithful Services"
          subtitle="How we protect your data"
          onPress={() => router.push("/booking/Account/Privacyaccount")}
          color="#6366F1"
        />
        <SettingRow
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          subtitle="How we protect your data"
          onPress={() => router.push("/booking/Account/Privacyaccount")}
          color="#6366F1"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>ACCOUNT ACTIONS</Text>
        <SettingRow
          icon="close-circle-outline"
          title="Deactivate Account"
          subtitle="Temporarily disable your account"
          isDestructive
          onPress={() => router.push("/booking/Account/deactivateaccount")}
        />
        <SettingRow
          icon="trash-outline"
          title="Delete Account"
          subtitle="Permanently remove your account"
          isDestructive
          onPress={() => router.push("/booking/Account/Deleteaccount")}
        />
        <SettingRow
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out of your account"
          color="#475569"
          onPress={() => router.push("/booking/Account/Logoutscreen")}
        />
      </View>
      <View style={{ height: 40 }} />
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
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  headerIconBg: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerSubtitle: {
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    marginTop: 5,
    fontSize: 13,
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 15 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#1E293B" },
  rowSubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
});

export default Settings;
