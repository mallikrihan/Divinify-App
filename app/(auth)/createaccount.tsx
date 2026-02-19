// import { RELIGIONS } from "@/constants/religions";
// import { useReligion } from "@/contexts/ReligionContext";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useUser } from "../../contexts/Usercontext";

// export default function CreateAccountScreen() {
//   const { religion } = useReligion();
//   const themeColor = RELIGIONS[religion!].color;
//   const router = useRouter();
//   const { setUser } = useUser();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isQualified, setIsQualified] = useState(false);

//   const RELIGION_CATEGORIES: Record<string, string[]> = {
//     islam: ["Sunni", "Shia", "Ibadi", "Other"],
//     hindu: ["Vaishnavism", "Shaivism", "Shaktism", "Smartism"],
//     christianity: ["Catholic", "Protestant", "Orthodox"],
//   };

//   const handleContinue = () => {
//     if (!fullName || !phone || !password) {
//       alert("Please fill in the required fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     if (!agreeTerms || !isQualified) {
//       alert("Please agree to the terms and certify your status");
//       return;
//     }

//     setUser({
//       name: fullName,
//       phone,
//       email,
//     });

//     router.push("/(auth)/otp");
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={[styles.header, { backgroundColor: themeColor }]}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.headerIconCircle}>
//             <Icon name="person-add" size={30} color={themeColor} />
//           </View>
//           <Text style={styles.headerTitle}>Join as Scholar</Text>
//           <Text style={styles.headerSub}>
//             Share your knowledge, serve the community
//           </Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Create Scholar Account</Text>
//           <Text style={styles.cardSub}>
//             Begin your journey to serve the faithful
//           </Text>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Full Name</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="person-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChangeText={setFullName}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Email Address</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="mail-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="scholar@example.com"
//                 keyboardType="email-address"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Phone Number</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="call-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="+1 (555) 000-0000"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Religious Affiliation</Text>
//             <TouchableOpacity
//               style={styles.inputContainer}
//               onPress={() => setShowCategoryDropdown(true)}
//             >
//               <Icon
//                 name="business-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <Text
//                 style={[
//                   styles.inputWithIconText,
//                   { color: selectedCategory ? "#000" : "#999" },
//                 ]}
//               >
//                 {selectedCategory || "Select your religion"}
//               </Text>
//               <Icon name="chevron-down-outline" size={20} color="#999" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Password</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="lock-closed-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.inputWithIcon}
//                 secureTextEntry={!showPassword}
//                 placeholder="Create a strong password"
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.helperText}>
//               Must be at least 8 characters with uppercase, lowercase and number
//             </Text>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Confirm Password</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="lock-closed-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 style={styles.inputWithIcon}
//                 secureTextEntry={!showConfirmPassword}
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <Icon
//                   name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.checkRow}
//             onPress={() => setAgreeTerms(!agreeTerms)}
//           >
//             <View
//               style={[
//                 styles.checkbox,
//                 agreeTerms && {
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                 },
//               ]}
//             >
//               {agreeTerms && <Icon name="checkmark" size={14} color="#fff" />}
//             </View>
//             <Text style={styles.checkText}>
//               I agree to the{" "}
//               <Text style={{ color: themeColor }}>Terms & Conditions</Text> and{" "}
//               <Text style={{ color: themeColor }}>Privacy Policy</Text>
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.checkRow}
//             onPress={() => setIsQualified(!isQualified)}
//           >
//             <View
//               style={[
//                 styles.checkbox,
//                 isQualified && {
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                 },
//               ]}
//             >
//               {isQualified && <Icon name="checkmark" size={14} color="#fff" />}
//             </View>
//             <Text style={styles.checkText}>
//               I certify that I am a qualified religious scholar and will provide
//               authentic, respectful services to the community
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: themeColor }]}
//             onPress={handleContinue}
//           >
//             <Text style={styles.buttonText}>Create Account →</Text>
//           </TouchableOpacity>

