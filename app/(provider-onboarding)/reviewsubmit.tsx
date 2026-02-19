// import { useReligion } from "@/contexts/ReligionContext";
// import { RootState } from "@/store";
// import { resetOnboarding } from "@/store/onboardingSlice"; // Assuming this exists
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// export default function ReviewSubmit() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { religion } = useReligion();
//   const formData = useSelector((state: RootState) => state.onboarding);
//   const [agreed, setAgreed] = useState(false);

//   const getTheme = () => {
//     const selected = religion?.toLowerCase().trim();
//     if (selected === "islam" || selected === "muslim") {
//       return {
//         primary: "#0E9F6E",
//         secondary: "#E8F5E9",
//         label: "Islam",
//         icon: "moon",
//       };
//     }
//     if (selected === "hindu" || selected === "hinduism") {
//       return {
//         primary: "#F59E0B",
//         secondary: "#FFF3E0",
//         label: "Hinduism",
//         icon: "sunny",
//       };
//     }
//     if (selected === "christianity" || selected === "christian") {
//       return {
//         primary: "#3B82F6",
//         secondary: "#E3F2FD",
//         label: "Christianity",
//         icon: "cross",
//       };
//     }
//     return {
//       primary: "#6200EE",
//       secondary: "#F3E5F5",
//       label: religion || "Default",
//       icon: "person",
//     };
//   };

//   const theme = getTheme();

//   const handleSubmit = () => {
//     if (!agreed) {
//       Alert.alert(
//         "Agreement Required",
//         "Please agree to the Terms & Conditions to proceed.",
//       );
//       return;
//     }
//     dispatch(resetOnboarding());
//     router.push("/(provider-onboarding)/applicationreview");
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* HEADER SECTION */}
//       <View style={[styles.headerVisual, { backgroundColor: theme.primary }]}>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTopText}>Final Step</Text>
//           <Text style={styles.headerTitle}>Review & Submit</Text>
//           <Text style={styles.headerSubtext}>
//             Double check your details to ensure a smooth verification process.
//           </Text>
//         </View>
//       </View>

//       <View style={styles.content}>
//         {/* PERSONAL DETAILS */}
//         <Section
//           title="Personal Details"
//           icon="person-circle-outline"
//           theme={theme}
//           onEdit={() => router.push("/personaldetails")}
//         >
//           <DetailRow label="Full Name" value={formData.personalDetails?.name} />
//           <DetailRow
//             label="Phone Number"
//             value={formData.personalDetails?.phone}
//           />
//           <DetailRow label="Email" value={formData.personalDetails?.email} />
//           <DetailRow
//             label="Religion"
//             value={theme.label}
//             isTag
//             theme={theme}
//             tagIcon={theme.icon}
//           />
//         </Section>

//         {/* RELIGIOUS AFFILIATION */}
//         <Section
//           title="Religious Affiliation"
//           icon="business-outline"
//           theme={theme}
//           onEdit={() => router.push("/religiousaffiliation")}
//         >
//           <DetailRow
//             label="Scholar Type"
//             value={formData.religiousDetails?.scholarType}
//           />
//           <DetailRow
//             label="Specialization"
//             value={formData.religiousDetails?.specialization}
//             isMultiline
//           />
//           <DetailRow
//             label="Community"
//             value={formData.religiousDetails?.community}
//           />
//         </Section>

//         {/* VERIFICATION */}
//         <Section
//           title="Verification"
//           icon="shield-checkmark-outline"
//           theme={theme}
//           onEdit={() => router.push("/identityverification")}
//         >
//           <DetailRow
//             label="Government ID"
//             value={formData.verification?.idType || "Aadhaar Card"}
//             isVerified
//             theme={theme}
//           />
//           <DetailRow
//             label="Selfie Verification"
//             value="Completed"
//             isVerified
//             theme={theme}
//           />
//           <DetailRow
//             label="Religious Certificate"
//             value="Uploaded"
//             isVerified
//             theme={theme}
//           />
//         </Section>

//         {/* SERVICES OFFERED */}
//         <Section
//           title="Services Offered"
//           icon="Color-wand-outline"
//           theme={theme}
//           onEdit={() => router.push("/serviceoffer")}
//         >
//           {formData.services?.map((s: any, i: number) => (
//             <View
//               key={i}
//               style={[
//                 styles.serviceCard,
//                 { backgroundColor: theme.secondary + "40" },
//               ]}
//             >
//               <View style={styles.serviceInfo}>
//                 <View
//                   style={[
//                     styles.serviceIcon,
//                     { backgroundColor: theme.primary },
//                   ]}
//                 >
//                   <Ionicons name="flash" size={14} color="#fff" />
//                 </View>
//                 <Text style={styles.serviceNameText}>{s.name || s}</Text>
//               </View>
//               <Ionicons name="checkmark-done" size={18} color={theme.primary} />
//             </View>
//           ))}
//         </Section>

//         {/* AVAILABILITY */}
//         <Section
//           title="Availability"
//           icon="calendar-outline"
//           theme={theme}
//           onEdit={() => router.push("/availabilitysetup")}
//         >
//           <DetailRow label="Working Days" value="Mon - Sat" />
//           <DetailRow label="Working Hours" value="9:00 AM - 7:00 PM" />
//           <DetailRow
//             label="Service Radius"
//             value={`${formData.availability?.serviceRadius || 15} km`}
//           />
//         </Section>

