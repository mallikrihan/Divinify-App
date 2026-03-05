import { updatePayment } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  Code,
  CreditCard,
  Landmark,
  MapPin,
  PiggyBank,
  ShieldCheck,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useReligion } from "@/contexts/ReligionContext";
import { useTheme } from "@/theme/ThemeProvider";

export default function PaymentSetup() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const dispatch = useDispatch();

  // Get saved payment data from Redux
  const savedPayment = useSelector(
    (state: RootState) => ((state as any).onboarding?.payment || {}) as any,
  );

  // Initialize state with saved data if available
  const [accountHolder, setAccountHolder] = useState(
    savedPayment?.accountHolder || "",
  );
  const [accountNumber, setAccountNumber] = useState(
    savedPayment?.accountNumber || "",
  );
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(
    savedPayment?.accountNumber || "",
  );
  const [ifsc, setIfsc] = useState(savedPayment?.ifscCode || "");
  const [bankName, setBankName] = useState(savedPayment?.bankName || "");
  const [branchName, setBranchName] = useState(savedPayment?.branch || "");
  const [accountType, setAccountType] = useState<string | null>(
    savedPayment?.accountType || null,
  );
  const [agree, setAgree] = useState(savedPayment?.termsAccepted || false);

  // Check if coming from review screen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromReview") === "true") {
      // Optional: Show message or highlight
    }
  }, []);

  const getProgressColor = () => {
    switch (religion?.toLowerCase()) {
      case "islam":
        return "#10B981";
      case "hindu":
        return "#F59E0B";
      case "christianity":
        return "#3B82F6";
      default:
        return primary;
    }
  };

  const handleContinue = () => {
    // Validation
    if (!accountHolder.trim()) {
      Alert.alert("Required", "Enter account holder name");
      return;
    }
    if (!accountNumber.trim()) {
      Alert.alert("Required", "Enter account number");
      return;
    }
    if (accountNumber.length < 9 || accountNumber.length > 18) {
      Alert.alert("Invalid", "Account number should be 9-18 digits");
      return;
    }
    if (accountNumber !== confirmAccountNumber) {
      Alert.alert("Error", "Account numbers do not match");
      return;
    }
    if (!ifsc.trim()) {
      Alert.alert("Required", "Enter IFSC code");
      return;
    }
    if (ifsc.length !== 11) {
      Alert.alert("Invalid", "IFSC code should be 11 characters");
      return;
    }
    if (!bankName.trim()) {
      Alert.alert("Required", "Enter bank name");
      return;
    }
    if (!branchName.trim()) {
      Alert.alert("Required", "Enter branch name");
      return;
    }
    if (!accountType) {
      Alert.alert("Required", "Select account type");
      return;
    }
    if (!agree) {
      Alert.alert("Required", "You must agree to Terms & Conditions");
      return;
    }

    // Prepare payment data for Redux
    const paymentData = {
      accountHolder: accountHolder.trim(),
      accountNumber: accountNumber.trim(),
      ifscCode: ifsc.trim().toUpperCase(),
      bankName: bankName.trim(),
      branch: branchName.trim(),
      accountType: accountType,
      termsAccepted: agree,
      verified: false,
      updatedAt: new Date().toISOString(),
    };

    // Save to Redux
    dispatch(updatePayment(paymentData));

    // Check if returning to review or continue to next step
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("fromReview") === "true" ||
      params.get("fromEdit") === "true"
    ) {
      router.back();
    } else {
      router.push("/(provider-onboarding)/availabilitysetup");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* HEADER SECTION */}
        <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>

          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>Step 6 of 7</Text>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.iconCircle}>
              <Landmark color={getProgressColor()} size={28} />
            </View>
            <Text style={styles.headerTitle}>Payment Setup</Text>
            <Text style={styles.headerSubtitle}>
              Set up your payment details for earnings
            </Text>
          </View>
        </View>

        {/* WHITE CARD CONTENT */}
        <View style={styles.cardOverlap}>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { width: "85%", backgroundColor: getProgressColor() },
              ]}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <InputGroup
              label="Account Holder Name *"
              icon={<User size={18} color="#9CA3AF" />}
            >
              <TextInput
                value={accountHolder}
                onChangeText={setAccountHolder}
                placeholder="Enter name as per bank account"
                style={styles.textInput}
              />
            </InputGroup>

            <InputGroup
              label="Account Number *"
              icon={<CreditCard size={22} color="#9CA3AF" />}
            >
              <TextInput
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                placeholder="Account number"
                style={styles.textInput}
                maxLength={18}
              />
            </InputGroup>

            <InputGroup
              label="Confirm Account Number *"
              icon={<ShieldCheck size={18} color="#9CA3AF" />}
            >
              <TextInput
                value={confirmAccountNumber}
                onChangeText={setConfirmAccountNumber}
                keyboardType="numeric"
                placeholder="Re-enter account number"
                style={styles.textInput}
                maxLength={18}
              />
            </InputGroup>

            <InputGroup
              label="IFSC Code *"
              icon={<Code size={18} color="#9CA3AF" />}
            >
              <TextInput
                value={ifsc}
                onChangeText={(text) => setIfsc(text.toUpperCase())}
                autoCapitalize="characters"
                placeholder="Enter bank's IFSC code"
                style={styles.textInput}
                maxLength={11}
              />
            </InputGroup>

            <InputGroup
              label="Bank Name *"
              icon={<Building2 size={18} color="#9CA3AF" />}
            >
              <TextInput
                value={bankName}
                onChangeText={setBankName}
                placeholder="Bank name"
                style={styles.textInput}
              />
            </InputGroup>

            <InputGroup
              label="Branch Name *"
              icon={<MapPin size={18} color="#9CA3AF" />}
            >
              <TextInput
                value={branchName}
                onChangeText={setBranchName}
                placeholder="Branch name"
                style={styles.textInput}
              />
            </InputGroup>

            <Text style={styles.sectionTitle}>Account Type *</Text>

            <AccountTypeCard
              selected={accountType === "Savings Account"}
              onPress={() => setAccountType("Savings Account")}
              title="Savings Account"
              subtitle="Personal savings account"
              icon={<PiggyBank size={20} color="#10B981" />}
              activeColor={getProgressColor()}
            />

            <AccountTypeCard
              selected={accountType === "Current Account"}
              onPress={() => setAccountType("Current Account")}
              title="Current Account"
              subtitle="Business current account"
              icon={<Briefcase size={20} color="#3B82F6" />}
              activeColor={getProgressColor()}
            />
            <View style={styles.timelineBox1}>
              <Ionicons name="alert-circle" size={20} color="#3B82F6" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.timelineTitle1}>Verification Process</Text>
                <Text style={styles.timelineText1}>
                  We may contact your refrence for verification. This helps
                  maintain the quality and authenticity of our scholar network.
                </Text>
              </View>
            </View>
            <View style={styles.timelineBox}>
              <Ionicons name="shield-checkmark" size={20} color="#1E40AF" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.timelineTitle}>Privacy & Security</Text>
                <Text style={styles.timelineText}>
                  All documents are encrypted and handled with strict
                  confidentailly. Reference contacts are safety for verification
                  purposer
                </Text>
              </View>
            </View>
            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAgree(!agree)}
            >
              <View
                style={[
                  styles.checkbox,
                  agree && { backgroundColor: getProgressColor() },
                ]}
              >
                {agree && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I confirm that the above bank details are correct and I agree to
                the{" "}
                <Text style={[styles.termsLink, { color: getProgressColor() }]}>
                  Terms & Conditions
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Info Box */}

            <View style={styles.timelineBox2}>
              <Ionicons name="lock-closed" size={20} color="#10B981" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.timelineTitle2}>Secure & Encrypted</Text>
                <Text style={styles.timelineText2}>
                  All banking information is encrypted with bank-grade security.
                  We store sensitive payment details on our servers
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer with Continue Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: getProgressColor() },
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>
                {accountHolder ? "Save & Continue" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.helpButton, { backgroundColor: primary }]}
        onPress={() => {}}
      >
        <Ionicons name="information-circle-outline" size={18} color="white" />
        <View>
          <Text
            style={{
              height: 10,
              fontSize: 8,
              color: "white",
            }}
          >
            Get Help
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