//           <View style={styles.infoBoxWarn}>
//             <View style={styles.infoRow}>
//               <Icon name="time-outline" size={20} color="#B45309" />
//               <Text style={styles.infoTitle}>What Happens Next?</Text>
//             </View>
//             <Text style={styles.infoText}>
//               After registration, you ll complete a detailed onboarding process
//               including document verification, qualification details, and
//               service setup. Verification typically takes 24-48 hours.
//             </Text>
//           </View>

//           <View style={styles.infoBoxSafe}>
//             <View style={styles.infoRow}>
//               <Icon name="shield-checkmark-outline" size={20} color="#059669" />
//               <Text style={styles.infoTitleGreen}>Verification Required</Text>
//             </View>
//             <Text style={styles.infoTextGreen}>
//               All scholars undergo thorough verification to ensure community
//               trust, service quality, and authentic religious guidance.
//             </Text>
//           </View>

//           <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
//             <Text style={styles.footerText}>
//               Already have an account?{" "}
//               <Text style={{ color: themeColor, fontWeight: "700" }}>
//                 Sign In
//               </Text>
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.trustFooter}>
//             <Text style={styles.trustText}>
//               Trusted by religious communities worldwide
//             </Text>
//             <View style={styles.trustRow}>
//               <View style={styles.trustItem}>
//                 <Icon name="checkmark-circle" size={14} color={themeColor} />
//                 <Text style={styles.trustLabel}>Verified Scholars</Text>
//               </View>
//               <View style={styles.trustItem}>
//                 <Icon name="lock-closed" size={14} color={themeColor} />
//                 <Text style={styles.trustLabel}>Secure Platform</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <Modal transparent visible={showCategoryDropdown} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setShowCategoryDropdown(false)}
//         >
//           <View style={styles.dropdown}>
//             {RELIGION_CATEGORIES[religion!]?.map((cat) => (
//               <TouchableOpacity
//                 key={cat}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   setShowCategoryDropdown(false);
//                 }}
//               >
//                 <Text style={styles.dropdownText}>{cat}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: { flex: 1, backgroundColor: "#fff" },
//   container: { flex: 1, backgroundColor: "#F9FAFB" },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 80,
//     alignItems: "center",
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//   },
//   backButton: { position: "absolute", left: 20, top: 50 },
//   headerIconCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "rgba(255,255,255,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },
//   headerSub: {
//     fontSize: 14,
//     color: "rgba(255,255,255,0.8)",
//     marginTop: 5,
//     textAlign: "center",
//     paddingHorizontal: 40,
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginTop: -40,
//     marginHorizontal: 0,
//     borderTopLeftRadius: 35,
//     borderTopRightRadius: 35,
//     padding: 25,
//     paddingBottom: 50,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     color: "#111827",
//   },
//   cardSub: {
//     fontSize: 14,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 25,
//     marginTop: 4,
//   },
//   inputGroup: { marginBottom: 20 },
//   labelText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 56,
//     backgroundColor: "#fff",
//   },
//   inputIcon: { marginRight: 10 },
//   inputWithIcon: { flex: 1, fontSize: 15, color: "#111827" },
//   inputWithIconText: { flex: 1, fontSize: 15 },
//   helperText: { fontSize: 11, color: "#6B7280", marginTop: 6, lineHeight: 16 },
//   checkRow: {
//     flexDirection: "row",
//     marginBottom: 15,
//     alignItems: "flex-start",
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: "#D1D5DB",
//     marginRight: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 2,
//   },
//   checkText: { fontSize: 13, color: "#4B5563", flex: 1, lineHeight: 18 },
//   button: {
//     height: 56,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
//   infoBoxWarn: {
//     backgroundColor: "#FFFBEB",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 25,
//     borderWidth: 1,
//     borderColor: "#FEF3C7",
//   },
//   infoBoxSafe: {
//     backgroundColor: "#ECFDF5",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 15,
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//   },
//   infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
//   infoTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#92400E",
//     marginLeft: 8,
//   },
//   infoTitleGreen: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#065F46",
//     marginLeft: 8,
//   },
//   infoText: { fontSize: 13, color: "#92400E", opacity: 0.8, lineHeight: 18 },
//   infoTextGreen: {
//     fontSize: 13,
//     color: "#065F46",
//     opacity: 0.8,
//     lineHeight: 18,
//   },
//   footerText: {
//     textAlign: "center",
//     fontSize: 14,
//     color: "#6B7280",
//     marginTop: 30,
//   },
//   trustFooter: {
//     marginTop: 40,
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#F3F4F6",
//     paddingTop: 20,
//   },
//   trustText: { fontSize: 12, color: "#9CA3AF", marginBottom: 10 },
//   trustRow: { flexDirection: "row", gap: 20 },
//   trustItem: { flexDirection: "row", alignItems: "center" },
//   trustLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginLeft: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     padding: 20,
//   },
//   dropdown: { backgroundColor: "#fff", borderRadius: 16, padding: 8 },
//   dropdownItem: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//   },
//   dropdownText: { fontSize: 16, color: "#111827" },
// });
// import { RELIGIONS } from "@/constants/religions";
// import { useReligion } from "@/contexts/ReligionContext";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useUser } from "../../contexts/Usercontext";