//         {/* PAYMENT DETAILS */}
//         <Section
//           title="Payment Details"
//           icon="wallet-outline"
//           theme={theme}
//           onEdit={() => router.push("/paymentsetup")}
//         >
//           <DetailRow
//             label="Bank Name"
//             value={formData.payment?.bankName || "State Bank of India"}
//           />
//           <DetailRow
//             label="Account Number"
//             value={
//               formData.payment?.accountNumber
//                 ? `****${formData.payment.accountNumber.slice(-4)}`
//                 : "****1234"
//             }
//           />
//           <DetailRow label="IFSC Code" value={formData.payment?.ifsc} />
//           <DetailRow
//             label="Account Type"
//             value={formData.payment?.accountType || "Savings"}
//           />
//           <DetailRow label="PAN Number" value={formData.payment?.panNumber} />
//         </Section>

//         {/* INFO BOX */}
//         <View style={styles.infoBox}>
//           <View style={styles.infoTitleRow}>
//             <Ionicons name="information-circle" size={20} color="#3B82F6" />
//             <Text style={styles.infoTitle}>Important Information</Text>
//           </View>
//           <Text style={styles.infoText}>
//             • Your application will be reviewed within 24-48 hours
//           </Text>
//           <Text style={styles.infoText}>
//             • Background verification may take 3-5 business days
//           </Text>
//           <Text style={styles.infoText}>
//             • Once approved, you can start accepting bookings
//           </Text>
//         </View>

//         {/* AGREEMENT */}
//         <TouchableOpacity
//           style={styles.agreementRow}
//           onPress={() => setAgreed(!agreed)}
//         >
//           <Ionicons
//             name={agreed ? "checkbox" : "square-outline"}
//             size={24}
//             color={agreed ? theme.primary : "#CCC"}
//           />
//           <Text style={styles.agreementText}>
//             I confirm that all information provided is accurate. I agree to the{" "}
//             <Text style={{ color: theme.primary, fontWeight: "700" }}>
//               Terms & Conditions
//             </Text>
//             .
//           </Text>
//         </TouchableOpacity>

//         {/* SUBMIT BUTTON */}
//         <TouchableOpacity
//           style={[
//             styles.submitBtn,
//             { backgroundColor: agreed ? theme.primary : "#A1A1A1" },
//           ]}
//           onPress={handleSubmit}
//           disabled={!agreed}
//         >
//           <Text style={styles.submitBtnText}>Submit Application </Text>
//           <Ionicons name="send" size={18} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.secureFooter}>
//           <Ionicons name="lock-closed" size={14} color="#0E9F6E" />
//           <Text style={styles.secureText}>Secure & Confidential</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// function Section({ title, icon, children, onEdit, theme }: any) {
//   return (
//     <View style={styles.sectionCard}>
//       <View style={styles.sectionHeader}>
//         <View style={styles.titleGroup}>
//           <View style={[styles.iconBox, { backgroundColor: theme.secondary }]}>
//             <Ionicons name={icon} size={20} color={theme.primary} />
//           </View>
//           <Text style={styles.sectionTitle}>{title}</Text>
//         </View>
//         <TouchableOpacity onPress={onEdit} style={styles.editBtnContainer}>
//           <Ionicons name="pencil" size={14} color={theme.primary} />
//           <Text style={[styles.editBtn, { color: theme.primary }]}>Edit</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.sectionBody}>{children}</View>
//     </View>
//   );
// }

// function DetailRow({
//   label,
//   value,
//   isTag,
//   isVerified,
//   theme,
//   tagIcon,
//   isMultiline,
// }: any) {
//   return (
//     <View style={[styles.row, isMultiline && { alignItems: "flex-start" }]}>
//       <Text style={styles.label}>{label}</Text>
//       <View
//         style={[
//           styles.valBox,
//           isMultiline && { flex: 1, justifyContent: "flex-end" },
//         ]}
//       >
//         {isTag ? (
//           <View style={[styles.tag, { backgroundColor: theme.secondary }]}>
//             <Ionicons
//               name={tagIcon}
//               size={12}
//               color={theme.primary}
//               style={{ marginRight: 4 }}
//             />
//             <Text
//               style={{ color: theme.primary, fontWeight: "700", fontSize: 12 }}
//             >
//               {value}
//             </Text>
//           </View>
//         ) : (
//           <Text style={[styles.value, isMultiline && { textAlign: "right" }]}>
//             {value || "---"}
//           </Text>
//         )}
//         {isVerified && (
//           <Ionicons
//             name="checkmark-circle"
//             size={18}
//             color="#0E9F6E"
//             style={{ marginLeft: 6 }}
//           />
//         )}
//       </View>
//     </View>
//   );
// }
// import { useReligion } from "@/contexts/ReligionContext";
// import { RootState } from "@/store";
// import { resetOnboarding } from "@/store/onboardingSlice";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// export default function ReviewSubmit() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { religion } = useReligion();

//   // Accessing Redux state
//   const formData = useSelector((state: RootState) => state.onboarding);
//   const [agreed, setAgreed] = useState(false);

//   const getTheme = () => {
//     const selected = religion?.toLowerCase().trim();
//     if (selected === "islam" || selected === "muslim") {
//       return {
//         primary: "#0E9F6E",
//         secondary: "#E8F5E9",
//         label: "Islam",
//         icon: "moon",
//       };
//     }
//     if (selected === "hindu" || selected === "hinduism") {
//       return {
//         primary: "#F59E0B",
//         secondary: "#FFF3E0",
//         label: "Hinduism",
//         icon: "sunny",
//       };
//     }
//     if (selected === "christianity" || selected === "christian") {
//       return {
//         primary: "#3B82F6",
//         secondary: "#E3F2FD",
//         label: "Christianity",
//         icon: "cross",
//       };
//     }
//     return {
//       primary: "#6200EE",
//       secondary: "#F3E5F5",
//       label: religion || "Default",
//       icon: "person",
//     };
//   };

