// import { RELIGION_HEADER_ICON } from "@/constants/religions";
// import { useReligion } from "@/contexts/ReligionContext";
// import { saveIdentityVerification } from "@/lib/providerService";
// import { useTheme } from "@/theme/ThemeProvider";
// import {
//   FontAwesome5,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useUser } from "../../contexts/Usercontext";

// export default function IdentityVerification() {
//   const router = useRouter();
//   const { religion } = useReligion();
//   const { primary } = useTheme();
//   const { user } = useUser();

//   const [idType, setIdType] = useState<string | null>(null);
//   const [idNumber, setIdNumber] = useState("");
//   const [documentImage, setDocumentImage] = useState<string | null>(null);
//   const [selfieImage, setSelfieImage] = useState<string | null>(null);

//   const idOptions = [
//     { label: "Passport", sub: "International ID document", icon: "passport" },
//     { label: "National ID Card", sub: "Government issued ID", icon: "id-card" },
//     { label: "Driving License", sub: "Valid driver's license", icon: "car" },
//   ];

//   const handlePickDocument = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//     });
//     if (!result.canceled) {
//       setDocumentImage(result.assets[0].uri);
//     }
//   };

//   const handleTakeSelfie = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.8,
//     });
//     if (!result.canceled) {
//       setSelfieImage(result.assets[0].uri);
//     }
//   };

//   const handleContinue = async () => {
//     if (!idType) {
//       Alert.alert("Please select an ID type");
//       return;
//     }
//     if (!idNumber.trim()) {
//       Alert.alert("Please enter your ID number");
//       return;
//     }
//     if (!documentImage) {
//       Alert.alert("Please upload your ID document");
//       return;
//     }

//     try {
//       if (user?.id) {
//         await saveIdentityVerification(user.id, {
//           idType,
//           idNumber,
//           documentImage,
//           selfieImage,
//         });
//       }
//       router.push("/(provider-onboarding)/religiouscertification");
//     } catch (error) {
//       Alert.alert("Error saving verification details");
//     }
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={[styles.header, { backgroundColor: primary }]}>
//         <View style={styles.headerTopRow}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <View style={styles.stepBadge}>
//             <Text style={styles.stepText}>Step 3 of 7</Text>
//           </View>
//         </View>

//         <View style={styles.headerContent}>
//           <View style={styles.iconCircle}>
//             <MaterialCommunityIcons
//               name={RELIGION_HEADER_ICON[religion] || "account-card-details"}
//               size={32}
//               color={primary}
//             />
//           </View>
//           <Text style={styles.headerTitle}>Identity Verificationsss</Text>
//           <Text style={styles.headerSub}>
//             Secure verification for community trust
//           </Text>
//         </View>
//       </View>

//       <View style={styles.contentCard}>
//         <View style={styles.progressBarContainer}>
//           <View
//             style={[
//               styles.progressBar,
//               { backgroundColor: primary, width: "40%" },
//             ]}
//           />
//         </View>

//         <Text style={styles.label}>
//           Government ID Type <Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <Text style={styles.subLabel}>Select your preferred ID document</Text>

//         {idOptions.map((option) => (
//           <TouchableOpacity
//             key={option.label}
//             onPress={() => setIdType(option.label)}
//             style={[
//               styles.idOption,
//               idType === option.label && { borderColor: primary },
//             ]}
//           >
//             <View
//               style={[
//                 styles.radioCircle,
//                 idType === option.label && { borderColor: primary },
//               ]}
//             >
//               {idType === option.label && (
//                 <View
//                   style={[styles.radioInner, { backgroundColor: primary }]}
//                 />
//               )}
//             </View>
//             <View style={styles.idIconBox}>
//               <FontAwesome5 name={option.icon} size={20} color={primary} />
//             </View>
//             <View>
//               <Text style={styles.optionTitle}>{option.label}</Text>
//               <Text style={styles.optionSub}>{option.sub}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}

//         <Text style={styles.label}>
//           ID Number <Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <View style={styles.inputWrapper}>
//           <MaterialCommunityIcons name="pound" size={20} color="#999" />
//           <TextInput
//             value={idNumber}
//             onChangeText={setIdNumber}
//             placeholder="Enter your ID number"
//             style={styles.input}
//           />
//         </View>