// export default function CreateAccountScreen() {
//   const { religion } = useReligion();
//   const themeColor = RELIGIONS[religion!].color;
//   const router = useRouter();
//   const { setUser } = useUser();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isQualified, setIsQualified] = useState(false);

//   // Community states
//   const [community, setCommunity] = useState("");
//   const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

//   const RELIGION_CATEGORIES: Record<string, string[]> = {
//     islam: ["Sunni", "Shia", "Ibadi", "Other"],
//     hindu: ["Vaishnavism", "Shaivism", "Shaktism", "Smartism"],
//     christianity: ["Catholic", "Protestant", "Orthodox"],
//   };

//   const getCommunityOptions = () => {
//     if (!religion) return [];
//     return RELIGION_CATEGORIES[religion] || ["Other"];
//   };

//   const communityOptions = getCommunityOptions();
//   const primary = themeColor;

//   const handleContinue = () => {
//     if (!fullName || !phone || !password) {
//       alert("Please fill in the required fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     if (!agreeTerms || !isQualified) {
//       alert("Please agree to the terms and certify your status");
//       return;
//     }

//     setUser({
//       name: fullName,
//       phone,
//       email,
//     });

//     router.push("/(auth)/otp");
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={[styles.header, { backgroundColor: themeColor }]}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.headerIconCircle}>
//             <Icon name="person-add" size={30} color={themeColor} />
//           </View>
//           <Text style={styles.headerTitle}>Join as Scholar</Text>
//           <Text style={styles.headerSub}>
//             Share your knowledge, serve the community
//           </Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Create Scholar Account</Text>
//           <Text style={styles.cardSub}>
//             Begin your journey to serve the faithful
//           </Text>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Full Name</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="person-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChangeText={setFullName}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Email Address</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="mail-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="scholar@example.com"
//                 keyboardType="email-address"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Phone Number</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="call-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="+1 (555) 000-0000"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={setPhone}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           </View>

//           {/* COMMUNITY SECTION */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Community/Category</Text>
//             <TouchableOpacity
//               style={styles.inputContainer}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, fullName: text })
//               }
//               onPress={() => setShowCommunityDropdown(true)}
//             >
//               <Icon
//                 name="people-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <Text
//                 style={[
//                   styles.inputWithIconText,
//                   { color: community ? "#000" : "#999" },
//                 ]}
//               >
//                 {community || "Select your community"}
//               </Text>
//               <Icon name="chevron-down-outline" size={20} color="#999" />
//             </TouchableOpacity>
//           </View>

