import { useReligion } from "@/contexts/ReligionContext";
import { useUser } from "@/contexts/Usercontext";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const InfoRow = ({
  icon,
  label,
  value,
  isLocked = false,
  type = "ionicon",
  onPress,
}: {
  icon: string;
  label?: string;
  value: string;
  isLocked?: boolean;
  type?: "ionicon" | "material";
  onPress?: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
    style={[styles.infoItem, isLocked && styles.lockedItem]}
  >
    <View style={styles.infoIconContainer}>
      {type === "ionicon" ? (
        <Ionicons name={icon as any} size={20} color="#64748B" />
      ) : (
        <MaterialCommunityIcons name={icon as any} size={20} color="#64748B" />
      )}
    </View>

    <View style={styles.infoTextContainer}>
      {label && <Text style={styles.infoLabel}>{label}</Text>}
      <Text style={styles.infoValue} numberOfLines={1}>
        {value || "Not set"}
      </Text>
    </View>

    {isLocked ? (
      <Ionicons name="lock-closed" size={16} color="#CBD5E1" />
    ) : (
      onPress && <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
    )}
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();
  const { primary } = useTheme();
  const { user } = useUser();
  const { religion } = useReligion();

  const personalDetails = useSelector(
    (state: RootState) => state.onboarding?.personalDetails,
  );

  const displayName =
    user?.name || user?.fullName || personalDetails?.name || "Ahmed Hassan";
  const displayReligion = religion || user?.religion || "Islam";

  const themeColor =
    displayReligion?.toLowerCase() === "islam"
      ? "#10B981"
      : displayReligion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  const getFormattedAddress = () => {
    if (personalDetails?.address) {
      return [
        personalDetails.address,
        personalDetails.city,
        personalDetails.state,
      ]
        .filter(Boolean)
        .join(", ");
    }
    return user?.address || "Not Provided";
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push("/booking/ProfileEdit")}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=ahmed" }}
                style={styles.avatar}
              />
              <View
                style={[styles.verifiedBadge, { backgroundColor: "#10B981" }]}
              >
                <Ionicons name="checkmark-sharp" size={14} color="white" />
              </View>
            </View>
            <Text style={styles.userName}>{displayName}</Text>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.tierBadge,
                  { backgroundColor: `${themeColor}15` },
                ]}
              >
                <Text style={[styles.tierText, { color: themeColor }]}>
                  Premium Member
                </Text>
              </View>
              <View style={styles.religionBadge}>
                <Text style={styles.religionText}>{displayReligion}</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>PERSONAL INFORMATION</Text>
            <View style={styles.card}>
              <InfoRow
                icon="mail-outline"
                label="Email"
                value={user?.email || "user@example.com"}
              />
              <InfoRow
                icon="call-outline"
                label="Phone"
                value={user?.phone || "Not set"}
              />
              <InfoRow
                icon="location-outline"
                label="Address"
                value={getFormattedAddress()}
              />
              <InfoRow
                icon="shield-outline"
                label="Religion"
                value={`${displayReligion} (Locked)`}
                isLocked
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>APP SETTINGS</Text>
            <View style={styles.card}>
              <View style={styles.preferenceRow}>
                <View style={styles.prefIconBg}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#64748B"
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.infoValue}>Notifications</Text>
                </View>
                <Switch
                  value={true}
                  trackColor={{ true: themeColor, false: "#E2E8F0" }}
                  thumbColor="white"
                />
              </View>
              <InfoRow
                icon="time-outline"
                value="Booking History"
                onPress={() => router.push("/(provider-tabs)/bookings")}
              />
              <InfoRow
                icon="headset-outline"
                value="Help & Support"
                onPress={() => router.push("/booking/help")}
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>ACCOUNT MANAGEMENT</Text>
            <View style={styles.card}>
              <InfoRow
                icon="card-outline"
                value="Payment Methods"
                onPress={() => router.push("/booking/PaymentDetails")}
              />
              <InfoRow
                icon="lock-closed-outline"
                value="Privacy & Security"
                onPress={() => router.push("/booking/Account/Privacyaccount")}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutBtn}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text style={styles.logoutTxt}>Log Out</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    paddingTop: 50,
    paddingBottom: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
  profileCard: {
    position: "absolute",
    bottom: -120,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarContainer: { marginTop: -50, position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "white",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 10,
  },
  badgeRow: { flexDirection: "row", marginTop: 8, gap: 8 },
  tierBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  tierText: { fontSize: 12, fontWeight: "700" },
  religionBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  religionText: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  scrollContent: { paddingTop: 80 },
  statsGrid: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-around",
    elevation: 2,
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  statLabel: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#F1F5F9" },
  sectionContainer: { marginTop: 25, paddingHorizontal: 20 },
  sectionHeading: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 1,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  lockedItem: { opacity: 0.8 },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 11, color: "#94A3B8", fontWeight: "600" },
  infoValue: { fontSize: 14, color: "#334155", fontWeight: "500" },
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  prefIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F2",
    marginHorizontal: 20,
    marginTop: 30,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  logoutTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
    marginLeft: 10,
  },
});
