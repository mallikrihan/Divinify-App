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

const VerificationStatus = () => {
  const router = useRouter();
  const STATUS_RED = "#EF4444";

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 1. Header Section */}
        <View style={[styles.header, { backgroundColor: STATUS_RED }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification Status</Text>

          <View style={styles.headerIconContainer}>
            <Ionicons name="warning" size={40} color="white" />
          </View>
          <Text style={styles.headerMainStatus}>Verification Rejected</Text>
          <Text style={styles.headerSubStatus}>
            Your application requires corrections. Please review and resubmit.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* 2. Application Not Approved Card */}
            <View style={styles.whiteCard}>
              <View style={styles.errorCircle}>
                <Ionicons name="close" size={20} color="white" />
              </View>
              <Text style={styles.cardMainTitle}>Application Not Approved</Text>
              <Text style={styles.cardSubText}>
                Our verification team has reviewed your application and
                identified issues that need to be addressed.
              </Text>

              <View style={styles.reviewInfoBox}>
                <View style={styles.reviewRow}>
                  <Ionicons name="calendar" size={18} color={STATUS_RED} />
                  <Text style={styles.reviewLabel}>Reviewed on: </Text>
                  <Text style={styles.reviewValue}>January 15, 2024</Text>
                </View>
                <View style={styles.reviewRow}>
                  <Ionicons name="person" size={18} color={STATUS_RED} />
                  <Text style={styles.reviewLabel}>Reviewed by: </Text>
                  <Text style={styles.reviewValue}>Religious Council Team</Text>
                </View>
              </View>
            </View>

            {/* 3. Issues Found Section */}
            <View style={styles.sectionHeader}>
              <View style={styles.orangeIconBg}>
                <Ionicons name="list" size={16} color="white" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Issues Found</Text>
                <Text style={styles.sectionSubTitle}>
                  Please address the following concerns
                </Text>
              </View>
            </View>

            {/* Issue Items */}
            <View style={[styles.issueCard, { borderColor: "#FED7AA" }]}>
              <View style={styles.issueHeader}>
                <Ionicons name="id-card" size={20} color="#EA580C" />
                <Text style={styles.issueTitle}>Identity Documents</Text>
              </View>
              <Text style={styles.issueText}>
                The provided government ID is not clear or appears to be
                expired. Please upload a clear, valid ID document.
              </Text>
              <Text style={styles.actionRequired}>● Action Required</Text>
            </View>

            <View style={[styles.issueCard, { borderColor: "#FDE68A" }]}>
              <View style={styles.issueHeader}>
                <Ionicons name="school" size={20} color="#D97706" />
                <Text style={styles.issueTitle}>Religious Certification</Text>
              </View>
              <Text style={styles.issueText}>
                Additional verification is needed for your Islamic studies
                certificate. Please provide an official letter from your mosque.
              </Text>
              <Text style={[styles.actionRequired, { color: "#D97706" }]}>
                ● Additional Documents Needed
              </Text>
            </View>

            {/* 4. Reviewer Comments */}
            <View style={styles.sectionHeader}>
              <View style={styles.blueIconBg}>
                <Ionicons name="chatbubble" size={16} color="white" />
              </View>
              <Text style={styles.sectionTitle}>Reviewer Comments</Text>
            </View>
            <View style={styles.commentsCard}>
              <View style={styles.commentHeader}>
                <Ionicons name="person-circle" size={20} color="#6366F1" />
                <Text style={styles.commentFrom}>From Verification Team:</Text>
              </View>
              <Text style={styles.commentText}>
                The applicant shows good knowledge and qualifications. However,
                we need clearer documentation... We encourage resubmission once
                these items are addressed.
              </Text>
            </View>

            {/* 5. What's Next Steps */}
            <View style={styles.sectionHeader}>
              <View style={styles.greenIconBg}>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </View>
              <Text style={styles.sectionTitle}>Whats Next?</Text>
            </View>

            {[
              {
                id: 1,
                t: "Review Issues",
                d: "Carefully read through all issues mentioned above.",
              },
              {
                id: 2,
                t: "Update Documents",
                d: "Upload new, clear copies of all required documents.",
              },
              {
                id: 3,
                t: "Resubmit Application",
                d: "Processing typically takes 3-5 business days.",
              },
            ].map((step) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.id}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{step.t}</Text>
                  <Text style={styles.stepDesc}>{step.d}</Text>
                </View>
              </View>
            ))}

            {/* 6. Action Buttons */}
            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="create" size={20} color="white" />
              <Text style={styles.primaryBtnText}>Update Documents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="headset" size={20} color="white" />
              <Text style={styles.primaryBtnText}>Contact Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ghostBtn}
              onPress={() => router.replace("/(provider-tabs)/home")}
            >
              <Ionicons name="home" size={20} color="#475569" />
              <Text style={styles.ghostBtnText}>Back to Dashboard</Text>
            </TouchableOpacity>

            {/* 7. Guidelines Card */}
            <View style={styles.guidelinesCard}>
              <View style={styles.guidelineHeader}>
                <Ionicons name="information-circle" size={20} color="#22C55E" />
                <Text style={styles.guidelineTitle}>
                  Resubmission Guidelines
                </Text>
              </View>
              <Text style={styles.guidelineItem}>
                ● You can resubmit your application as many times as needed.
              </Text>
              <Text style={styles.guidelineItem}>
                ● Each review takes 3-5 business days.
              </Text>
              <Text style={styles.guidelineItem}>
                ● No additional fees for resubmission.
              </Text>
            </View>

            {/* 8. Motivational Card */}
            <View style={styles.motivationalCard}>
              <Ionicons name="heart" size={30} color="#3B82F6" />
              <Text style={styles.motivationTitle}>Dont Give Up!</Text>
              <Text style={styles.motivationText}>
                We believe in your dedication to serve the community. Your
                patience and cooperation are greatly appreciated.
              </Text>
            </View>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 25,
    paddingTop: 50,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: { position: "absolute", left: 20, top: 50 },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerIconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 50,
    marginVertical: 15,
  },
  headerMainStatus: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerSubStatus: {
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    fontSize: 13,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  scrollContainer: { flex: 1, marginTop: -30 },
  content: { padding: 20 },
  whiteCard: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,
  },
  errorCircle: {
    backgroundColor: "#EF4444",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardMainTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  cardSubText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748B",
    marginTop: 8,
  },
  reviewInfoBox: {
    width: "100%",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 15,
  },
  reviewRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  reviewLabel: { marginLeft: 10, fontSize: 13, color: "#64748B" },
  reviewValue: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#1E293B",
  },
  sectionSubTitle: { fontSize: 12, color: "#64748B", marginLeft: 10 },
  orangeIconBg: { backgroundColor: "#F97316", padding: 6, borderRadius: 8 },
  blueIconBg: { backgroundColor: "#6366F1", padding: 6, borderRadius: 8 },
  greenIconBg: { backgroundColor: "#22C55E", padding: 6, borderRadius: 8 },
  issueCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
  },
  issueHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  issueTitle: { marginLeft: 10, fontWeight: "bold", color: "#1E293B" },
  issueText: { fontSize: 12, color: "#64748B", lineHeight: 18 },
  actionRequired: {
    color: "#EA580C",
    fontWeight: "bold",
    fontSize: 11,
    marginTop: 10,
  },
  commentsCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentFrom: { marginLeft: 8, fontWeight: "bold", color: "#4338CA" },
  commentText: {
    fontSize: 12,
    color: "#4338CA",
    fontStyle: "italic",
    lineHeight: 18,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
  },
  stepNumber: {
    backgroundColor: "#22C55E",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: { color: "white", fontWeight: "bold", fontSize: 12 },
  stepTitle: { fontWeight: "bold", color: "#1E293B" },
  stepDesc: { fontSize: 12, color: "#64748B", marginTop: 2 },
  primaryBtn: {
    backgroundColor: "#059669",
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryBtn: {
    backgroundColor: "#3B82F6",
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: { color: "white", fontWeight: "bold", marginLeft: 10 },
  ghostBtn: {
    height: 55,
    backgroundColor: "#F1F5F9",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ghostBtnText: { color: "#475569", fontWeight: "bold", marginLeft: 10 },
  guidelinesCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  guidelineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  guidelineTitle: { marginLeft: 10, fontWeight: "bold", color: "#166534" },
  guidelineItem: { fontSize: 12, color: "#166534", marginBottom: 5 },
  motivationalCard: {
    backgroundColor: "#EFF6FF",
    padding: 25,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
    marginTop: 10,
  },
  motivationText: {
    textAlign: "center",
    fontSize: 12,
    color: "#3B82F6",
    marginTop: 5,
    lineHeight: 18,
  },
});

export default VerificationStatus;
