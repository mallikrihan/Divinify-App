// import { updateVerification } from "@/store/onboardingSlice";
// import { RootState } from "@/store/store";
// import { useTheme } from "@/theme/ThemeProvider";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { useUser } from "../../contexts/Usercontext";

// export default function IdentityVerification() {
//   const router = useRouter();
//   const { primary } = useTheme();
//   const { user } = useUser();
//   const dispatch = useDispatch();

//   const savedVerification = useSelector(
//     (state: RootState) => state.onboarding.verification,
//   );

//   const [idType, setIdType] = useState<string | null>(
//     savedVerification?.idType || null,
//   );
//   const [idNumber, setIdNumber] = useState(savedVerification?.idNumber || "");
//   const [documentImage, setDocumentImage] = useState<string | null>(
//     savedVerification?.documentImage || null,
//   );
//   const [selfieImage, setSelfieImage] = useState<string | null>(
//     savedVerification?.selfieImage || null,
//   );

//   const idOptions = [
//     { label: "Passport", sub: "International ID document" },
//     { label: "National ID Card", sub: "Government issued ID" },
//     { label: "Driving License", sub: "Valid driver's license" },
//   ];

//   const { returnTo, fromReview } = useLocalSearchParams<{
//     returnTo: string;
//     fromReview: string;
//   }>();
//   const isEditing = returnTo === "review" || fromReview === "true";

//   const handlePickDocument = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });
//       if (!result.canceled && result.assets[0])
//         setDocumentImage(result.assets[0].uri);
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const handleTakeSelfie = async () => {
//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });
//       if (!result.canceled && result.assets[0])
//         setSelfieImage(result.assets[0].uri);
//     } catch (error) {
//       Alert.alert("Error", "Failed to take photo");
//     }
//   };

//   const validateForm = () => {
//     if (!idType) {
//       Alert.alert("Validation Error", "Please select an ID type");
//       return false;
//     }
//     if (!idNumber.trim()) {
//       Alert.alert("Validation Error", "Please enter your ID number");
//       return false;
//     }
//     if (!documentImage) {
//       Alert.alert("Validation Error", "Please upload your ID document");
//       return false;
//     }
//     return true;
//   };

//   const handleContinue = () => {
//     if (!validateForm()) return;

//     const verificationData = {
//       idType,
//       idNumber: idNumber.trim().toUpperCase(),
//       documentImage,
//       selfieImage: selfieImage || null,
//       verificationStatus: selfieImage ? "pending" : "document_uploaded",
//       submittedAt: new Date().toISOString(),
//     };

//     dispatch(updateVerification(verificationData));

//     if (isEditing) {
//       router.replace({
//         pathname: "/(provider-onboarding)/reviewsubmit",
//         params: { updated: "true", from: "identity" },
//       });
//     } else {
//       router.push("/(provider-onboarding)/religiouscertification");
//     }
//   };

//   const handleSkip = () => {
//     Alert.alert(
//       "Skip Verification?",
//       "You can complete identity verification later.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Skip",
//           onPress: () =>
//             isEditing
//               ? router.replace("/(provider-onboarding)/reviewsubmit")
//               : router.push("/(provider-onboarding)/religiouscertification"),
//         },
//       ],
//     );
//   };

//   return (
//     <ScrollView>
//       <View style={[styles.mainContainer, { backgroundColor: primary }]}>
//         <StatusBar barStyle="light-content" />

//         <View style={styles.headerTop}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backButton}
//           >
//             <Text style={{ color: "white", fontSize: 20 }}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.stepIndicator}>Step 3 of 7</Text>
//         </View>

//         <View style={styles.headerContent}>
//           <View style={styles.iconCircle}>
//             <Text style={{ fontSize: 30 }}>🪪</Text>
//           </View>
//           <Text style={styles.titleText}>Identity Verification</Text>
//           <Text style={styles.subtitleText}>
//             Secure verification for community trust
//           </Text>
//         </View>

//         <View style={styles.formContainer}>
//           <ScrollView
//             contentContainerStyle={styles.scrollPadding}
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={styles.progressContainer}>
//               <View
//                 style={[styles.progressBase, { backgroundColor: "#F3F4F6" }]}
//               >
//                 <View
//                   style={[
//                     styles.progressFill,
//                     { width: "42%", backgroundColor: primary },
//                   ]}
//                 />
//               </View>
//             </View>

//             <Text style={styles.label}>Government ID Type *</Text>
//             <Text style={styles.subLabel}>
//               Select your preferred ID document
//             </Text>

//             {idOptions.map((option) => (
//               <TouchableOpacity
//                 key={option.label}
//                 onPress={() => setIdType(option.label)}
//                 style={[
//                   styles.idCard,
//                   idType === option.label && {
//                     borderColor: primary,
//                     backgroundColor: "#F0FDF4",
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.radioCircle,
//                     idType === option.label && { borderColor: primary },
//                   ]}
//                 >
//                   {idType === option.label && (
//                     <View
//                       style={[styles.radioInner, { backgroundColor: primary }]}
//                     />
//                   )}
//                 </View>
//                 <View>
//                   <Text style={styles.idLabelText}>{option.label}</Text>
//                   <Text style={styles.idSubText}>{option.sub}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}

//             <Text style={styles.label}>ID Number *</Text>
//             <View style={styles.inputWrapper}>
//               <TextInput
//                 placeholder="Enter your ID number"
//                 value={idNumber}
//                 onChangeText={setIdNumber}
//                 autoCapitalize="characters"
//                 style={styles.input}
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <Text style={styles.label}>Upload ID Document *</Text>
//             <Text style={styles.subLabel}>
//               Upload a clear photo of your ID (front side)
//             </Text>
//             <TouchableOpacity
//               onPress={handlePickDocument}
//               style={styles.uploadBox}
//             >
//               {documentImage ? (
//                 <Image
//                   source={{ uri: documentImage }}
//                   style={styles.fullImage}
//                 />
//               ) : (
//                 <View style={{ alignItems: "center" }}>
//                   <View style={styles.uploadCircle}>
//                     <Text style={{ fontSize: 20 }}>📤</Text>
//                   </View>
//                   <Text style={styles.uploadMainText}>
//                     Tap to upload document
//                   </Text>
//                   <Text style={styles.uploadSmallText}>PNG, JPG up to 5MB</Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <Text style={styles.label}>
//               Selfie Verification{" "}
//               <Text style={styles.optional}>(Optional)</Text>
//             </Text>
//             <Text style={styles.subLabel}>
//               Take a selfie for enhanced verification
//             </Text>
//             <TouchableOpacity
//               onPress={handleTakeSelfie}
//               style={styles.uploadBox}
//             >
//               {selfieImage ? (
//                 <Image source={{ uri: selfieImage }} style={styles.fullImage} />
//               ) : (
//                 <View style={{ alignItems: "center" }}>
//                   <View
//                     style={[
//                       styles.uploadCircle,
//                       { backgroundColor: "#DBEAFE" },
//                     ]}
//                   >
//                     <Text style={{ fontSize: 20 }}>📸</Text>
//                   </View>
//                   <Text style={styles.uploadMainText}>Tap to take selfie</Text>
//                   <Text style={styles.uploadSmallText}>
//                     Clear face photo required
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <View style={styles.securityBox}>
//               <View style={{ marginRight: 12 }}>
//                 <Text>🔒</Text>
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.securityTitle}>Data Security</Text>
//                 <Text style={styles.securityText}>
//                   Your documents are encrypted and stored securely locally.
//                 </Text>
//               </View>
//             </View>