//   const theme = getTheme();

//   const handleSubmit = () => {
//     if (!agreed) {
//       Alert.alert(
//         "Agreement Required",
//         "Please agree to the Terms & Conditions to proceed.",
//       );
//       return;
//     }
//     // Final submission logic would go here (e.g., API call)
//     dispatch(resetOnboarding());
//     router.push("/(provider-onboarding)/applicationreview");
//   };
//   // In ReviewSubmit screen:
//   console.log("Received from Redux:", formData.religiousDetails);
//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={[styles.headerVisual, { backgroundColor: theme.primary }]}>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTopText}>Final Step</Text>
//           <Text style={styles.headerTitle}>Review & Submit</Text>
//           <Text style={styles.headerSubtext}>
//             Double check your details to ensure a smooth verification process.
//           </Text>
//         </View>
//       </View>

//       <View style={styles.content}>
//         {/* PERSONAL DETAILS SECTION */}
//         <Section
//           title="Personal Details"
//           icon="person-circle-outline"
//           theme={theme}
//           onEdit={() =>
//             router.push({
//               pathname: "/(provider-onboarding)/personaldetails",
//               params: { fromReview: "true" }, // Pass param to indicate coming from review
//             })
//           }
//         >
//           <DetailRow label="Full Name" value={formData.personalDetails?.name} />
//           <DetailRow
//             label="Phone Number"
//             value={formData.personalDetails?.phone}
//           />
//           <DetailRow label="Email" value={formData.personalDetails?.email} />
//           <DetailRow
//             label="Religion"
//             value={theme.label}
//             isTag
//             theme={theme}
//             tagIcon={theme.icon}
//           />
//         </Section>

//         {/* RELIGIOUS AFFILIATION SECTION */}
//         {/* <Section
//           title="Religious Affiliation"
//           icon="business-outline"
//           theme={theme}
//           onEdit={() =>
//             router.push("/(provider-onboarding)/religiousaffiliation")
//           }
//         >
//           <DetailRow
//             label="Scholar Type"
//             value={formData.religiousDetails?.scholarType}
//           />
//           <DetailRow
//             label="Specialization"
//             value={formData.religiousDetails?.specialization}
//             isMultiline
//           />
//           <DetailRow
//             label="Community"
//             value={formData.religiousDetails?.community}
//           />
//         </Section> */}
//         <Section
//           title="Religious Affiliation"
//           icon="business-outline"
//           theme={theme}
//           onEdit={() =>
//             router.push("/(provider-onboarding)/religiousaffiliation")
//           }
//         >
//           <DetailRow
//             label="Scholar Type"
//             value={formData.religiousDetails?.scholarType}
//           />
//           <DetailRow
//             label="Languages"
//             value={formData.religiousDetails?.languages?.join(", ")}
//           />
//           <DetailRow
//             label="Experience"
//             value={formData.religiousDetails?.yearsOfExperience}
//           />
//         </Section>
//         {/* VERIFICATION SECTION */}
//         <Section
//           title="Verification"
//           icon="shield-checkmark-outline"
//           theme={theme}
//           onEdit={() =>
//             router.push("/(provider-onboarding)/identityverification")
//           }
//         >
//           <DetailRow
//             label="Government ID"
//             value={formData.verification?.idType || "Aadhaar Card"}
//             isVerified
//             theme={theme}
//           />
//           <DetailRow
//             label="Selfie Verification"
//             value="Completed"
//             isVerified
//             theme={theme}
//           />
//           <DetailRow
//             label="Religious Certificate"
//             value="Uploaded"
//             isVerified
//             theme={theme}
//           />
//         </Section>

//         {/* SERVICES SECTION */}
//         <Section
//           title="Services Offered"
//           icon="color-wand-outline"
//           theme={theme}
//           onEdit={() => router.push("/(provider-onboarding)/serviceoffer")}
//         >
//           {formData.services && formData.services.length > 0 ? (
//             formData.services.map((s: any, i: number) => (
//               <View
//                 key={i}
//                 style={[
//                   styles.serviceCard,
//                   { backgroundColor: theme.secondary + "40" },
//                 ]}
//               >
//                 <View style={styles.serviceInfo}>
//                   <View
//                     style={[
//                       styles.serviceIcon,
//                       { backgroundColor: theme.primary },
//                     ]}
//                   >
//                     <Ionicons name="flash" size={14} color="#fff" />
//                   </View>
//                   <Text style={styles.serviceNameText}>{s.name || s}</Text>
//                 </View>
//                 <Ionicons
//                   name="checkmark-done"
//                   size={18}
//                   color={theme.primary}
//                 />
//               </View>
//             ))
//           ) : (
//             <Text style={styles.value}>No services selected</Text>
//           )}
//         </Section>

//         {/* INFO BOX */}
//         <View style={styles.infoBox}>
//           <View style={styles.infoTitleRow}>
//             <Ionicons name="information-circle" size={20} color="#3B82F6" />
//             <Text style={styles.infoTitle}>Important Information</Text>
//           </View>
//           <Text style={styles.infoText}>
//             • Your application will be reviewed within 24-48 hours
//           </Text>
//           <Text style={styles.infoText}>
//             • Background verification may take 3-5 business days
//           </Text>
//         </View>