//           {/* Community Dropdown Modal */}
//           {showCommunityDropdown && (
//             <View style={styles.dropdownOverlay}>
//               <View style={styles.dropdownContainer}>
//                 <View style={styles.dropdownHeader}>
//                   <Text style={styles.dropdownTitle}>Select Community</Text>
//                   <TouchableOpacity
//                     onPress={() => setShowCommunityDropdown(false)}
//                   >
//                     <Icon name="close" size={24} color="#999" />
//                   </TouchableOpacity>
//                 </View>
//                 <ScrollView style={styles.dropdownList}>
//                   {communityOptions.map((item) => (
//                     <TouchableOpacity
//                       key={item}
//                       style={[
//                         styles.dropdownItem,
//                         community === item && {
//                           backgroundColor: `${primary}15`,
//                         },
//                       ]}
//                       onPress={() => {
//                         setCommunity(item);
//                         setShowCommunityDropdown(false);
//                       }}
//                     >
//                       <Text
//                         style={[
//                           styles.dropdownItemText,
//                           community === item && {
//                             color: primary,
//                             fontWeight: "600",
//                           },
//                         ]}
//                       >
//                         {item}
//                       </Text>
//                       {community === item && (
//                         <Icon name="checkmark" size={20} color={primary} />
//                       )}
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>
//             </View>
//           )}

//           {/* Password Fields */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Password</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="lock-closed-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="Create password"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.labelText}>Confirm Password</Text>
//             <View style={styles.inputContainer}>
//               <Icon
//                 name="lock-closed-outline"
//                 size={20}
//                 color="#999"
//                 style={styles.inputIcon}
//               />
//               <TextInput
//                 placeholder="Confirm password"
//                 secureTextEntry={!showConfirmPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 style={styles.inputWithIcon}
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <Icon
//                   name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.checkRow}
//             onPress={() => setAgreeTerms(!agreeTerms)}
//           >
//             <View
//               style={[
//                 styles.checkbox,
//                 agreeTerms && {
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                 },
//               ]}
//             >
//               {agreeTerms && <Icon name="checkmark" size={14} color="#fff" />}
//             </View>
//             <Text style={styles.checkText}>
//               I agree to the{" "}
//               <Text style={{ color: themeColor }}>Terms & Conditions</Text> and{" "}
//               <Text style={{ color: themeColor }}>Privacy Policy</Text>
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.checkRow}
//             onPress={() => setIsQualified(!isQualified)}
//           >
//             <View
//               style={[
//                 styles.checkbox,
//                 isQualified && {
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                 },
//               ]}
//             >
//               {isQualified && <Icon name="checkmark" size={14} color="#fff" />}
//             </View>
//             <Text style={styles.checkText}>
//               I certify that I am a qualified religious scholar and will provide
//               authentic, respectful services to the community
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: themeColor }]}
//             onPress={handleContinue}
//           >
//             <Text style={styles.buttonText}>Create Account →</Text>
//           </TouchableOpacity>

//           <View style={styles.infoBoxWarn}>
//             <View style={styles.infoRow}>
//               <Icon name="time-outline" size={20} color="#B45309" />
//               <Text style={styles.infoTitle}>What Happens Next?</Text>
//             </View>
//             <Text style={styles.infoText}>
//               After registration, you will complete a detailed onboarding
//               process including document verification, qualification details,
//               and service setup. Verification typically takes 24-48 hours.
//             </Text>
//           </View>

//           <View style={styles.infoBoxSafe}>
//             <View style={styles.infoRow}>
//               <Icon name="shield-checkmark-outline" size={20} color="#059669" />
//               <Text style={styles.infoTitleGreen}>Verification Required</Text>
//             </View>
//             <Text style={styles.infoTextGreen}>
//               All scholars undergo thorough verification to ensure community
//               trust, service quality, and authentic religious guidance.
//             </Text>
//           </View>

