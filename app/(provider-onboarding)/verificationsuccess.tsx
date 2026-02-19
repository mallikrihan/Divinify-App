import { useReligion } from "@/contexts/ReligionContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerificationSuccess() {
  const router = useRouter();
  const { religion } = useReligion();

  const getTheme = () => {
    const selected = religion?.toLowerCase().trim();
    if (selected === "islam" || selected === "muslim") {
      return { primary: "#0E9F6E", secondary: "#E8F5E9", label: "Islam" };
    }
    if (selected === "hindu" || selected === "hinduism") {
      return { primary: "#F59E0B", secondary: "#FFF3E0", label: "Hinduism" };
    }
    if (selected === "christianity" || selected === "christian") {
      return {
        primary: "#3B82F6",
        secondary: "#E3F2FD",
        label: "Christianity",
      };
    }
    return { primary: "#6200EE", secondary: "#F3E5F5", label: "Default" };
  };

  const theme = getTheme();

  const handleGoToDashboard = () => {
    // Navigate to the main layout which contains the bottom tabs
    router.replace("/(provider-tabs)/home");
  };

  const handleViewProfile = () => {
    // Navigate to the profile page
    router.push("/(provider-tabs)/profile");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- HEADER --- */}
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.headerTitle}>You are Now Verified</Text>
          <Text style={styles.headerSubtitle}>
            Your scholar profile has been approved and is now live on Faithful
            Services
          </Text>
        </View>

        <View style={styles.content}>
          {/* --- WELCOME CARD --- */}
          <View
            style={[
              styles.welcomeCard,
              { backgroundColor: theme.secondary + "40" },
            ]}
          >
            <View
              style={[
                styles.mainIconCircle,
                { backgroundColor: theme.secondary },
              ]}
            >
              <FontAwesome5
                name="user-graduate"
                size={30}
                color={theme.primary}
              />
            </View>
            <Text style={styles.welcomeTitle}>Welcome to Our Community</Text>
            <Text style={styles.welcomeSub}>
              You can now start receiving booking requests from users in your
              area
            </Text>

            <View style={styles.statusBadgeContainer}>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Profile Status</Text>
                <View style={styles.activeTag}>
                  <Text style={styles.activeTagText}>Active</Text>
                </View>
              </View>
              <View style={styles.checkList}>
                <StatusItem
                  text="Profile verified and published"
                  theme={theme}
                />
                <StatusItem text="Ready to receive bookings" theme={theme} />
                <StatusItem text="Payment system activated" theme={theme} />
              </View>
            </View>
          </View>

          {/* --- GET STARTED GRID --- */}
          <SectionTitle icon="rocket" title="Get Started" />

          <View style={styles.grid}>
            <GridItem
              title="Set Availability"
              desc="Configure your schedule and working hours"
              btnText="Setup Now →"
              icon="calendar-alt"
              color="#DBEAFE"
              iconColor="#2563EB"
              onPress={() => router.push("/availabilitysetup")}
            />
            <GridItem
              title="Edit Profile"
              desc="Add more details and update services"
              btnText="Edit Profile →"
              icon="user-edit"
              color="#F3E8FF"
              iconColor="#9333EA"
              onPress={() => router.push("/personaldetails")}
            />
            <GridItem
              title="View Analytics"
              desc="Track your bookings and earnings"
              btnText="View Stats →"
              icon="chart-line"
              color="#FFEDD5"
              iconColor="#EA580C"
              onPress={() => router.push("/booking/analytics")}
            />
            <GridItem
              title="Scholar Guide"
              desc="Learn how to maximize your bookings"
              btnText="Learn More →"
              icon="book-reader"
              color="#DCFCE7"
              iconColor="#16A34A"
              onPress={() => router.push("/booking/guide")}
            />
          </View>
          {/* --- BENEFITS --- */}
          <SectionTitle icon="gift" title="Your Benefits" />
          <BenefitCard
            icon="wallet"
            title="Flexible Earnings"
            desc="Set your own rates and receive payments directly. Keep 85% of all earnings with transparent pricing."
            theme={theme}
          />
          <BenefitCard
            icon="shield-alt"
            title="Verified Community"
            desc="Connect with genuine users who respect your time and expertise. All users are verified before booking."
            theme={theme}
          />
          <BenefitCard
            icon="calendar-check"
            title="Schedule Control"
            desc="Complete control over your availability. Accept or decline requests based on your schedule preferences."
            theme={theme}
          />

          {/* --- HELP SECTION --- */}
          <View style={styles.helpBox}>
            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={24} color="#EAB308" />
            </View>
            <Text style={styles.helpTitle}>We are Here to Help</Text>
            <Text style={styles.helpText}>
              Our dedicated support team is available 24/7 to assist you with
              any questions or technical issues
            </Text>
            <View style={styles.helpBtns}>
              <TouchableOpacity
                style={styles.chatBtn}
                onPress={() => router.push("/booking/chat")}
              >
                <Ionicons name="chatbubbles" size={18} color="#fff" />
                <Text style={styles.chatBtnText}>Chat Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.callSupportBtn}
                onPress={() => router.push("/booking/call")}
              >
                <Ionicons name="call" size={18} color="#854D0E" />
                <Text style={styles.callSupportText}>Call Us</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- FINAL ACTIONS --- */}
          <TouchableOpacity
            style={[styles.primaryAction, { backgroundColor: theme.primary }]}
            onPress={handleGoToDashboard}
          >
            <Ionicons name="grid" size={18} color="#fff" />
            <Text style={styles.primaryActionText}>
              Go to Scholar Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryAction, { borderColor: theme.primary }]}
            onPress={handleViewProfile}
          >
            <Ionicons name="person" size={18} color={theme.primary} />
            <Text
              style={[styles.secondaryActionText, { color: theme.primary }]}
            >
              View My Profile
            </Text>
          </TouchableOpacity>

          <View style={styles.bonusCard}>
            <Ionicons
              name="information-circle"
              size={20}
              color={theme.primary}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.bonusTitle, { color: theme.primary }]}>
                Welcome Bonus
              </Text>
              <Text style={styles.bonusText}>
                As a new verified scholar, you will receive priority placement
                in search results for your first 30 days. Make the most of this
                opportunity!
              </Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ icon, title }: any) {
  return (
    <View style={styles.sectionHeader}>
      <FontAwesome5 name={icon} size={16} color="#374151" />
      <Text style={styles.sectionTitleText}>{title}</Text>
    </View>
  );
}