// InputGroup Component
const InputGroup = ({ label, icon, children }: any) => (
  <View style={styles.inputGroup}>
    <View style={styles.labelContainer}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
    {children}
  </View>
);

// AccountTypeCard Component
const AccountTypeCard = ({
  selected,
  onPress,
  title,
  subtitle,
  icon,
  activeColor,
}: any) => (
  <TouchableOpacity
    style={[
      styles.accountTypeCard,
      selected && {
        borderColor: activeColor,
        backgroundColor: `${activeColor}10`,
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.accountTypeLeft}>
      <View
        style={[
          styles.accountTypeIcon,
          { backgroundColor: `${activeColor}20` },
        ]}
      >
        {icon}
      </View>
      <View>
        <Text style={styles.accountTypeTitle}>{title}</Text>
        <Text style={styles.accountTypeSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <View
      style={[styles.radioButton, selected && { borderColor: activeColor }]}
    >
      {selected && (
        <View style={[styles.radioInner, { backgroundColor: activeColor }]} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B82F6",
  },
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
  },
  stepBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
    right: -230,
  },
  stepText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  headerContent: {
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  cardOverlap: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
    marginTop: 8,
  },
  accountTypeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  accountTypeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  accountTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  accountTypeTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
  accountTypeSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  continueButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    top: -20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  timelineBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  timelineTitle: { color: "#1E40AF", fontWeight: "700", fontSize: 14 },
  timelineText: { color: "#1E40AF", fontSize: 12, marginTop: 2 },
  timelineBox1: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  timelineTitle1: { color: "#D97706", fontWeight: "700", fontSize: 14 },
  timelineText1: { color: "#D97706", fontSize: 12, marginTop: 2 },
  timelineBox2: {
    flexDirection: "row",
    backgroundColor: "#e1ebe7",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  timelineTitle2: { color: "#10B981", fontWeight: "700", fontSize: 14 },
  timelineText2: { color: "#10B981", fontSize: 12, marginTop: 2 },
  helpButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