//         <Text style={styles.label}>
//           Upload ID Document <Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <Text style={styles.subLabel}>
//           Upload a clear photo of your ID (front side)
//         </Text>

//         <TouchableOpacity onPress={handlePickDocument} style={styles.uploadBox}>
//           {documentImage ? (
//             <Image
//               source={{ uri: documentImage }}
//               style={styles.previewImage}
//             />
//           ) : (
//             <>
//               <View
//                 style={[
//                   styles.uploadCircle,
//                   { backgroundColor: primary + "20" },
//                 ]}
//               >
//                 <MaterialCommunityIcons
//                   name="cloud-upload"
//                   size={28}
//                   color={primary}
//                 />
//               </View>
//               <Text style={styles.uploadText}>Tap to upload document</Text>
//               <Text style={styles.uploadHint}>PNG, JPG up to 5MB</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.label}>
//           Selfie Verification{" "}
//           <Text style={styles.optionalText}>(Optional)</Text>
//         </Text>
//         <Text style={styles.subLabel}>
//           Take a selfie for enhanced verification
//         </Text>

//         <TouchableOpacity onPress={handleTakeSelfie} style={styles.uploadBox}>
//           {selfieImage ? (
//             <Image source={{ uri: selfieImage }} style={styles.previewImage} />
//           ) : (
//             <>
//               <View style={styles.uploadCircleBlue}>
//                 <MaterialCommunityIcons
//                   name="camera"
//                   size={28}
//                   color="#4A90E2"
//                 />
//               </View>
//               <Text style={styles.uploadText}>Tap to take selfie</Text>
//               <Text style={styles.uploadHint}>Clear face photo required</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <View style={styles.securityBox}>
//           <MaterialCommunityIcons name="lock" size={20} color="#4A90E2" />
//           <View style={{ flex: 1, marginLeft: 10 }}>
//             <Text style={styles.securityTitle}>Data Security</Text>
//             <Text style={styles.securityText}>
//               Your documents are encrypted and stored securely. We only use them
//               for verification purposes.
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={handleContinue}
//           style={[styles.btn, { backgroundColor: primary }]}
//         >
//           <Text style={styles.btnText}>Continue to Next Step</Text>
//           <Ionicons name="arrow-forward" size={20} color="white" />
//         </TouchableOpacity>