function StatusItem({ text, theme }: any) {
  return (
    <View style={styles.checkItem}>
      <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

function GridItem({
  title,
  desc,
  btnText,
  icon,
  color,
  iconColor,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={[styles.gridCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={[styles.gridIcon, { backgroundColor: "#fff" }]}>
        <FontAwesome5 name={icon} size={16} color={iconColor} />
      </View>
      <Text style={styles.gridTitle}>{title}</Text>
      <Text style={styles.gridDesc}>{desc}</Text>
      <Text style={[styles.gridBtnText, { color: iconColor }]}>{btnText}</Text>
    </TouchableOpacity>
  );
}

function BenefitCard({ icon, title, desc, theme }: any) {
  return (
    <View style={styles.benefitRow}>
      <View
        style={[styles.benefitIconBox, { backgroundColor: theme.secondary }]}
      >
        <FontAwesome5 name={icon} size={16} color={theme.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    paddingHorizontal: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  congratsText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  content: { paddingHorizontal: 20, marginTop: -30 },
  welcomeCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 25,
  },
  mainIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  welcomeSub: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  statusBadgeContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 16,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  statusLabel: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  activeTag: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeTagText: { color: "#166534", fontSize: 12, fontWeight: "800" },
  checkList: { gap: 10 },
  checkItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  sectionTitleText: { fontSize: 18, fontWeight: "800", color: "#111827" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 25 },
  gridCard: { width: "48%", borderRadius: 20, padding: 16, minHeight: 160 },
  gridIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  gridDesc: {
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 15,
    marginBottom: 10,
  },
  gridBtnText: { fontSize: 12, fontWeight: "700" },
  benefitRow: { flexDirection: "row", gap: 15, marginBottom: 20 },
  benefitIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  benefitDesc: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
  helpBox: {
    backgroundColor: "#FEFCE8",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#FEF9C3",
  },
  heartIcon: {
    backgroundColor: "#FFF9C4",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#854D0E",
    marginBottom: 8,
  },
  helpText: {
    fontSize: 13,
    color: "#A16207",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  helpBtns: { flexDirection: "row", gap: 10 },
  chatBtn: {
    flex: 1,
    backgroundColor: "#EAB308",
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  chatBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  callSupportBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FEF08A",
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  callSupportText: { color: "#854D0E", fontSize: 14, fontWeight: "800" },
  primaryAction: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  primaryActionText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  secondaryAction: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    marginBottom: 25,
  },
  secondaryActionText: { fontSize: 16, fontWeight: "800" },
  bonusCard: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  bonusTitle: { fontSize: 15, fontWeight: "800", marginBottom: 4 },
  bonusText: { fontSize: 12, color: "#166534", lineHeight: 18 },
});
