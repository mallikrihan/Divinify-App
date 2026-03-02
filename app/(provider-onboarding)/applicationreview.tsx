import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ApplicationReview() {
  const router = useRouter();
  const { religion } = useReligion();
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const totalDuration = 10000; // 30 Seconds
    const intervalTime = 100; // Update every 100ms
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const navigationTimeout = setTimeout(() => {
      router.replace("/verificationsuccess");
    }, totalDuration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(navigationTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <View style={styles.iconCircle}>
            <View style={styles.mainIconBg}>
              <Ionicons name="time" size={40} color={theme.primary} />
            </View>
            <View style={styles.badgeIcon}>
              <MaterialCommunityIcons
                name="hourglass-outline"
                size={16}
                color="#dd1111"
              />
            </View>
          </View>
          <Text style={styles.headerTitle}>Application Under Review</Text>
          <Text style={styles.headerSubtitle}>
            Your scholar application has been successfully submitted and is now
            being reviewed by our team.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View
                style={[
                  styles.userIconBg,
                  { backgroundColor: theme.secondary },
                ]}
              >
                <Ionicons name="person-add" size={20} color={theme.primary} />
              </View>
              <View>
                <Text style={styles.progressTitle}>
                  Verification in Progress
                </Text>
                <Text style={styles.appId}>Application ID: #FS2024001234</Text>
              </View>
            </View>

            <View style={styles.progressBarRow}>
              <Text style={styles.progressLabel}>Review Progress</Text>
              <Text style={[styles.progressPercent, { color: theme.primary }]}>
                {Math.round(progress)}%
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: theme.primary, width: `${progress}%` },
                ]}
              />
            </View>
            <Text style={styles.etaText}>
              {progress < 100
                ? "System is validating your credentials..."
                : "Verification Complete!"}
            </Text>
          </View>

          <Text style={styles.sectionHeading}>
            <Ionicons name="list" size={18} /> Verification Steps
          </Text>

          <StepItem
            title="Application Received"
            desc="Your application has been successfully submitted"
            status="Completed"
            isDone={true}
            theme={theme}
          />
          <StepItem
            title="Document Verification"
            desc="Reviewing ID and religious credentials"
            status={progress >= 50 ? "Completed" : "In Progress"}
            isDone={progress >= 50}
            isActive={progress < 50}
            theme={theme}
          />
          <StepItem
            title="Background Verification"
            desc="Checking your background and credentials"
            status={progress === 100 ? "Completed" : "Pending"}
            isDone={progress === 100}
            isActive={progress > 80 && progress < 100}
            isLast
            theme={theme}
          />
          <StepItem
            title="Final Approval"
            desc="Account activation and profile setup"
            status={progress === 100 ? "Completed" : "Pending"}
            isDone={progress === 100}
            isActive={progress > 80 && progress < 100}
            isLast
            theme={theme}
          />

          <View style={styles.nextStepsCard}>
            <Ionicons name="bulb" size={20} color={theme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.infoBoxTitle, { color: theme.primary }]}>
                Auto-Approval Active
              </Text>
              <Text style={styles.bulletItem}>
                • Please do not close this screen.
              </Text>
              <Text style={styles.bulletItem}>
                • Verification usually takes 30 seconds.
              </Text>
            </View>
          </View>
          <View style={styles.stayUpdatedCard}>
            <Ionicons name="notifications" size={20} color="#B45309" />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoBoxTitle}>Stay Updated</Text>
              <Text style={styles.infoBoxText}>
                You will receive real-time notifications via SMS and email. No
                need to check repeatedly.
              </Text>
            </View>
          </View>

          <View style={styles.nextStepsCard}>
            <Ionicons name="bulb" size={20} color={theme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.infoBoxTitle, { color: theme.primary }]}>
                What Happens Next?
              </Text>
              <Text style={styles.bulletItem}>
                • Team will verify documents within 24-48 hours
              </Text>
              <Text style={styles.bulletItem}>
                • You will receive approval notification once verified
              </Text>
              <Text style={styles.bulletItem}>
                • Your scholar profile will go live immediately
              </Text>
            </View>
          </View>
          {/* --- HELP SECTION --- */}
          <View style={styles.helpContainer}>
            <View
              style={[styles.helpIconBg, { backgroundColor: theme.secondary }]}
            >
              <Ionicons name="headset" size={24} color={theme.primary} />
            </View>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Our support team is here to assist you with any questions about
              the verification process
            </Text>

            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: theme.primary }]}
            >
              <Ionicons name="call" size={18} color="#fff" />
              <Text style={styles.btnTextWhite}>Call Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.whatsappBtn}>
              <Ionicons name="logo-whatsapp" size={18} color={theme.primary} />
              <Text style={[styles.btnTextPrimary, { color: theme.primary }]}>
                WhatsApp Chat
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.safeContainer}>
            <Ionicons name="lock-closed" size={14} color={theme.primary} />
            <Text style={[styles.safeText, { color: theme.primary }]}>
              Your Data is Safe
            </Text>
          </View>
          <Text style={styles.footerLegal}>
            All verification processes are conducted securely. Your personal
            information is encrypted.
          </Text>
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