//         {/* AGREEMENT & SUBMIT */}
//         <TouchableOpacity
//           style={styles.agreementRow}
//           onPress={() => setAgreed(!agreed)}
//         >
//           <Ionicons
//             name={agreed ? "checkbox" : "square-outline"}
//             size={24}
//             color={agreed ? theme.primary : "#CCC"}
//           />
//           <Text style={styles.agreementText}>
//             I confirm that all information provided is accurate. I agree to the{" "}
//             <Text style={{ color: theme.primary, fontWeight: "700" }}>
//               Terms & Conditions
//             </Text>
//             .
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.submitBtn,
//             { backgroundColor: agreed ? theme.primary : "#A1A1A1" },
//           ]}
//           onPress={handleSubmit}
//           disabled={!agreed}
//         >
//           <Text style={styles.submitBtnText}>Submit Application </Text>
//           <Ionicons name="send" size={18} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.secureFooter}>
//           <Ionicons name="lock-closed" size={14} color="#0E9F6E" />
//           <Text style={styles.secureText}>Secure & Confidential</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// // Sub-components for cleaner code
// function Section({ title, icon, children, onEdit, theme }: any) {
//   return (
//     <View style={styles.sectionCard}>
//       <View style={styles.sectionHeader}>
//         <View style={styles.titleGroup}>
//           <View style={[styles.iconBox, { backgroundColor: theme.secondary }]}>
//             <Ionicons name={icon} size={20} color={theme.primary} />
//           </View>
//           <Text style={styles.sectionTitle}>{title}</Text>
//         </View>
//         <TouchableOpacity onPress={onEdit} style={styles.editBtnContainer}>
//           <Ionicons name="pencil" size={14} color={theme.primary} />
//           <Text style={[styles.editBtn, { color: theme.primary }]}>Edit</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.sectionBody}>{children}</View>
//     </View>
//   );
// }