//             <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
//               {!isEditing && (
//                 <TouchableOpacity
//                   onPress={handleSkip}
//                   style={[
//                     styles.continueButton,
//                     { flex: 0.4, backgroundColor: "#F3F4F6" },
//                   ]}
//                 >
//                   <Text style={[styles.continueText, { color: "#666" }]}>
//                     Skip
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               <TouchableOpacity
//                 onPress={handleContinue}
//                 style={[
//                   styles.continueButton,
//                   { flex: 1, backgroundColor: primary },
//                 ]}
//               >
//                 <Text style={styles.continueText}>
//                   {isEditing ? "Save & Return" : "Continue"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.timelineBox}>
//               <View style={{ marginRight: 12 }}>
//                 <Text>⏱️</Text>
//               </View>
//               <View>
//                 <Text style={styles.timelineTitle}>Verification Timeline</Text>
//                 <Text style={styles.timelineText}>
//                   Typically takes 24-48 hours.
//                 </Text>
//               </View>
//             </View>
//           </ScrollView>
//         </View>

//         <TouchableOpacity
//           onPress={() => router.push("/booking/help")}
//           style={[styles.helpButton, { backgroundColor: primary }]}
//         >
//           <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
//             ?
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// // Styles remain as you provided, ensure they are imported/defined below
// const styles = StyleSheet.create({
//   mainContainer: { flex: 1 },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
//   backButton: { padding: 8 },
//   stepIndicator: {
//     color: "white",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 20,
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   headerContent: {
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   iconCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   titleText: { color: "white", fontSize: 24, fontWeight: "bold" },
//   subtitleText: { color: "white", opacity: 0.8, fontSize: 14, marginTop: 5 },
//   formContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: "hidden",
//   },
//   scrollPadding: { padding: 24, paddingBottom: 100 },
//   progressContainer: { marginBottom: 25 },
//   progressBase: { height: 6, borderRadius: 3, width: "100%" },
//   progressFill: { height: 6, borderRadius: 3 },
//   label: { fontSize: 16, fontWeight: "700", color: "#333", marginTop: 10 },
//   subLabel: { fontSize: 13, color: "#666", marginBottom: 15, marginTop: 4 },
//   idCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//     borderRadius: 15,
//     marginBottom: 12,
//   },
//   radioCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#DDD",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   radioInner: { width: 10, height: 10, borderRadius: 5 },
//   idLabelText: { fontSize: 16, fontWeight: "600", color: "#333" },
//   idSubText: { fontSize: 12, color: "#999" },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   input: { flex: 1, height: 50, fontSize: 16, color: "#333" },
//   uploadBox: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderStyle: "dashed",
//     borderRadius: 15,
//     height: 160,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA",
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   uploadCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#A7F3D0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   uploadMainText: { fontWeight: "600", color: "#333" },
//   uploadSmallText: { fontSize: 11, color: "#999", marginTop: 4 },
//   fullImage: { width: "100%", height: "100%" },
//   optional: { fontWeight: "400", color: "#999" },
//   securityBox: {
//     flexDirection: "row",
//     backgroundColor: "#EFF6FF",
//     padding: 15,
//     borderRadius: 15,
//     marginVertical: 20,
//   },
//   securityTitle: { color: "#1E40AF", fontWeight: "700", fontSize: 14 },
//   securityText: {
//     color: "#1E40AF",
//     fontSize: 12,
//     marginTop: 2,
//     lineHeight: 18,
//   },
//   continueButton: {
//     height: 55,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   continueText: { color: "white", fontSize: 16, fontWeight: "bold" },
//   timelineBox: {
//     flexDirection: "row",
//     backgroundColor: "#FFFBEB",
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#FEF3C7",
//   },
//   timelineTitle: { color: "#92400E", fontWeight: "700", fontSize: 14 },
//   timelineText: { color: "#B45309", fontSize: 12, marginTop: 2 },
//   helpButton: {
//     position: "absolute",
//     bottom: 30,
//     right: 20,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
// });
import { updateVerification } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../contexts/Usercontext";

export default function IdentityVerification() {
  const router = useRouter();
  const { primary } = useTheme();
  const { user } = useUser();
  const dispatch = useDispatch();

  const savedVerification = useSelector(
    (state: RootState) => state.onboarding.verification,
  );

  const [idType, setIdType] = useState<string | null>(
    savedVerification?.idType || null,
  );
  const [idNumber, setIdNumber] = useState(savedVerification?.idNumber || "");
  const [documentImage, setDocumentImage] = useState<string | null>(
    savedVerification?.documentImage || null,
  );
  const [selfieImage, setSelfieImage] = useState<string | null>(
    savedVerification?.selfieImage || null,
  );

  const idOptions = [
    { label: "Passport", sub: "International ID document", icon: "🛂" },
    { label: "National ID Card", sub: "Government issued ID", icon: "🆔" },
    { label: "Driving License", sub: "Valid driver's license", icon: "🚗" },
  ];

  const { returnTo, fromReview } = useLocalSearchParams<{
    returnTo: string;
    fromReview: string;
  }>();
  const isEditing = returnTo === "review" || fromReview === "true";

  const handlePickDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0])
        setDocumentImage(result.assets[0].uri);
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleTakeSelfie = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0])
        setSelfieImage(result.assets[0].uri);
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const validateForm = () => {
    if (!idType) {
      Alert.alert("Validation Error", "Please select an ID type");
      return false;
    }
    if (!idNumber.trim()) {
      Alert.alert("Validation Error", "Please enter your ID number");
      return false;
    }
    if (!documentImage) {
      Alert.alert("Validation Error", "Please upload your ID document");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    const verificationData = {
      idType,
      idNumber: idNumber.trim().toUpperCase(),
      documentImage,
      selfieImage: selfieImage || null,
      verificationStatus: selfieImage ? "pending" : "document_uploaded",
      submittedAt: new Date().toISOString(),
    };

    dispatch(updateVerification(verificationData));

    if (isEditing) {
      router.replace({
        pathname: "/(provider-onboarding)/reviewsubmit",
        params: { updated: "true", from: "identity" },
      });
    } else {
      router.push("/(provider-onboarding)/religiouscertification");
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Verification?",
      "You can complete identity verification later.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: () =>
            isEditing
              ? router.replace("/(provider-onboarding)/reviewsubmit")
              : router.push("/(provider-onboarding)/religiouscertification"),
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={[styles.header, { backgroundColor: primary }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>Step 3 of 7</Text>
            </View>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <Text style={styles.headerIcon}>🛡️</Text>
            </View>
            <Text style={styles.headerTitle}>Verify Your Identity</Text>
            <Text style={styles.headerSubtitle}>
              Secure verification for community trust
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: "42%", backgroundColor: primary },
                ]}
              />
            </View>
          </View>

          {/* ID Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Government ID Type</Text>
            <Text style={styles.sectionSubtitle}>
              Select your preferred ID document
            </Text>

            {idOptions.map((option) => (
              <TouchableOpacity
                key={option.label}
                onPress={() => setIdType(option.label)}
                style={[
                  styles.optionCard,
                  idType === option.label && styles.optionCardSelected,
                  idType === option.label && { borderColor: primary },
                ]}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.label}</Text>
                  <Text style={styles.optionSubtitle}>{option.sub}</Text>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    idType === option.label && { borderColor: primary },
                  ]}
                >
                  {idType === option.label && (
                    <View
                      style={[styles.radioInner, { backgroundColor: primary }]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* ID Number Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ID Number</Text>
            <Text style={styles.sectionSubtitle}>
              Enter your ID number as shown on your document
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="e.g., AB123456"
                value={idNumber}
                onChangeText={setIdNumber}
                autoCapitalize="characters"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Document Upload */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upload ID Document</Text>
            <Text style={styles.sectionSubtitle}>
              Upload a clear photo of your ID (front side)
            </Text>
            <TouchableOpacity
              onPress={handlePickDocument}
              style={styles.uploadArea}
            >
              {documentImage ? (
                <Image
                  source={{ uri: documentImage }}
                  style={styles.uploadedImage}
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <View
                    style={[
                      styles.uploadIconCircle,
                      { backgroundColor: primary + "20" },
                    ]}
                  >
                    <Text style={[styles.uploadIcon, { color: primary }]}>
                      📄
                    </Text>
                  </View>
                  <Text style={styles.uploadTitle}>Tap to upload document</Text>
                  <Text style={styles.uploadHint}>PNG, JPG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Selfie Upload */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Selfie Verification</Text>
              <View style={styles.optionalBadge}>
                <Text style={styles.optionalText}>Optional</Text>
              </View>
            </View>
            <Text style={styles.sectionSubtitle}>
              Take a selfie for enhanced verification
            </Text>
            <TouchableOpacity
              onPress={handleTakeSelfie}
              style={styles.uploadArea}
            >
              {selfieImage ? (
                <Image
                  source={{ uri: selfieImage }}
                  style={styles.uploadedImage}
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <View
                    style={[
                      styles.uploadIconCircle,
                      { backgroundColor: "#DBEAFE" },
                    ]}
                  >
                    <Text style={styles.uploadIcon}>📸</Text>
                  </View>
                  <Text style={styles.uploadTitle}>Tap to take selfie</Text>
                  <Text style={styles.uploadHint}>
                    Clear face photo required
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={styles.securityCard}>
            <View style={styles.securityIconContainer}>
              <Text style={styles.securityIcon}>🔒</Text>
            </View>
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Data Security</Text>
              <Text style={styles.securityText}>
                Your documents are encrypted and stored securely. We only use
                them for verification purposes and never share with third
                parties.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={handleContinue}
              style={[
                styles.actionButton,
                styles.continueButton,
                { backgroundColor: primary },
                isEditing && styles.fullWidthButton,
              ]}
            >
              <Text style={styles.continueButtonText}>
                {isEditing ? "Save & Return" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Timeline Info */}
          <View style={styles.timelineCard}>
            <View style={styles.timelineIconContainer}>
              <Text style={styles.timelineIcon}>⏱️</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Verification Timeline</Text>
              <Text style={styles.timelineText}>
                Identity verification typically takes 24–48 hours. You will
                receive a notification once approved.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Help Button */}
        <TouchableOpacity
          onPress={() => router.push("/booking/help")}
          style={[styles.helpButton, { backgroundColor: primary }]}
        >
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: "white",
    fontSize: 20,
  },
  headerBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  headerBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  headerContent: {
    alignItems: "center",
  },
  headerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerIcon: {
    fontSize: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  progressContainer: {
    marginBottom: 25,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 15,
  },
  optionalBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  optionalText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  optionCardSelected: {
    backgroundColor: "#F0FDF4",
    borderWidth: 2,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  uploadArea: {
    height: 180,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 15,
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadIcon: {
    fontSize: 24,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 12,
    color: "#999",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  securityCard: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  securityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  securityIcon: {
    fontSize: 20,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 4,
  },
  securityText: {
    fontSize: 12,
    color: "#1E40AF",
    lineHeight: 18,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    flex: 1,
  },
  skipButton: {
    flex: 0.4,
    backgroundColor: "#F3F4F6",
  },
  fullWidthButton: {
    flex: 1,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  timelineCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  timelineIcon: {
    fontSize: 20,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 12,
    color: "#B45309",
    lineHeight: 18,
  },
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
  helpButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