function StepItem({
  title,
  desc,
  status,
  isDone,
  isActive,
  isLast,
  theme,
}: any) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepLeft}>
        <View
          style={[
            styles.stepDot,
            isDone
              ? { backgroundColor: theme.secondary }
              : isActive
                ? {
                    backgroundColor: theme.secondary,
                    borderWidth: 1,
                    borderColor: theme.primary,
                  }
                : { backgroundColor: "#F3F4F6" },
          ]}
        >
          {isDone ? (
            <Ionicons name="checkmark" size={16} color={theme.primary} />
          ) : isActive ? (
            <MaterialCommunityIcons
              name="loading"
              size={16}
              color={theme.primary}
            />
          ) : (
            <Ionicons name="people" size={16} color="#9CA3AF" />
          )}
        </View>
        {!isLast && <View style={styles.stepLine} />}
      </View>
      <View style={styles.stepRight}>
        <Text
          style={[
            styles.stepTitle,
            !isDone && !isActive && { color: "#9CA3AF" },
          ]}
        >
          {title}
        </Text>
        <Text style={styles.stepDesc}>{desc}</Text>
        <Text
          style={[
            styles.stepStatus,
            isDone ? { color: theme.primary } : { color: "#9CA3AF" },
          ]}
        >
          {status}
        </Text>
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
  iconCircle: { width: 80, height: 80, marginBottom: 20 },
  mainIconBg: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxText: { fontSize: 13, color: "#B45309", lineHeight: 18 },
  badgeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F59E0B",
    padding: 6,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#fff",
  },
  helpText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
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
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    elevation: 5,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  userIconBg: { padding: 12, borderRadius: 16 },
  progressTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
  appId: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  progressBarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stayUpdatedCard: {
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  progressLabel: { fontSize: 14, fontWeight: "700", color: "#374151" },
  progressPercent: { fontWeight: "900" },
  progressBarTrack: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", borderRadius: 4 },
  etaText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 10,
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  stepRow: { flexDirection: "row", gap: 15 },
  stepLeft: { alignItems: "center" },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappBtn: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  btnTextPrimary: { fontSize: 16, fontWeight: "800" },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 4,
  },
  stepRight: { flex: 1, paddingBottom: 25 },
  stepTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  stepDesc: { fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 18 },
  stepStatus: { fontSize: 12, fontWeight: "700", marginTop: 6 },
  nextStepsCard: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  infoBoxTitle: { fontSize: 15, fontWeight: "800", marginBottom: 4 },
  bulletItem: { fontSize: 13, color: "#166534", marginBottom: 4 },
  helpContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  footerLegal: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  helpIconBg: { padding: 15, borderRadius: 30, marginBottom: 15 },
  helpTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 15,
  },
  callBtn: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: -10,
  },
  btnTextWhite: { color: "#fff", fontSize: 16, fontWeight: "800" },
  safeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  safeText: { fontSize: 14, fontWeight: "800" },
});