// function DetailRow({
//   label,
//   value,
//   isTag,
//   isVerified,
//   theme,
//   tagIcon,
//   isMultiline,
// }: any) {
//   return (
//     <View style={[styles.row, isMultiline && { alignItems: "flex-start" }]}>
//       <Text style={styles.label}>{label}</Text>
//       <View
//         style={[
//           styles.valBox,
//           isMultiline && { flex: 1, justifyContent: "flex-end" },
//         ]}
//       >
//         {isTag ? (
//           <View style={[styles.tag, { backgroundColor: theme.secondary }]}>
//             <Ionicons
//               name={tagIcon}
//               size={12}
//               color={theme.primary}
//               style={{ marginRight: 4 }}
//             />
//             <Text
//               style={{ color: theme.primary, fontWeight: "700", fontSize: 12 }}
//             >
//               {value}
//             </Text>
//           </View>
//         ) : (
//           <Text style={[styles.value, isMultiline && { textAlign: "right" }]}>
//             {value || "---"}
//           </Text>
//         )}
//         {isVerified && (
//           <Ionicons
//             name="checkmark-circle"
//             size={18}
//             color="#0E9F6E"
//             style={{ marginLeft: 6 }}
//           />
//         )}
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F0F4F8" },
//   header: {
//     padding: 30,
//     paddingTop: 50,
//     paddingBottom: 25,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerVisual: {
//     height: 220,
//     paddingHorizontal: 24,
//     paddingTop: 60,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     marginBottom: 20,
//   },
//   headerContent: {
//     alignItems: "flex-start",
//   },
//   headerTopText: {
//     color: "rgba(255,255,255,0.7)",
//     fontSize: 12,
//     fontWeight: "800",
//     textTransform: "uppercase",
//     letterSpacing: 1.2,
//     marginBottom: 4,
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 15,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   headerSubtext: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 14,
//     lineHeight: 20,
//     maxWidth: "85%",
//   },
//   content: { padding: 16, marginTop: -15 },
//   sectionCard: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   titleGroup: { flexDirection: "row", alignItems: "center" },
//   iconBox: { padding: 8, borderRadius: 12, marginRight: 12 },
//   sectionTitle: { fontSize: 17, fontWeight: "800", color: "#1A1C1E" },
//   editBtnContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
//   editBtn: { fontWeight: "700", fontSize: 13 },
//   sectionBody: { gap: 12 },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: { color: "#6B7280", fontSize: 14, fontWeight: "500" },
//   value: { color: "#111827", fontSize: 14, fontWeight: "700" },
//   valBox: { flexDirection: "row", alignItems: "center" },
//   tag: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   serviceCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 12,
//   },
//   serviceInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
//   serviceIcon: { padding: 6, borderRadius: 8 },
//   serviceNameText: { fontSize: 14, fontWeight: "700", color: "#1F2937" },
//   infoBox: {
//     backgroundColor: "#EBF5FF",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#D1E9FF",
//   },
//   infoTitleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 8,
//   },
//   infoTitle: { color: "#1E40AF", fontWeight: "800", fontSize: 15 },
//   infoText: { color: "#1E40AF", fontSize: 13, marginBottom: 4, opacity: 0.8 },
//   agreementRow: {
//     flexDirection: "row",
//     gap: 10,
//     paddingHorizontal: 4,
//     marginBottom: 20,
//   },
//   agreementText: { flex: 1, fontSize: 13, color: "#4B5563", lineHeight: 18 },
//   submitBtn: {
//     flexDirection: "row",
//     padding: 18,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//     marginBottom: 10,
//   },
//   submitBtnText: { color: "#fff", fontSize: 18, fontWeight: "800" },
//   secureFooter: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 6,
//     marginBottom: 40,
//   },
//   secureText: { fontSize: 12, color: "#0E9F6E", fontWeight: "600" },
// });
import { useReligion } from "@/contexts/ReligionContext";
import { RootState } from "@/store";
import { resetOnboarding } from "@/store/onboardingSlice";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewSubmit() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { religion } = useReligion();
  const params = useLocalSearchParams<{
    fromEdit?: string;
    updated?: string;
  }>();

  // Track if we're processing a return from edit
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Accessing Redux state - this will automatically update when Redux changes
  const formData = useSelector((state: RootState) => state.onboarding);
  const [agreed, setAgreed] = useState(false);

  // Complex focus effect to handle returns from edit screens
  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused - checking for returns from edit");
      console.log("Params:", params);

      // Check if we're returning from an edit
      if (params.fromEdit === "true" || params.updated === "true") {
        setIsRefreshing(true);

        // Clear any existing timeout
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }

        // Simulate a refresh to show updated data
        refreshTimeoutRef.current = setTimeout(() => {
          console.log("Refresh complete - data updated from Redux");
          setIsRefreshing(false);
          setLastUpdate(Date.now());

          // Clean up params without navigation
          router.setParams({ fromEdit: undefined, updated: undefined });
        }, 500);
      }

      // Cleanup timeout on unmount
      return () => {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
      };
    }, [params.fromEdit, params.updated]),
  );

  const getTheme = () => {
    const selected = religion?.toLowerCase().trim();
    if (selected === "islam" || selected === "muslim") {
      return {
        primary: "#0E9F6E",
        secondary: "#E8F5E9",
        label: "Islam",
        icon: "moon",
      };
    }
    if (selected === "hindu" || selected === "hinduism") {
      return {
        primary: "#F59E0B",
        secondary: "#FFF3E0",
        label: "Hinduism",
        icon: "sunny",
      };
    }
    if (selected === "christianity" || selected === "christian") {
      return {
        primary: "#3B82F6",
        secondary: "#E3F2FD",
        label: "Christianity",
        icon: "cross",
      };
    }
    return {
      primary: "#6200EE",
      secondary: "#F3E5F5",
      label: religion || "Default",
      icon: "person",
    };
  };

  const theme = getTheme();

  const handleSubmit = () => {
    if (!agreed) {
      Alert.alert(
        "Agreement Required",
        "Please agree to the Terms & Conditions to proceed.",
      );
      return;
    }
    // Final submission logic would go here (e.g., API call)
    dispatch(resetOnboarding());
    router.push("/(provider-onboarding)/applicationreview");
  };

  // const handleEdit = (path: string) => {
  //   // Navigate to edit screen with multiple params for complex tracking
  //   router.push({
  //     pathname: path,
  //     params: {
  //       fromReview: "true",
  //       returnTo: "review",
  //       timestamp: Date.now().toString(),
  //     },
  //   });
  // };
  const handleEdit = (path: string) => {
    router.push({
      pathname: path,
      params: {
        fromReview: "true",
        returnTo: "review",
      },
    });
  };

  // If refreshing, show loading indicator
  if (isRefreshing) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.primary + "10" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.primary }]}>
          Updating your information...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      key={lastUpdate} // Force re-render when lastUpdate changes
    >
      <View style={[styles.headerVisual, { backgroundColor: theme.primary }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTopText}>Final Step</Text>
          <Text style={styles.headerTitle}>Review & Submit</Text>
          <Text style={styles.headerSubtext}>
            Double check your details to ensure a smooth verification process.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* PERSONAL DETAILS SECTION */}
        <Section
          title="Personal Details"
          icon="person-circle-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/personaldetails")}
        >
          <DetailRow label="Full Name" value={formData.personalDetails?.name} />
          <DetailRow
            label="Phone Number"
            value={formData.personalDetails?.phone}
          />
          <DetailRow label="Email" value={formData.personalDetails?.email} />
          <DetailRow
            label="Address"
            value={formData.personalDetails?.address}
            isMultiline
          />
          <DetailRow
            label="City/State"
            value={`${formData.personalDetails?.city || ""}, ${formData.personalDetails?.state || ""}`}
          />
          <DetailRow
            label="Religion"
            value={theme.label}
            isTag
            theme={theme}
            tagIcon={theme.icon}
          />
        </Section>
        {/* RELIGIOUS AFFILIATION SECTION */}
        <Section
          title="Religious Affiliation"
          icon="business-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/religiousaffiliation")
          }
        >
          <DetailRow
            label="Scholar Type"
            value={formData.religiousDetails?.scholarType}
          />
          <DetailRow
            label="Languages"
            value={formData.religiousDetails?.languages?.join(", ")}
          />
          <DetailRow
            label="Experience"
            value={formData.religiousDetails?.yearsOfExperience}
          />
          {formData.religiousDetails?.specialization ? (
            <DetailRow
              label="Specialization"
              value={formData.religiousDetails?.specialization}
              isMultiline
            />
          ) : null}
          {/* {formData.religiousDetails?.community ? (
            <DetailRow
              label="Community"
              value={formData.religiousDetails?.community}
            />
          ) : null} */}
        </Section>
        {/* IDENTITY VERIFICATION SECTION */}
        {/* <Section
          title="Identity Verification"
          icon="shield-checkmark-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/identityverification")
          }
        >
          <DetailRow
            label="ID Type"
            value={formData.verification?.idType || "Not provided"}
          />
          <DetailRow
            label="ID Number"
            value={
              formData.verification?.idNumber
                ? `••••${formData.verification.idNumber.slice(-4)}`
                : "---"
            }
          />
          <DetailRow
            label="Document Status"
            value={
              formData.verification?.documentImage ? "Uploaded" : "Pending"
            }
            isVerified={!!formData.verification?.documentImage}
            theme={theme}
          />
          <DetailRow
            label="Selfie Status"
            value={formData.verification?.selfieImage ? "Uploaded" : "Pending"}
            isVerified={!!formData.verification?.selfieImage}
            theme={theme}
          />
          {formData.verification?.verificationStatus && (
            <DetailRow
              label="Verification Status"
              value={formData.verification.verificationStatus}
              isVerified={
                formData.verification.verificationStatus === "verified"
              }
              theme={theme}
            />
          )}
        </Section> */}
        {/* updated version code identity verification ok */}
        <Section
          title="Identity Verification"
          icon="shield-checkmark-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/identityverification")
          }
        >
          <DetailRow
            label="ID Type"
            value={formData.verification?.idType || "Not provided"}
            theme={theme}
          />
          <DetailRow
            label="ID Number"
            value={
              formData.verification?.idNumber
                ? `••••${formData.verification.idNumber.slice(-4)}`
                : "---"
            }
            theme={theme}
          />
          <DetailRow
            label="Document Status"
            value={
              formData.verification?.documentImage ? "Uploaded" : "Pending"
            }
            isVerified={!!formData.verification?.documentImage}
            theme={theme}
          />
          <DetailRow
            label="Selfie Status"
            value={formData.verification?.selfieImage ? "Uploaded" : "Pending"}
            isVerified={!!formData.verification?.selfieImage}
            theme={theme}
          />
          {formData.verification?.verificationStatus && (
            <DetailRow
              label="Verification Status"
              value={formData.verification.verificationStatus.replace("_", " ")}
              isVerified={
                formData.verification.verificationStatus === "verified"
              }
              theme={theme}
            />
          )}
          {/* Show submission time if available */}
          {formData.verification?.submittedAt && (
            <DetailRow
              label="Submitted"
              value={new Date(
                formData.verification.submittedAt,
              ).toLocaleDateString()}
              theme={theme}
            />
          )}
        </Section>
        {/* RELIGIOUS CERTIFICATION SECTION */}
        <Section
          title="Religious Certification"
          icon="school-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/religiouscertification")
          }
        >
          {formData.certification?.certificates &&
          formData.certification.certificates.length > 0 ? (
            formData.certification.certificates.map(
              (cert: any, index: number) => (
                <View key={index} style={styles.certificateItem}>
                  <Ionicons
                    name="document-text"
                    size={16}
                    color={theme.primary}
                  />
                  <Text style={styles.certificateText}>
                    {cert.name || `Certificate ${index + 1}`}
                  </Text>
                </View>
              ),
            )
          ) : (
            <DetailRow label="Certificates" value="No certificates uploaded" />
          )}

          {formData.certification?.referenceType && (
            <>
              <DetailRow
                label="Reference Type"
                value={formData.certification.referenceType}
              />
              <DetailRow
                label="Institution"
                value={formData.certification.institutionName}
              />
            </>
          )}

          {formData.certification?.referencePerson && (
            <DetailRow
              label="Reference Person"
              value={formData.certification.referencePerson}
            />
          )}
        </Section>
        {/* SERVICES SECTION */}
        {/* <Section
          title="Services Offered"
          icon="color-wand-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/serviceoffer")}
        >
          {formData.services && formData.services.length > 0 ? (
            formData.services.map((service: any, i: number) => (
              <View
                key={i}
                style={[
                  styles.serviceCard,
                  { backgroundColor: theme.secondary + "40" },
                ]}
              >
                <View style={styles.serviceInfo}>
                  <View
                    style={[
                      styles.serviceIcon,
                      { backgroundColor: theme.primary },
                    ]}
                  >
                    <Ionicons name="flash" size={14} color="#fff" />
                  </View>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceNameText}>
                      {service.name || service}
                    </Text>
                    {service.duration && (
                      <Text style={styles.serviceMeta}>
                        {service.duration} min
                      </Text>
                    )}
                  </View>
                </View>
                {service.price && (
                  <Text style={[styles.servicePrice, { color: theme.primary }]}>
                    ₹{service.price}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.value}>No services selected</Text>
          )}
        </Section> */}

        <Section
          title="Services Offered"
          icon="briefcase-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/serviceoffer")}
        >
          {formData.services?.services &&
          formData.services.services.length > 0 ? (
            <>
              {/* Service count */}
              <DetailRow
                label="Total Services"
                value={`${formData.services.services.length} service${
                  formData.services.services.length !== 1 ? "s" : ""
                }`}
                theme={theme}
              />

              {/* List each service with details */}
              {formData.services.services.map((service, index) => (
                <View key={index} style={styles.serviceItemContainer}>
                  <View style={styles.serviceHeader}>
                    <Text
                      style={[styles.serviceName, { color: theme.primary }]}
                    >
                      {service.name}
                    </Text>
                    {service.customizedPricing && (
                      <View style={styles.customizedBadge}>
                        <Text style={styles.customizedBadgeText}>
                          Customized
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.serviceDetailsGrid}>
                    <View style={styles.serviceDetail}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>{service.duration}</Text>
                    </View>

                    <View style={styles.serviceDetail}>
                      <Text style={styles.detailLabel}>Price</Text>
                      <Text style={styles.detailValue}>₹{service.price}</Text>
                    </View>

                    {service.travelCharges > 0 && (
                      <View style={styles.serviceDetail}>
                        <Text style={styles.detailLabel}>Travel</Text>
                        <Text style={styles.detailValue}>
                          ₹{service.travelCharges}
                        </Text>
                      </View>
                    )}
                  </View>

                  {service.additionalNotes && (
                    <Text style={styles.serviceNotes} numberOfLines={2}>
                      📝 {service.additionalNotes}
                    </Text>
                  )}

                  {index < formData.services.services.length - 1 && (
                    <View style={styles.serviceDivider} />
                  )}
                </View>
              ))}

              {/* Additional preferences */}
              {/* {formData.services.travelAllowed !== undefined && (
                // <DetailRow
                //   label="Travel to devotee"
                //   value={
                //     formData.services.travelAllowed ? "Allowed" : "Not allowed"
                //   }
                //   isVerified={formData.services.travelAllowed}
                //   theme={theme}
                // />
              )} */}

              {/* {formData.services.onlineAllowed !== undefined && (
                <DetailRow
                  label="Online consultations"
                  value={
                    formData.services.onlineAllowed
                      ? "Available"
                      : "Not available"
                  }
                  isVerified={formData.services.onlineAllowed}
                  theme={theme}
                />
              )} */}

              {/* Last updated */}
              {formData.services.updatedAt && (
                <DetailRow
                  label="Last updated"
                  value={new Date(
                    formData.services.updatedAt,
                  ).toLocaleDateString()}
                  theme={theme}
                />
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>No services selected</Text>
          )}
        </Section>
        {/* PAYMENT SECTION */}

        {/* <Section
          title="Payment Setup"
          icon="card-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/paymentsetup")}
        >
          <DetailRow
            label="Account Holder"
            value={formData.payment?.accountName || "---"}
          />
          <DetailRow
            label="Account Number"
            value={
              formData.payment?.accountNumber
                ? `••••${formData.payment.accountNumber.slice(-4)}`
                : "---"
            }
          />
          <DetailRow
            label="Bank Name"
            value={formData.payment?.bankName || "---"}
          />
          <DetailRow
            label="IFSC Code"
            value={formData.payment?.ifscCode || "---"}
          />
          <DetailRow label="Branch" value={formData.payment?.branch || "---"} />
          <DetailRow
            label="Account Type"
            value={formData.payment?.accountType || "---"}
          />
        </Section> */}
        {/* new payment code updated */}
        <Section
          title="Payment Setup"
          icon="card-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/paymentsetup?fromReview=true")
          }
        >
          {formData.payment ? (
            <>
              <DetailRow
                label="Account Holder"
                value={formData.payment.accountHolder || "---"}
                theme={theme}
              />
              <DetailRow
                label="Account Number"
                value={
                  formData.payment.accountNumber
                    ? `••••${formData.payment.accountNumber.slice(-4)}`
                    : "---"
                }
                theme={theme}
              />
              <DetailRow
                label="Bank Name"
                value={formData.payment.bankName || "---"}
                theme={theme}
              />
              <DetailRow
                label="IFSC Code"
                value={formData.payment.ifscCode || "---"}
                theme={theme}
              />
              <DetailRow
                label="Branch"
                value={formData.payment.branch || "---"}
                theme={theme}
              />
              <DetailRow
                label="Account Type"
                value={formData.payment.accountType || "---"}
                theme={theme}
              />

              {/* Verification Status - Optional */}
              {formData.payment.verified !== undefined && (
                <DetailRow
                  label="Verification Status"
                  value={formData.payment.verified ? "Verified" : "Pending"}
                  isVerified={formData.payment.verified}
                  theme={theme}
                />
              )}

              {/* Last Updated - Optional */}
              {formData.payment.updatedAt && (
                <DetailRow
                  label="Last Updated"
                  value={new Date(
                    formData.payment.updatedAt,
                  ).toLocaleDateString()}
                  theme={theme}
                />
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>No payment details added yet</Text>
          )}
        </Section>

        {/* AVAILABILITY SECTION */}
        {/* <Section
          title="Availability"
          icon="time-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/availabilitysetup")}
        >
          <DetailRow
            label="Service Radius"
            value={
              formData.availability?.serviceRadius
                ? `${formData.availability.serviceRadius} km`
                : "---"
            }
          />
          <DetailRow
            label="Days Available"
            value={
              formData.availability?.days
                ? Object.entries(formData.availability.days)
                    .filter(
                      ([_, slots]: [string, any]) =>
                        slots.morning || slots.afternoon || slots.evening,
                    )
                    .map(([day]) => day)
                    .join(", ")
                : "---"
            }
            isMultiline
          />
          {formData.availability?.days && (
            <View style={styles.timeSlots}>
              {Object.entries(formData.availability.days).map(
                ([day, slots]: [string, any]) => {
                  const availableTimes = [];
                  if (slots.morning) availableTimes.push("Morning");
                  if (slots.afternoon) availableTimes.push("Afternoon");
                  if (slots.evening) availableTimes.push("Evening");

                  if (availableTimes.length > 0) {
                    return (
                      <View key={day} style={styles.timeSlotRow}>
                        <Text style={styles.timeSlotDay}>{day}:</Text>
                        <Text style={styles.timeSlotValue}>
                          {availableTimes.join(", ")}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                },
              )}
            </View>
          )}
        </Section> */}

        <Section
          title="Availability"
          icon="time-outline"
          theme={theme}
          onEdit={() =>
            handleEdit(
              "/(provider-onboarding)/availabilitysetup?fromReview=true",
            )
          }
        >
          {formData.availability ? (
            <>
              {/* Service Radius */}
              <DetailRow
                label="Service Radius"
                value={
                  formData.availability.serviceRadius
                    ? `${formData.availability.serviceRadius} km`
                    : "---"
                }
                theme={theme}
              />

              {/* Days Available Summary */}
              <DetailRow
                label="Days Available"
                value={
                  formData.availability.days
                    ? Object.entries(formData.availability.days)
                        .filter(
                          ([_, slots]: [string, any]) =>
                            slots.morning?.active ||
                            slots.afternoon?.active ||
                            slots.evening?.active,
                        )
                        .map(([day]) => day)
                        .join(", ")
                    : "---"
                }
                isMultiline
                theme={theme}
              />

              {/* Detailed Time Slots */}
              {formData.availability.days && (
                <View style={styles.timeSlotsContainer}>
                  <Text style={styles.timeSlotsTitle}>Detailed Schedule:</Text>
                  {Object.entries(formData.availability.days).map(
                    ([day, slots]: [string, any]) => {
                      const activeSlots = [];

                      if (slots.morning?.active) {
                        activeSlots.push(
                          `Morning (${slots.morning.from} - ${slots.morning.to})`,
                        );
                      }
                      if (slots.afternoon?.active) {
                        activeSlots.push(
                          `Afternoon (${slots.afternoon.from} - ${slots.afternoon.to})`,
                        );
                      }
                      if (slots.evening?.active) {
                        activeSlots.push(
                          `Evening (${slots.evening.from} - ${slots.evening.to})`,
                        );
                      }

                      if (activeSlots.length > 0) {
                        return (
                          <View key={day} style={styles.timeSlotRow}>
                            <Text
                              style={[
                                styles.timeSlotDay,
                                { color: theme.primary },
                              ]}
                            >
                              {day}:
                            </Text>
                            <View style={styles.timeSlotValues}>
                              {activeSlots.map((slot, index) => (
                                <Text key={index} style={styles.timeSlotValue}>
                                  • {slot}
                                </Text>
                              ))}
                            </View>
                          </View>
                        );
                      }
                      return null;
                    },
                  )}
                </View>
              )}

              {/* Last Updated */}
              {formData.availability.updatedAt && (
                <DetailRow
                  label="Last Updated"
                  value={new Date(
                    formData.availability.updatedAt,
                  ).toLocaleDateString()}
                  theme={theme}
                />
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>No availability set yet</Text>
          )}
        </Section>
        {/* INFO BOX */}

        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <Ionicons name="information-circle" size={20} color="#3B82F6" />
            <Text style={styles.infoTitle}>Important Information</Text>
          </View>
          <Text style={styles.infoText}>
            • Your application will be reviewed within 24-48 hours
          </Text>
          <Text style={styles.infoText}>
            • Background verification may take 3-5 business days
          </Text>
          <Text style={styles.infoText}>
            • You will receive updates via email and SMS
          </Text>
        </View>
        {/* AGREEMENT & SUBMIT */}
        <TouchableOpacity
          style={styles.agreementRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={agreed ? "checkbox" : "square-outline"}
            size={24}
            color={agreed ? theme.primary : "#CCC"}
          />
          <Text style={styles.agreementText}>
            I confirm that all information provided is accurate and complete. I
            agree to the{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { backgroundColor: agreed ? theme.primary : "#A1A1A1" },
          ]}
          onPress={handleSubmit}
          disabled={!agreed}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>Submit Application</Text>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
        <View style={styles.secureFooter}>
          <Ionicons name="lock-closed" size={14} color="#0E9F6E" />
          <Text style={styles.secureText}>Secure & Confidential</Text>
          <Text style={styles.versionText}>v2.1.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Sub-components for cleaner code
function Section({ title, icon, children, onEdit, theme }: any) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleGroup}>
          <View style={[styles.iconBox, { backgroundColor: theme.secondary }]}>
            <Ionicons name={icon} size={20} color={theme.primary} />
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.editBtnContainer}
          activeOpacity={0.6}
        >
          <Ionicons name="pencil" size={14} color={theme.primary} />
          <Text style={[styles.editBtn, { color: theme.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function DetailRow({
  label,
  value,
  isTag,
  isVerified,
  theme,
  tagIcon,
  isMultiline,
}: any) {
  return (
    <View style={[styles.row, isMultiline && { alignItems: "flex-start" }]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.valBox,
          isMultiline && { flex: 1, justifyContent: "flex-end" },
        ]}
      >
        {isTag ? (
          <View style={[styles.tag, { backgroundColor: theme.secondary }]}>
            <Ionicons
              name={tagIcon}
              size={12}
              color={theme.primary}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{ color: theme.primary, fontWeight: "700", fontSize: 12 }}
            >
              {value}
            </Text>
          </View>
        ) : (
          <Text style={[styles.value, isMultiline && { textAlign: "right" }]}>
            {value || "---"}
          </Text>
        )}
        {isVerified && (
          <Ionicons
            name="checkmark-circle"
            size={18}
            color="#0E9F6E"
            style={{ marginLeft: 6 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  headerVisual: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTopText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  content: {
    padding: 16,
    marginTop: 10,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  editBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  editBtn: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  sectionBody: {
    marginLeft: 48,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  // Add these styles inside your StyleSheet
  timeSlotsContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  timeSlotsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  timeSlotRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingVertical: 4,
  },
  timeSlotDay: {
    fontSize: 13,
    fontWeight: "600",
    width: 50,
  },
  timeSlotValues: {
    flex: 1,
  },
  timeSlotValue: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 2,
    lineHeight: 18,
  },
  valBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  value: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  serviceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceNameText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  serviceMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  noDataText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  certificateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  certificateText: {
    fontSize: 14,
    color: "#1F2937",
    marginLeft: 8,
  },
  timeSlots: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  timeSlotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  timeSlotDay: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  timeSlotValue: {
    fontSize: 13,
    color: "#1F2937",
  },
  infoBox: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 6,
    lineHeight: 18,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  agreementText: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  secureFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  secureText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },
  versionText: {
    fontSize: 10,
    color: "#9CA3AF",
    position: "absolute",
    right: 0,
  },
  // Add these styles to your existing StyleSheet in reviewsubmit.tsx

  serviceItemContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "600",
  },
  customizedBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  customizedBadgeText: {
    fontSize: 10,
    color: "#D97706",
    fontWeight: "500",
  },
  serviceDetailsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  serviceDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
  serviceNotes: {
    fontSize: 12,
    color: "#4B5563",
    fontStyle: "italic",
    marginTop: 4,
  },
  serviceDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 12,
    marginBottom: 8,
  },
  noDataText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
});
