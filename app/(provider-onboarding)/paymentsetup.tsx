// import { useRouter } from "expo-router";
// import {
//   Briefcase,
//   Building2,
//   ChevronLeft,
//   Code,
//   Hash,
//   Info,
//   Landmark,
//   Lock,
//   MapPin,
//   PiggyBank,
//   ShieldCheck,
//   User,
// } from "lucide-react-native";
// import { useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useReligion } from "@/contexts/ReligionContext";
// import { useTheme } from "@/theme/ThemeProvider";

// export default function PaymentSetup() {
//   const router = useRouter();
//   const { religion } = useReligion();
//   const { primary } = useTheme();

//   const [accountHolder, setAccountHolder] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [branchName, setBranchName] = useState("");
//   const [accountType, setAccountType] = useState<string | null>(null);
//   const [agree, setAgree] = useState(false);

//   const getProgressColor = () => {
//     switch (religion?.toLowerCase()) {
//       case "islam":
//         return "#10B981";
//       case "hindu":
//         return "#F59E0B";
//       case "christianity":
//         return "#3B82F6";
//       default:
//         return primary;
//     }
//   };

//   const handleContinue = () => {
//     if (!accountHolder.trim()) {
//       Alert.alert("Required", "Enter account holder name");
//       return;
//     }
//     if (!accountNumber.trim()) {
//       Alert.alert("Required", "Enter account number");
//       return;
//     }
//     if (accountNumber !== confirmAccountNumber) {
//       Alert.alert("Error", "Account numbers do not match");
//       return;
//     }
//     if (!ifsc.trim()) {
//       Alert.alert("Required", "Enter IFSC code");
//       return;
//     }
//     if (!bankName.trim()) {
//       Alert.alert("Required", "Enter bank name");
//       return;
//     }
//     if (!branchName.trim()) {
//       Alert.alert("Required", "Enter branch name");
//       return;
//     }
//     if (!accountType) {
//       Alert.alert("Required", "Select account type");
//       return;
//     }
//     if (!agree) {
//       Alert.alert("Required", "You must agree to Terms & Conditions");
//       return;
//     }

//     router.push("/(provider-onboarding)/availabilitysetup");
//   };

//   return (
//     <View style={styles.container}>
//       {/* HEADER SECTION */}
//       <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.backButton}
//         >
//           <ChevronLeft color="#fff" size={24} />
//         </TouchableOpacity>

//         <View style={styles.stepBadge}>
//           <Text style={styles.stepText}>Step 6 of 7</Text>
//         </View>

//         <View style={styles.headerContent}>
//           <View style={styles.iconCircle}>
//             <Landmark color={getProgressColor()} size={28} />
//           </View>
//           <Text style={styles.headerTitle}>Payment Setup</Text>
//           <Text style={styles.headerSubtitle}>
//             Set up your payment details for earnings
//           </Text>
//         </View>
//       </View>

//       {/* WHITE CARD CONTENT */}
//       <View style={styles.cardOverlap}>
//         <View style={styles.progressContainer}>
//           <View
//             style={[
//               styles.progressBar,
//               { width: "85%", backgroundColor: getProgressColor() },
//             ]}
//           />
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         >
//           <InputGroup
//             label="Account Holder Name *"
//             icon={<User size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={accountHolder}
//               onChangeText={setAccountHolder}
//               placeholder="Enter name as per bank account"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <InputGroup
//             label="Account Number *"
//             icon={<Hash size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={accountNumber}
//               onChangeText={setAccountNumber}
//               keyboardType="numeric"
//               placeholder="Account number"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <InputGroup
//             label="Confirm Account Number *"
//             icon={<ShieldCheck size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={confirmAccountNumber}
//               onChangeText={setConfirmAccountNumber}
//               keyboardType="numeric"
//               placeholder="Re-enter account number"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <InputGroup
//             label="IFSC Code *"
//             icon={<Code size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={ifsc}
//               onChangeText={setIfsc}
//               autoCapitalize="characters"
//               placeholder="Enter bank's IFSC code"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <InputGroup
//             label="Bank Name *"
//             icon={<Building2 size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={bankName}
//               onChangeText={setBankName}
//               placeholder="Bank name"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <InputGroup
//             label="Branch Name *"
//             icon={<MapPin size={18} color="#9CA3AF" />}
//           >
//             <TextInput
//               value={branchName}
//               onChangeText={setBranchName}
//               placeholder="Branch name"
//               style={styles.textInput}
//             />
//           </InputGroup>