//           <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
//             <Text style={styles.footerText}>
//               Already have an account?{" "}
//               <Text style={{ color: themeColor, fontWeight: "700" }}>
//                 Sign In
//               </Text>
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.trustFooter}>
//             <Text style={styles.trustText}>
//               Trusted by religious communities worldwide
//             </Text>
//             <View style={styles.trustRow}>
//               <View style={styles.trustItem}>
//                 <Icon name="checkmark-circle" size={14} color={themeColor} />
//                 <Text style={styles.trustLabel}>Verified Scholars</Text>
//               </View>
//               <View style={styles.trustItem}>
//                 <Icon name="lock-closed" size={14} color={themeColor} />
//                 <Text style={styles.trustLabel}>Secure Platform</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <Modal transparent visible={showCategoryDropdown} animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setShowCategoryDropdown(false)}
//         >
//           <View style={styles.dropdown}>
//             {RELIGION_CATEGORIES[religion!]?.map((cat) => (
//               <TouchableOpacity
//                 key={cat}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setSelectedCategory(cat);
//                   setShowCategoryDropdown(false);
//                 }}
//               >
//                 <Text style={styles.dropdownText}>{cat}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// }

// Styles (minimal required)

import { RELIGIONS } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useUser } from "../../contexts/Usercontext";