//         <View style={styles.footerInfo}>
//           <Ionicons name="information-circle" size={24} color="#D48806" />
//           <View style={{ marginLeft: 10, flex: 1 }}>
//             <Text style={styles.footerTitle}>Verification Timeline</Text>
//             <Text style={styles.footerText}>
//               Identity verification typically takes 24-48 hours. You'll receive
//               a notification once approved.
//             </Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 60 },
//   headerTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   stepBadge: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   stepText: { color: "white", fontWeight: "bold", fontSize: 12 },
//   headerContent: { alignItems: "center", marginTop: 10 },
//   iconCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   headerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
//   headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 5 },
//   contentCard: {
//     flex: 1,
//     backgroundColor: "white",
//     marginTop: -30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//   },
//   progressBarContainer: {
//     height: 6,
//     backgroundColor: "#eee",
//     borderRadius: 3,
//     marginBottom: 25,
//     overflow: "hidden",
//   },
//   progressBar: { height: "100%" },
//   label: { fontSize: 16, fontWeight: "700", color: "#333", marginTop: 15 },
//   subLabel: { fontSize: 13, color: "#777", marginBottom: 12 },
//   optionalText: { fontWeight: "400", color: "#999" },
//   idOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#eee",
//     borderRadius: 15,
//     marginBottom: 10,
//   },
//   radioCircle: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     borderWidth: 2,
//     borderColor: "#ccc",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   radioInner: { width: 10, height: 10, borderRadius: 5 },
//   idIconBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: "#F0F9F4",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   optionTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
//   optionSub: { fontSize: 12, color: "#888" },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#eee",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginTop: 10,
//   },
//   input: { flex: 1, paddingVertical: 12, marginLeft: 10, fontSize: 15 },
//   uploadBox: {
//     height: 160,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#ccc",
//     borderRadius: 15,
//     marginTop: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F9F9F9",
//     overflow: "hidden",
//   },
//   uploadCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   uploadCircleBlue: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#EBF3FF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   uploadText: { fontSize: 15, fontWeight: "600", color: "#333" },
//   uploadHint: { fontSize: 12, color: "#999", marginTop: 4 },
//   previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   securityBox: {
//     flexDirection: "row",
//     backgroundColor: "#EBF3FF",
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 25,
//   },
//   securityTitle: { fontSize: 14, fontWeight: "bold", color: "#2C5282" },
//   securityText: {
//     fontSize: 12,
//     color: "#2C5282",
//     marginTop: 2,
//     lineHeight: 18,
//   },
//   btn: {
//     flexDirection: "row",
//     height: 55,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 25,
//   },
//   btnText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginRight: 10,
//   },
//   footerInfo: {
//     flexDirection: "row",
//     backgroundColor: "#FFFBE6",
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#FFE58F",
//     marginBottom: 30,
//   },
//   footerTitle: { fontSize: 14, fontWeight: "bold", color: "#856404" },
//   footerText: { fontSize: 12, color: "#856404", marginTop: 2 },
// });
import { RELIGION_HEADER_ICON } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { saveIdentityVerification } from "@/lib/providerService";
import { updateVerification } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
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
  const { religion } = useReligion();
  const { primary } = useTheme();
  const { user } = useUser();
  const dispatch = useDispatch();

  // Get existing data from Redux store
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
    { label: "Passport", sub: "International ID document", icon: "passport" },
    { label: "National ID Card", sub: "Government issued ID", icon: "id-card" },
    { label: "Driving License", sub: "Valid driver's license", icon: "car" },
  ];

  // Check if coming from review screen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromReview") === "true") {
      // Optional: Show a message that they'll return to review
    }
  }, []);

  const handlePickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setDocumentImage(result.assets[0].uri);
    }
  };

  const handleTakeSelfie = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelfieImage(result.assets[0].uri);
    }
  };

  // const handleContinue = async () => {
  //   if (!idType) {
  //     Alert.alert("Selection Required", "Please select an ID type");
  //     return;
  //   }
  //   if (!idNumber.trim()) {
  //     Alert.alert("Input Required", "Please enter your ID number");
  //     return;
  //   }
  //   if (!documentImage) {
  //     Alert.alert("Upload Required", "Please upload your ID document");
  //     return;
  //   }

  //   // Prepare verification data
  //   const verificationData = {
  //     idType,
  //     idNumber,
  //     documentImage,
  //     selfieImage: selfieImage || null,
  //     verificationStatus: selfieImage ? "pending" : "document_uploaded",
  //     submittedAt: new Date().toISOString(),
  //   };

  //   try {
  //     // Save to Redux store
  //     dispatch(updateVerification(verificationData));

  //     // Save to backend if user exists
  //     if (user?.id) {
  //       await saveIdentityVerification(user.id, verificationData);
  //     }

  //     // Check if we need to return to review or go to next step
  //     const params = new URLSearchParams(window.location.search);
  //     if (
  //       params.get("fromReview") === "true" ||
  //       params.get("fromEdit") === "true"
  //     ) {
  //       router.back(); // Return to review screen
  //     } else {
  //       router.push("/(provider-onboarding)/religiouscertification");
  //     }
  //   } catch (error) {
  //     Alert.alert(
  //       "Error",
  //       "Failed to save verification details. Please try again.",
  //     );
  //     console.error("Save error:", error);
  //   }
  // };
  const { returnTo, fromReview } = useLocalSearchParams<{
    returnTo: string;
    fromReview: string;
  }>();
  const isEditing = returnTo === "review" || fromReview === "true";

  const handleContinue = async () => {
    // 1. Validations (Remain the same)
    if (!idType) {
      Alert.alert("Selection Required", "Please select an ID type");
      return;
    }
    if (!idNumber.trim()) {
      Alert.alert("Input Required", "Please enter your ID number");
      return;
    }
    if (!documentImage) {
      Alert.alert("Upload Required", "Please upload your ID document");
      return;
    }

    const verificationData = {
      idType,
      idNumber,
      documentImage,
      selfieImage: selfieImage || null,
      verificationStatus: selfieImage ? "pending" : "document_uploaded",
      submittedAt: new Date().toISOString(),
    };

    try {
      // 2. Save to Redux (Critical for Review Screen to see changes)
      dispatch(updateVerification(verificationData));

      // 3. Save to backend if user exists
      if (user?.id) {
        await saveIdentityVerification(user.id, verificationData);
      }

      // 4. Corrected Navigation Flow
      if (isEditing) {
        // Return to Review screen with the 'updated' trigger
        router.replace({
          pathname: "/(provider-onboarding)/reviewsubmit",
          params: { updated: "true" },
        });
      } else {
        // Normal onboarding flow
        router.push("/(provider-onboarding)/religiouscertification");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save verification details.");
      console.error("Save error:", error);
    }
  };
  const getIconName = (icon: string) => {
    switch (icon) {
      case "passport":
        return "passport";
      case "id-card":
        return "id-card";
      case "car":
        return "car";
      default:
        return "document";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Identity Verification</Text>
          <Text style={styles.headerSubtitle}>Step 3 of 8</Text>
        </View>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name={
              RELIGION_HEADER_ICON[
                religion as keyof typeof RELIGION_HEADER_ICON
              ] || "heart"
            }
            size={28}
            color={primary}
          />
        </View>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: "37.5%", backgroundColor: primary },
          ]}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select ID Type</Text>
        <View style={styles.idOptionsContainer}>
          {idOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.idOption,
                idType === option.label && {
                  borderColor: primary,
                  borderWidth: 2,
                },
              ]}
              onPress={() => setIdType(option.label)}
            >
              <FontAwesome5
                name={getIconName(option.icon)}
                size={24}
                color={idType === option.label ? primary : "#999"}
              />
              <View style={styles.idOptionTextContainer}>
                <Text
                  style={[
                    styles.idOptionLabel,
                    idType === option.label && {
                      color: primary,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {option.label}
                </Text>
                <Text style={styles.idOptionSub}>{option.sub}</Text>
              </View>
              {idType === option.label && (
                <Ionicons name="checkmark-circle" size={24} color={primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>ID Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your ID number"
          value={idNumber}
          onChangeText={setIdNumber}
          autoCapitalize="characters"
        />

        <Text style={styles.sectionTitle}>Upload ID Document</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePickDocument}
        >
          {documentImage ? (
            <View style={styles.uploadedContainer}>
              <Image
                source={{ uri: documentImage }}
                style={styles.uploadedImage}
              />
              <Text style={styles.changeText}>Tap to change</Text>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={32} color={primary} />
              <Text style={styles.uploadText}>
                Tap to upload your ID document
              </Text>
              <Text style={styles.uploadSubtext}>
                Passport, National ID, or Drivers License
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Selfie Verification (Optional)</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleTakeSelfie}
        >
          {selfieImage ? (
            <View style={styles.uploadedContainer}>
              <Image
                source={{ uri: selfieImage }}
                style={styles.uploadedImageSelfie}
              />
              <Text style={styles.changeText}>Tap to retake</Text>
            </View>
          ) : (
            <>
              <Ionicons name="camera-outline" size={32} color={primary} />
              <Text style={styles.uploadText}>Take a selfie</Text>
              <Text style={styles.uploadSubtext}>
                This helps verify your identity
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={primary}
          />
          <Text style={styles.infoText}>
            Your documents will be securely stored and used only for
            verification purposes.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        {/* <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: primary }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.mainButton, { backgroundColor: primary }]}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save & Return" : "Continue to Next Step"}
          </Text>
          <Ionicons
            name={isEditing ? "checkmark-circle" : "arrow-forward"}
            size={18}
            color="white"
          />
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  headerIcon: {
    padding: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  progressFill: {
    height: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 12,
    color: "#333",
  },
  idOptionsContainer: {
    marginBottom: 8,
  },
  idOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 12,
  },
  idOptionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  idOptionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  idOptionSub: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadedContainer: {
    alignItems: "center",
  },
  uploadedImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadedImageSelfie: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  changeText: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 4,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
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
  ainButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  mainButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