//           <Text style={styles.sectionTitle}>Account Type *</Text>
//           <AccountTypeCard
//             selected={accountType === "Savings Account"}
//             onPress={() => setAccountType("Savings Account")}
//             title="Savings Account"
//             subtitle="Personal savings account"
//             icon={<PiggyBank size={20} color="#10B981" />}
//             activeColor={getProgressColor()}
//           />

//           <AccountTypeCard
//             selected={accountType === "Current Account"}
//             onPress={() => setAccountType("Current Account")}
//             title="Current Account"
//             subtitle="Business current account"
//             icon={<Briefcase size={20} color="#3B82F6" />}
//             activeColor={getProgressColor()}
//           />

//           {/* EARNINGS INFO BOX */}
//           <View style={styles.infoBox}>
//             <Info size={18} color="#3B82F6" />
//             <View style={{ flex: 1, marginLeft: 12 }}>
//               <Text style={styles.infoTitle}>Earnings Information</Text>
//               <Text style={styles.infoBullet}>
//                 • Payments are processed weekly
//               </Text>
//               <Text style={styles.infoBullet}>
//                 • Minimum payout threshold: ₹500
//               </Text>
//               <Text style={styles.infoBullet}>
//                 • Platform fee: 15% of service amount
//               </Text>
//               <Text style={styles.infoBullet}>
//                 • TDS applicable as per government rules
//               </Text>
//             </View>
//           </View>

//           {/* VERIFICATION BOX */}
//           <View style={styles.verifyBox}>
//             <ShieldCheck size={20} color="#D97706" />
//             <View style={{ flex: 1, marginLeft: 12 }}>
//               <Text style={styles.verifyTitle}>Bank Verification</Text>
//               <Text style={styles.verifyText}>
//                 We will verify your bank details with a small test deposit. This
//                 ensures secure and accurate payments.
//               </Text>
//             </View>
//           </View>

//           {/* TERMS CHECKBOX */}
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => setAgree(!agree)}
//             style={styles.termsContainer}
//           >
//             <View
//               style={[
//                 styles.checkbox,
//                 agree && {
//                   backgroundColor: getProgressColor(),
//                   borderColor: getProgressColor(),
//                 },
//               ]}
//             >
//               {agree && <View style={styles.checkInner} />}
//             </View>
//             <Text style={styles.termsText}>
//               I agree to the{" "}
//               <Text style={{ color: getProgressColor(), fontWeight: "700" }}>
//                 Terms & Conditions
//               </Text>{" "}
//               and{" "}
//               <Text style={{ color: getProgressColor(), fontWeight: "700" }}>
//                 Payment Policy
//               </Text>
//             </Text>
//           </TouchableOpacity>

//           {/* SECURITY BADGE */}
//           <View style={styles.securityBadge}>
//             <Lock size={16} color="#059669" />
//             <View style={{ marginLeft: 10, flex: 1 }}>
//               <Text style={styles.securityTitle}>Secure & Encrypted</Text>
//               <Text style={styles.securityText}>
//                 All banking information is encrypted with bank-grade security.
//               </Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={handleContinue}
//             style={[
//               styles.continueButton,
//               { backgroundColor: getProgressColor() },
//             ]}
//           >
//             <Text style={styles.continueButtonText}>
//               Continue to Next Step →
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// /* ---------------- HELPER COMPONENTS ---------------- */

// const InputGroup = ({ label, children, icon }: any) => (
//   <View style={styles.inputGroup}>
//     <Text style={styles.inputLabel}>{label}</Text>
//     <View style={styles.inputWrapper}>
//       <View style={styles.inputIcon}>{icon}</View>
//       {children}
//     </View>
//   </View>
// );