export default function CreateAccountScreen() {
  const { religion } = useReligion();
  const themeColor = RELIGIONS[religion!].color;
  const router = useRouter();
  const { setUser } = useUser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isQualified, setIsQualified] = useState(false);

  // Community states
  const [community, setCommunity] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const RELIGION_CATEGORIES: Record<string, string[]> = {
    islam: ["Sunni", "Shia", "Ibadi", "Other"],
    hindu: ["Vaishnavism", "Shaivism", "Shaktism", "Smartism"],
    christianity: ["Catholic", "Protestant", "Orthodox"],
  };

  const getCommunityOptions = () => {
    if (!religion) return [];
    return RELIGION_CATEGORIES[religion] || ["Other"];
  };

  const communityOptions = getCommunityOptions();
  const primary = themeColor;

  const handleContinue = () => {
    if (!fullName || !phone || !password) {
      alert("Please fill in the required fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!agreeTerms || !isQualified) {
      alert("Please agree to the terms and certify your status");
      return;
    }

    setUser({
      name: fullName,
      phone,
      email,
    });

    router.push("/(auth)/otp");
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerIconCircle}>
            <Icon name="person-add" size={30} color={themeColor} />
          </View>
          <Text style={styles.headerTitle}>Join as Scholar</Text>
          <Text style={styles.headerSub}>
            Share your knowledge, serve the community
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Scholar Account</Text>
          <Text style={styles.cardSub}>
            Begin your journey to serve the faithful
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="person-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.inputWithIcon}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="mail-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="scholar@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.inputWithIcon}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="call-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="+1 (555) 000-0000"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.inputWithIcon}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* COMMUNITY SECTION */}
          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Community/Category</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowCommunityDropdown(true)}
            >
              <Icon
                name="people-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text
                style={[
                  styles.inputWithIconText,
                  { color: community ? "#000" : "#999" },
                ]}
              >
                {community || "Select your community"}
              </Text>
              <Icon name="chevron-down-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Community Dropdown Modal */}
          {showCommunityDropdown && (
            <View style={styles.dropdownOverlay}>
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownHeader}>
                  <Text style={styles.dropdownTitle}>Select Community</Text>
                  <TouchableOpacity
                    onPress={() => setShowCommunityDropdown(false)}
                  >
                    <Icon name="close" size={24} color="#999" />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.dropdownList}>
                  {communityOptions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.dropdownItem,
                        community === item && {
                          backgroundColor: `${primary}15`,
                        },
                      ]}
                      onPress={() => {
                        setCommunity(item);
                        setShowCommunityDropdown(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          community === item && {
                            color: primary,
                            fontWeight: "600",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                      {community === item && (
                        <Icon name="checkmark" size={20} color={primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

          {/* Password Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Password</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Create password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.inputWithIcon}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.inputWithIcon}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View
              style={[
                styles.checkbox,
                agreeTerms && {
                  backgroundColor: themeColor,
                  borderColor: themeColor,
                },
              ]}
            >
              {agreeTerms && <Icon name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.checkText}>
              I agree to the{" "}
              <Text style={{ color: themeColor }}>Terms & Conditions</Text> and{" "}
              <Text style={{ color: themeColor }}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setIsQualified(!isQualified)}
          >
            <View
              style={[
                styles.checkbox,
                isQualified && {
                  backgroundColor: themeColor,
                  borderColor: themeColor,
                },
              ]}
            >
              {isQualified && <Icon name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.checkText}>
              I certify that I am a qualified religious scholar and will provide
              authentic, respectful services to the community
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeColor }]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Create Account →</Text>
          </TouchableOpacity>

          <View style={styles.infoBoxWarn}>
            <View style={styles.infoRow}>
              <Icon name="time-outline" size={20} color="#B45309" />
              <Text style={styles.infoTitle}>What Happens Next?</Text>
            </View>
            <Text style={styles.infoText}>
              After registration, you'll complete a detailed onboarding process
              including document verification, qualification details, and
              service setup. Verification typically takes 24-48 hours.
            </Text>
          </View>

          <View style={styles.infoBoxSafe}>
            <View style={styles.infoRow}>
              <Icon name="shield-checkmark-outline" size={20} color="#059669" />
              <Text style={styles.infoTitleGreen}>Verification Required</Text>
            </View>
            <Text style={styles.infoTextGreen}>
              All scholars undergo thorough verification to ensure community
              trust, service quality, and authentic religious guidance.
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={{ color: themeColor, fontWeight: "700" }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.trustFooter}>
            <Text style={styles.trustText}>
              Trusted by religious communities worldwide
            </Text>
            <View style={styles.trustRow}>
              <View style={styles.trustItem}>
                <Icon name="checkmark-circle" size={14} color={themeColor} />
                <Text style={styles.trustLabel}>Verified Scholars</Text>
              </View>
              <View style={styles.trustItem}>
                <Icon name="lock-closed" size={14} color={themeColor} />
                <Text style={styles.trustLabel}>Secure Platform</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal transparent visible={showCategoryDropdown} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowCategoryDropdown(false)}
        >
          <View style={styles.dropdown}>
            {RELIGION_CATEGORIES[religion!]?.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(cat);
                  setShowCategoryDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  headerIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSub: { fontSize: 14, color: "#fff", opacity: 0.9 },
  card: { flex: 1, padding: 20 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardSub: { fontSize: 14, color: "#666", marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: { marginRight: 10 },
  inputWithIcon: { flex: 1, fontSize: 16, color: "#000" },
  inputWithIconText: { flex: 1, fontSize: 16 },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dropdownContainer: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  dropdownList: { padding: 8 },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
  dropdownItemText: { fontSize: 16, color: "#333" },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: { flex: 1, fontSize: 14, color: "#333", lineHeight: 20 },
  button: { padding: 16, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  infoBoxWarn: {
    backgroundColor: "#FEF3C7",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  infoBoxSafe: {
    backgroundColor: "#D1FAE5",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#B45309",
    marginLeft: 8,
  },
  infoTitleGreen: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
    marginLeft: 8,
  },
  infoText: { fontSize: 14, color: "#B45309" },
  infoTextGreen: { fontSize: 14, color: "#059669" },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  trustFooter: { marginTop: 20, alignItems: "center" },
  trustText: { fontSize: 12, color: "#999", marginBottom: 8 },
  trustRow: { flexDirection: "row", justifyContent: "center" },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  trustLabel: { fontSize: 12, color: "#999", marginLeft: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: "80%",
  },
  dropdownText: { fontSize: 16, color: "#333" },
});
