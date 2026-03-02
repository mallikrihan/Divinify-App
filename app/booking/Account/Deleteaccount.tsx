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

const deleteReasons = [
  {
    id: "not_using",
    title: "Not using anymore",
    sub: "No longer need the service",
  },
  { id: "privacy", title: "Privacy concerns", sub: "Want to remove my data" },
  {
    id: "poor_exp",
    title: "Poor experience",
    sub: "Not satisfied with service",
  },
  {
    id: "alternative",
    title: "Found alternative",
    sub: "Using different platform",
  },
  {
    id: "technical",
    title: "Technical issues",
    sub: "App not working properly",
  },
  { id: "other", title: "Other reason", sub: "Specify below" },
];

const DeleteAccount = () => {
  const router = useRouter();

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const CRITICAL_RED = "#DC2626";

  // Logic: Valid only if password exists and "DELETE" is typed correctly
  const isFormValid =
    confirmText.trim().toUpperCase() === "DELETE" && password.length > 0;

  const handleDelete = () => {
    if (!isFormValid) return;

    Alert.alert(
      "PERMANENT DELETION",
      "This will immediately erase all your data, bookings, and history. This action CANNOT be undone. Are you absolutely sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "DELETE FOREVER",
          style: "destructive",
          onPress: async () => {
            try {
              // TODO: Add your Supabase auth.signOut() or data purge logic here
              router.replace("/(auth)/login");
            } catch (error) {
              Alert.alert(
                "System Error",
                "Unable to complete deletion. Please contact support.",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: CRITICAL_RED }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delete Account</Text>
          {/* <Text style={styles.headerSubtitle}>This action is permanent</Text> */}
          <Text style={styles.headerSubtitle}>
            All your data will be lost forever
          </Text>
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Reasons Section */}
            {/* Identity Verification Section */}
            {/* Action Buttons */}
            <View style={{ height: -40 }} />
          </View>
          <View style={styles.content}>
            {/* 1. Critical Warning Card */}
            <View style={styles.card}>
              <View style={styles.skullBg}>
                <Ionicons name="skull" size={30} color={CRITICAL_RED} />
              </View>
              <Text style={styles.criticalTitle}>Critical Warning</Text>
              <Text style={styles.criticalText}>
                Account deletion is permanent and cannot be undone. All your
                data will be permanently erased.
              </Text>

              <View style={styles.deletionList}>
                <View style={styles.listHeader}>
                  <View style={styles.trashBg}>
                    <Ionicons name="trash" size={16} color="white" />
                  </View>
                  <Text style={styles.listHeaderText}>
                    What Will Be Deleted
                  </Text>
                </View>

                {[
                  {
                    label: "Profile & Personal Information",
                    desc: "Name, email, phone, address, documents",
                  },
                  {
                    label: "Service History",
                    desc: "All completed and pending bookings",
                  },
                  {
                    label: "Financial Records",
                    desc: "Earnings, transactions, payment history",
                  },
                ].map((item, i) => (
                  <View key={i} style={styles.listItem}>
                    <View style={styles.xCircle}>
                      <Ionicons name="close" size={12} color={CRITICAL_RED} />
                    </View>
                    <View>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* 2. Deactivation Suggestion */}
            <View style={styles.deactivateCard}>
              <View style={styles.infoRow}>
                <View style={styles.orangeIcon}>
                  <Ionicons name="alert-circle" size={18} color="white" />
                </View>
                <Text style={styles.orangeTitle}>
                  Consider Deactivation Instead
                </Text>
              </View>
              <Text style={styles.orangeText}>
                If you need a break, consider temporarily deactivating your
                account instead.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push("/booking/Account/deactivateaccount")
                }
              >
                <Text style={styles.orangeLink}>Learn about Deactivation</Text>
              </TouchableOpacity>
            </View>

            {/* 3. Pending Obligations (Blocker) */}
            <View style={styles.obligationsCard}>
              <View style={styles.infoRow}>
                <View
                  style={[styles.orangeIcon, { backgroundColor: "#F97316" }]}
                >
                  <Ionicons name="warning" size={18} color="white" />
                </View>
                <Text style={styles.orangeTitle}>Pending Obligations</Text>
              </View>
              <Text style={styles.orangeText}>
                You have active commitments that must be resolved before account
                deletion.
              </Text>

              <View style={styles.obligationRow}>
                <Ionicons name="calendar" size={18} color={CRITICAL_RED} />
                <Text style={styles.obligationLabel}>Active Bookings</Text>
                <Text style={styles.obligationValue}>3</Text>
              </View>
              <View style={styles.obligationRow}>
                <Ionicons name="wallet" size={18} color="#B45309" />
                <Text style={styles.obligationLabel}>Pending Payments</Text>
                <Text style={styles.obligationValue}>₹2,450</Text>
              </View>
            </View>

            {/* 4. Feedback Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Why are you leaving?</Text>
              {deleteReasons.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.reasonBtn}
                  onPress={() => setSelectedReason(r.id)}
                >
                  <View
                    style={[
                      styles.radio,
                      selectedReason === r.id && { borderColor: CRITICAL_RED },
                    ]}
                  >
                    {selectedReason === r.id && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: CRITICAL_RED },
                        ]}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.reasonTitle}>{r.title}</Text>
                    <Text style={styles.reasonSub}>{r.sub}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TextInput
                style={styles.textArea}
                placeholder="Tell us more (optional)"
                multiline
                value={otherReason}
                onChangeText={setOtherReason}
              />
            </View>

            {/* 5. Identity Verification */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Verify Your Identity</Text>
              <Text style={styles.verifySub}>
                Enter your password to confirm deletion.
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.deleteConfirmBox}>
                <Ionicons name="lock-closed" size={16} color={CRITICAL_RED} />
                <Text style={styles.deleteConfirmText}>
                  Type{" "}
                  <Text style={{ fontWeight: "bold", color: CRITICAL_RED }}>
                    DELETE
                  </Text>{" "}
                  to confirm
                </Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder='Type "DELETE" here'
                autoCapitalize="characters"
                value={confirmText}
                onChangeText={setConfirmText}
              />
            </View>

            {/* Buttons */}
            <TouchableOpacity
              style={[
                styles.btnDelete,
                { backgroundColor: isFormValid ? CRITICAL_RED : "#FECACA" },
              ]}
              onPress={handleDelete}
              disabled={!isFormValid}
            >
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text style={styles.btnDeleteText}>
                Delete Account Permanently
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => router.back()}
            >
              <Text style={styles.btnCancelText}>✕ Cancel</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: { position: "absolute", left: 20, top: 55 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  scroll: { flex: 1, marginTop: -30 },
  content: { padding: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1E293B",
  },
  reasonRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  reasonTitle: { fontSize: 14, fontWeight: "bold", color: "#1E293B" },
  reasonSub: { fontSize: 11, color: "#64748B" },
  verifySub: { fontSize: 12, color: "#64748B", marginBottom: 15 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  input: { flex: 1, height: 50, fontSize: 14, color: "#1E293B" },
  borderedInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  deleteConfirmBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteConfirmText: { marginLeft: 10, fontSize: 12, color: "#475569" },
  btnDelete: {
    height: 55,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnDeleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  btnCancel: {
    height: 55,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnCancelText: { color: "#64748B", fontWeight: "600" },
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  skullBg: {
    alignSelf: "center",
    backgroundColor: "#FEE2E2",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  criticalTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 10,
  },
  criticalText: {
    textAlign: "center",
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  deletionList: {
    marginTop: 20,
    backgroundColor: "#FFF5F5",
    padding: 15,
    borderRadius: 15,
  },
  listHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  trashBg: {
    backgroundColor: "#EF4444",
    padding: 5,
    borderRadius: 6,
    marginRight: 10,
  },
  listHeaderText: { fontWeight: "bold", color: "#1E293B" },
  listItem: { flexDirection: "row", marginBottom: 12 },
  xCircle: {
    backgroundColor: "#FEE2E2",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  itemLabel: { fontWeight: "600", fontSize: 13, color: "#1E293B" },
  itemDesc: { fontSize: 11, color: "#64748B" },
  deactivateCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  orangeIcon: {
    backgroundColor: "#F59E0B",
    padding: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  orangeTitle: { fontWeight: "bold", color: "#92400E" },
  orangeText: { fontSize: 12, color: "#B45309", marginLeft: 32 },
  orangeLink: {
    color: "#B45309",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 32,
    marginTop: 8,
  },
  obligationsCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
  },
  obligationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  obligationLabel: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
    color: "#1E293B",
  },
  obligationValue: { fontWeight: "bold", color: "#DC2626" },
  reasonBtn: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  textArea: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    height: 80,
    textAlignVertical: "top",
    marginTop: 10,
  },
  headerSubtitle: {
    color: "white",
    opacity: 0.8,
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    paddingHorizontal: 20,
  },
});

export default DeleteAccount;