// const AccountTypeCard = ({
//   selected,
//   onPress,
//   title,
//   subtitle,
//   icon,
//   activeColor,
// }: any) => (
//   <TouchableOpacity
//     onPress={onPress}
//     activeOpacity={0.8}
//     style={[
//       styles.typeCard,
//       selected && { borderColor: activeColor, backgroundColor: "#F9FAFB" },
//     ]}
//   >
//     <View style={[styles.radio, selected && { borderColor: activeColor }]}>
//       {selected && (
//         <View style={[styles.radioFill, { backgroundColor: activeColor }]} />
//       )}
//     </View>
//     <View style={styles.typeIconBox}>{icon}</View>
//     <View>
//       <Text style={styles.typeTitle}>{title}</Text>
//       <Text style={styles.typeSubtitle}>{subtitle}</Text>
//     </View>
//   </TouchableOpacity>
// );

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     height: 240,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },
//   backButton: { position: "absolute", left: 20, top: 50 },
//   stepBadge: {
//     position: "absolute",
//     right: 20,
//     top: 50,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//   },
//   stepText: { color: "#fff", fontSize: 12, fontWeight: "600" },
//   headerContent: { alignItems: "center", marginTop: 10 },
//   iconCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
//   headerSubtitle: {
//     color: "rgba(255,255,255,0.8)",
//     textAlign: "center",
//     fontSize: 13,
//   },
//   cardOverlap: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -35,
//     paddingHorizontal: 20,
//   },
//   progressContainer: {
//     height: 6,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 3,
//     marginVertical: 20,
//     overflow: "hidden",
//   },
//   progressBar: { height: "100%" },
//   inputGroup: { marginBottom: 16 },
//   inputLabel: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#374151",
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//   },
//   inputIcon: { marginRight: 10 },
//   textInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: "#1F2937" },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#374151",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   typeCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//   },
//   radio: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#D1D5DB",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   radioFill: { width: 10, height: 10, borderRadius: 5 },
//   typeIconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F3F4F6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   typeTitle: { fontSize: 15, fontWeight: "700", color: "#1F2937" },
//   typeSubtitle: { fontSize: 12, color: "#6B7280" },
//   infoBox: {
//     backgroundColor: "#EFF6FF",
//     padding: 16,
//     borderRadius: 12,
//     marginVertical: 10,
//   },
//   infoTitle: {
//     color: "#1E40AF",
//     fontWeight: "700",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   infoBullet: { color: "#1E40AF", fontSize: 12, marginBottom: 2 },
//   verifyBox: {
//     backgroundColor: "#FFFBEB",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#FEF3C7",
//     marginBottom: 20,
//   },
//   verifyTitle: {
//     color: "#92400E",
//     fontWeight: "700",
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   verifyText: { color: "#92400E", fontSize: 12, lineHeight: 18 },
//   termsContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 20,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 4,
//     marginRight: 10,
//     marginTop: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkInner: {
//     width: 10,
//     height: 10,
//     backgroundColor: "#fff",
//     borderRadius: 2,
//   },
//   termsText: { fontSize: 12, color: "#4B5563", flex: 1, lineHeight: 18 },
//   securityBadge: {
//     flexDirection: "row",
//     backgroundColor: "#ECFDF5",
//     padding: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   securityTitle: { fontSize: 13, fontWeight: "700", color: "#065F46" },
//   securityText: { fontSize: 11, color: "#065F46" },
//   continueButton: {
//     padding: 16,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   continueButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
// });
import { updatePayment } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  Code,
  Hash,
  Info,
  Landmark,
  MapPin,
  PiggyBank,
  ShieldCheck,
  User
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
    (state: RootState) => state.onboarding.payment,
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
            icon={<Hash size={18} color="#9CA3AF" />}
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
          <View style={styles.infoBox}>
            <Info size={20} color={getProgressColor()} />
            <Text style={styles.infoText}>
              Payments will be processed within 3-5 business days after service
              completion. Make sure your bank details are correct to avoid
              payment delays.
            </Text>
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
    backgroundColor: "#f5f5f5",
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
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
