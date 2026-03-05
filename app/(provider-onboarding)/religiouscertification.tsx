// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import { useReligion } from "@/contexts/ReligionContext";
// import { saveReligiousCertification } from "@/lib/providerService";
// import { updateCertification } from "@/store/onboardingSlice";
// import { RootState } from "@/store/store";
// import { useTheme } from "@/theme/ThemeProvider";
// import { useUser } from "../../contexts/Usercontext";

// export default function ReligiousCertification() {
//   const router = useRouter();
//   const { religion } = useReligion();
//   const { primary } = useTheme();
//   const { user } = useUser();
//   const dispatch = useDispatch();

//   // Get saved certification data from Redux
//   const savedCertification = useSelector(
//     (state: RootState) => state.onboarding.certification,
//   );

//   // Initialize state with saved data if available
//   const [certificateFile, setCertificateFile] = useState<string | null>(
//     savedCertification?.certificates?.[0]?.file || null,
//   );
//   const [referenceType, setReferenceType] = useState<string | null>(
//     savedCertification?.referenceType || null,
//   );
//   const [institutionName, setInstitutionName] = useState(
//     savedCertification?.institutionName || "",
//   );
//   const [referencePerson, setReferencePerson] = useState(
//     savedCertification?.referencePerson || "",
//   );
//   const [contactPhone, setContactPhone] = useState(
//     savedCertification?.referencePhone || "",
//   );
//   const [referenceLetter, setReferenceLetter] = useState<string | null>(
//     savedCertification?.referenceLetter || null,
//   );

//   // Check if coming from review screen
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("fromReview") === "true") {
//       // Optional: Show message or highlight
//     }
//   }, []);

//   // 🎨 DYNAMIC THEME COLOR
//   const activeColor = religion === "islam" ? "#00A86B" : primary;
//   const activeBg = religion === "islam" ? "#F0F9F4" : "#f5f5f5";

//   const handleUploadCertificate = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.8,
//     });
//     if (!result.canceled) setCertificateFile(result.assets[0].uri);
//   };

//   const handleUploadLetter = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.8,
//     });
//     if (!result.canceled) setReferenceLetter(result.assets[0].uri);
//   };

//   const referenceOptions = getReferenceOptions(religion);

//   const handleContinue = async () => {
//     if (!certificateFile) return Alert.alert("Upload religious certificate");
//     if (!referenceType) return Alert.alert("Select reference type");
//     if (!institutionName.trim()) return Alert.alert("Enter institution name");
//     if (!referencePerson.trim())
//       return Alert.alert("Enter reference contact name");
//     if (!contactPhone.trim()) return Alert.alert("Enter contact phone");

//     // Prepare certification data for Redux
//     const certificationData = {
//       certificates: [
//         {
//           id: Date.now().toString(),
//           name: "Religious Certificate",
//           file: certificateFile,
//           issueDate: new Date().toISOString(),
//         },
//       ],
//       referenceType: referenceType,
//       institutionName: institutionName.trim(),
//       referencePerson: referencePerson.trim(),
//       referencePhone: contactPhone.trim(),
//       referenceEmail: "", // You can add email field if needed
//       referenceLetter: referenceLetter,
//     };

//     // Save to Redux
//     dispatch(updateCertification(certificationData));

//     try {
//       const idToUse = user?.id || "temp_provider_id";
//       await saveReligiousCertification(idToUse, {
//         certificateFile,
//         referenceType,
//         institutionName,
//         referencePerson,
//         contactPhone,
//         referenceLetter,
//       });

//       // Check if returning to review
//       const params = new URLSearchParams(window.location.search);
//       if (
//         params.get("fromReview") === "true" ||
//         params.get("fromEdit") === "true"
//       ) {
//         router.back();
//       } else {
//         router.push("/(provider-onboarding)/serviceoffer");
//       }
//     } catch (error) {
//       // Still navigate even if API fails (for now)
//       const params = new URLSearchParams(window.location.search);
//       if (
//         params.get("fromReview") === "true" ||
//         params.get("fromEdit") === "true"
//       ) {
//         router.back();
//       } else {
//         router.push("/(provider-onboarding)/serviceoffer");
//       }
//     }
//   };
//   return (
//     <View style={{ flex: 1, backgroundColor: activeColor }}>
//       <ScrollView bounces={false} style={styles.container}>
//         <View style={[styles.header, { backgroundColor: activeColor }]}>
//           <View style={styles.headerTop}>
//             <View style={{ top: 10 }}>
//               <TouchableOpacity onPress={() => router.back()}>
//                 <Ionicons name="arrow-back" size={24} color="white" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.stepText}>Step 4 of 7</Text>
//           </View>
//           <View style={styles.whiteBadge}>
//             <MaterialCommunityIcons
//               name="certificate"
//               size={30}
//               color={activeColor}
//             />
//           </View>
//           <Text style={styles.headerTitle}>Religious Certification</Text>
//           <Text style={styles.headerSubtitle}>
//             Upload your religious qualifications
//           </Text>
//         </View>

//         <View style={styles.formCard}>
//           {/* DYNAMIC PROGRESS BAR COLOR */}
//           <View style={styles.progressBarBg}>
//             <View
//               style={[
//                 styles.progressBarFill,
//                 { backgroundColor: activeColor, width: "60%" },
//               ]}
//             />
//           </View>

//           <Text style={styles.label}>Religious Certificates *</Text>
//           <TouchableOpacity
//             onPress={handleUploadCertificate}
//             style={styles.uploadBox}
//           >
//             <Ionicons
//               name="cloud-upload-outline"
//               size={32}
//               color={activeColor}
//             />
//             <Text style={styles.uploadText}>
//               {certificateFile
//                 ? "Certificate Selected ✓"
//                 : "Tap to upload certificate"}
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.label}>Reference Type *</Text>
//           {referenceOptions.map((option) => (
//             <TouchableOpacity
//               key={option}
//               onPress={() => setReferenceType(option)}
//               style={[
//                 styles.radioItem,
//                 referenceType === option && {
//                   borderColor: activeColor,
//                   backgroundColor: activeBg,
//                 },
//               ]}
//             >
//               <View
//                 style={[
//                   styles.radioCircle,
//                   referenceType === option && { borderColor: activeColor },
//                 ]}
//               >
//                 {referenceType === option && (
//                   <View
//                     style={[
//                       styles.radioInner,
//                       { backgroundColor: activeColor },
//                     ]}
//                   />
//                 )}
//               </View>
//               <Text style={styles.radioText}>{option}</Text>
//             </TouchableOpacity>
//           ))}

//           <Text style={styles.inputTitle}>Institution Name *</Text>
//           <View style={styles.inputWrapper}>
//             <Ionicons
//               name="business-outline"
//               size={20}
//               color="#999"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               value={institutionName}
//               onChangeText={setInstitutionName}
//               placeholder="Enter institution name"
//               style={styles.textInput}
//             />
//           </View>

//           <Text style={styles.inputTitle}>Reference Contact *</Text>
//           <View style={styles.inputWrapper}>
//             <Ionicons
//               name="person-outline"
//               size={20}
//               color="#999"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               value={referencePerson}
//               onChangeText={setReferencePerson}
//               placeholder="Reference person name"
//               style={styles.textInput}
//             />
//           </View>

//           <Text style={styles.inputTitle}>Contact Phone *</Text>
//           <View style={styles.inputWrapper}>
//             <Ionicons
//               name="call-outline"
//               size={20}
//               color="#999"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               value={contactPhone}
//               onChangeText={setContactPhone}
//               placeholder="Reference phone"
//               keyboardType="phone-pad"
//               style={styles.textInput}
//             />
//           </View>

//           <Text style={[styles.label, { marginTop: 20 }]}>
//             Reference Letter (Optional)
//           </Text>
//           <Text style={{ top: -6, color: "#7d8399" }}>
//             Upload official recommendation letter
//           </Text>
//           <TouchableOpacity
//             onPress={handleUploadLetter}
//             style={styles.uploadBox}
//           >
//             <Ionicons name="document-text-outline" size={32} color="#4285F4" />
//             <Text style={styles.uploadText}>
//               {referenceLetter
//                 ? "Letter Uploaded ✓"
//                 : "Tap to upload reference letter"}
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.timelineBox1}>
//             <Ionicons name="alert-circle" size={20} color="#D97706" />
//             <View style={{ flex: 1, marginLeft: 10 }}>
//               <Text style={styles.timelineTitle1}>Verification Process</Text>
//               <Text style={styles.timelineText1}>
//                 We may contact your refrence for verification. This helps
//                 maintain the quality and authenticity of our scholar network.
//               </Text>
//             </View>
//           </View>
//           <TouchableOpacity
//             onPress={handleContinue}
//             style={[styles.continueBtn, { backgroundColor: activeColor }]}
//           >
//             <Text style={styles.continueBtnText}>Continue to Next Step →</Text>
//           </TouchableOpacity>
//           <View style={styles.timelineBox}>
//             <Ionicons name="shield-checkmark" size={20} color="#1E40AF" />
//             <View style={{ flex: 1, marginLeft: 10 }}>
//               <Text style={styles.timelineTitle}>Privacy & Security</Text>
//               <Text style={styles.timelineText}>
//                 All documents are encrypted and handled with strict
//                 confidentailly. Reference contacts are safety for verification
//                 purposer
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//       <TouchableOpacity
//         style={[styles.helpButton, { backgroundColor: primary }]}
//         onPress={() => {}}
//       >
//         <Ionicons name="information-circle-outline" size={18} color="white" />
//         <View>
//           <Text
//             style={{
//               height: 10,
//               fontSize: 8,
//               color: "white",
//             }}
//           >
//             Get Help
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function getReferenceOptions(religion: string | null) {
//   switch (religion) {
//     case "islam":
//       return ["Mosque Reference", "Madrassa Reference", "Islamic Center"];
//     case "christianity":
//       return ["Church Reference", "Christian Ministry", "Community Church"];
//     case "hindu":
//       return ["Temple Reference", "Ashram Reference", "Hindu Institution"];
//     default:
//       return [];
//   }
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white" },
//   header: { padding: 20, paddingBottom: 40, alignItems: "center" },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   stepText: { color: "white", fontWeight: "bold", bottom: -15 },
//   whiteBadge: {
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
//   headerSubtitle: { color: "white", opacity: 0.9 },
//   formCard: {
//     marginTop: -30,
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//   },
//   progressBarBg: {
//     height: 6,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 3,
//     marginBottom: 25,
//   },
//   progressBarFill: { height: 6, borderRadius: 3 },
//   label: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10 },
//   uploadBox: {
//     borderStyle: "dashed",
//     borderWidth: 2,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   uploadText: {
//     marginTop: 8,
//     color: "#444",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   radioItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#eee",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   radioCircle: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#ccc",
//     marginRight: 12,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioInner: { height: 10, width: 10, borderRadius: 5 },
//   radioText: { fontSize: 15, color: "#333" },
//   inputTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#666",
//     marginTop: 15,
//     marginBottom: 5,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#eee",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   inputIcon: { marginRight: 10 },
//   textInput: { flex: 1, height: "100%" },
//   continueBtn: {
//     padding: 18,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 30,
//     marginBottom: 10,
//   },
//   continueBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
//   timelineBox: {
//     flexDirection: "row",
//     backgroundColor: "#EFF6FF",
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#FEF3C7",
//   },
//   timelineTitle: { color: "#1E40AF", fontWeight: "700", fontSize: 14 },
//   timelineText: { color: "#1E40AF", fontSize: 12, marginTop: 2 },
//   timelineBox1: {
//     flexDirection: "row",
//     backgroundColor: "#FFFBEB",
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#FEF3C7",
//   },
//   timelineTitle1: { color: "#D97706", fontWeight: "700", fontSize: 14 },
//   timelineText1: { color: "#D97706", fontSize: 12, marginTop: 2 },
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
import { useReligion } from "@/contexts/ReligionContext";
import { saveReligiousCertification } from "@/lib/providerService";
import { updateCertification } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
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
import { useUser } from "../../contexts/Usercontext";

export default function ReligiousCertification() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const { user } = useUser();
  const dispatch = useDispatch();

  // Get saved certification data from Redux
  const savedCertification = useSelector(
    (state: RootState) => state.onboarding.certification,
  );

  // Initialize state with saved data if available
  const [certificateFile, setCertificateFile] = useState<string | null>(
    savedCertification?.certificates?.[0]?.file || null,
  );
  const [referenceType, setReferenceType] = useState<string | null>(
    savedCertification?.referenceType || null,
  );
  const [institutionName, setInstitutionName] = useState(
    savedCertification?.institutionName || "",
  );
  const [referencePerson, setReferencePerson] = useState(
    savedCertification?.referencePerson || "",
  );
  const [contactPhone, setContactPhone] = useState(
    savedCertification?.referencePhone || "",
  );
  const [referenceLetter, setReferenceLetter] = useState<string | null>(
    savedCertification?.referenceLetter || null,
  );

  // Check if coming from review screen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromReview") === "true") {
      // Optional: Show message or highlight
    }
  }, []);

  // 🎨 DYNAMIC THEME COLOR
  const activeColor = religion === "islam" ? "#00A86B" : primary;
  const activeBg = religion === "islam" ? "#F0F9F4" : "#f5f5f5";

  const handleUploadCertificate = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setCertificateFile(result.assets[0].uri);
  };

  const handleUploadLetter = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setReferenceLetter(result.assets[0].uri);
  };

  const referenceOptions = getReferenceOptions(religion);

  const handleContinue = async () => {
    if (!certificateFile) return Alert.alert("Upload religious certificate");
    if (!referenceType) return Alert.alert("Select reference type");
    if (!institutionName.trim()) return Alert.alert("Enter institution name");
    if (!referencePerson.trim())
      return Alert.alert("Enter reference contact name");
    if (!contactPhone.trim()) return Alert.alert("Enter contact phone");

    // Prepare certification data for Redux
    const certificationData = {
      certificates: [
        {
          id: Date.now().toString(),
          name: "Religious Certificate",
          file: certificateFile,
          issueDate: new Date().toISOString(),
        },
      ],
      referenceType: referenceType,
      institutionName: institutionName.trim(),
      referencePerson: referencePerson.trim(),
      referencePhone: contactPhone.trim(),
      referenceEmail: "", // You can add email field if needed
      referenceLetter: referenceLetter,
    };

    // Save to Redux
    dispatch(updateCertification(certificationData));

    try {
      const idToUse = user?.id || "temp_provider_id";
      await saveReligiousCertification(idToUse, {
        certificateFile,
        referenceType,
        institutionName,
        referencePerson,
        contactPhone,
        referenceLetter,
      });

      // Check if returning to review
      const params = new URLSearchParams(window.location.search);
      if (
        params.get("fromReview") === "true" ||
        params.get("fromEdit") === "true"
      ) {
        router.back();
      } else {
        router.push("/(provider-onboarding)/serviceoffer");
      }
    } catch (error) {
      // Still navigate even if API fails (for now)
      const params = new URLSearchParams(window.location.search);
      if (
        params.get("fromReview") === "true" ||
        params.get("fromEdit") === "true"
      ) {
        router.back();
      } else {
        router.push("/(provider-onboarding)/serviceoffer");
      }
    }
  };
  const [isListening, setIsListening] = useState(false);
  const [selectedVoiceLanguages, setSelectedVoiceLanguages] = useState<
    string[]
  >([]);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);

  // Language options with translations
  const voiceLanguages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Hindi", code: "hi-IN", flag: "🇮🇳" },
    { name: "Arabic", code: "ar", flag: "🇸🇦" },
    { name: "Urdu", code: "ur", flag: "🇵🇰" },
    { name: "Bengali", code: "bn-IN", flag: "🇧🇩" },
    { name: "Tamil", code: "ta-IN", flag: "🇮🇳" },
  ];

  // Message translations
  const voiceMessages = {
    English:
      "Please select your ID type, enter your ID number, upload your ID document and optionally take a selfie.",
    Hindi:
      "कृपया अपने आईडी का प्रकार चुनें, अपना आईडी नंबर दर्ज करें, अपना आईडी दस्तावेज़ अपलोड करें और वैकल्पिक रूप से सेल्फी लें।",
    Arabic:
      "يرجى تحديد نوع الهوية الخاص بك، وإدخال رقم هويتك، وتحميل مستند الهوية الخاص بك، والتقاط صورة شخصية اختيارية.",
    Urdu: "براہ کرم اپنی شناخت کی قسم منتخب کریں، اپنا شناختی نمبر درج کریں، اپنی شناختی دستاویز اپ لوڈ کریں اور اختیاری طور پر سیلفی لیں۔",
    Bengali:
      "অনুগ্রহ করে আপনার আইডির ধরন নির্বাচন করুন, আপনার আইডি নম্বর লিখুন, আপনার আইডি ডকুমেন্ট আপলোড করুন এবং ঐচ্ছিকভাবে একটি সেলফি তুলুন।",
    Tamil:
      "உங்கள் ஐடி வகையைத் தேர்ந்தெடுக்கவும், உங்கள் ஐடி எண்ணை உள்ளிடவும், உங்கள் ஐடி ஆவணத்தைப் பதிவேற்றவும், விருப்பப்படி செல்ஃபியை எடுக்கவும்.",
  };

  // Check available voices on component mount
  useEffect(() => {
    const checkVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);

      // Check if Hindi is available
      const hindiVoices = voices.filter((v) => v.language === "hi-IN");
      if (hindiVoices.length === 0) {
        console.log("Hindi voice not available on device");
      }
    };
    checkVoices();
  }, []);

  const startVoiceAssistant = async () => {
    if (selectedVoiceLanguages.length === 0) {
      Alert.alert(
        "Select Languages",
        "Please select at least one language for voice guidance",
        [
          { text: "OK" },
          {
            text: "Select English",
            onPress: () => setSelectedVoiceLanguages(["English"]),
          },
        ],
      );
      return;
    }

    setIsListening(true);

    const speakInLanguages = async () => {
      for (const langName of selectedVoiceLanguages) {
        const langConfig = voiceLanguages.find((l) => l.name === langName);
        const message =
          voiceMessages[langName as keyof typeof voiceMessages] ||
          voiceMessages.English;

        if (langConfig) {
          try {
            await Speech.speak(message, {
              language: langConfig.code,
              rate: 0.75,
              pitch: 1.0,
            });
          } catch (error) {
            console.log(`Error speaking in ${langName}:`, error);
            // Fallback to English
            await Speech.speak(voiceMessages.English, {
              language: "en",
              rate: 0.75,
            });
          }
        }
      }
      setIsListening(false);
    };

    speakInLanguages();
  };
  const toggleVoiceLanguage = (langName: string) => {
    if (selectedVoiceLanguages.includes(langName)) {
      setSelectedVoiceLanguages(
        selectedVoiceLanguages.filter((l) => l !== langName),
      );
    } else {
      setSelectedVoiceLanguages([...selectedVoiceLanguages, langName]);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: activeColor }}>
      <ScrollView bounces={false} style={styles.container}>
        <View style={[styles.header, { backgroundColor: activeColor }]}>
          <View style={styles.headerTop}>
            <View style={{ top: 10 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.stepText}>Step 4 of 7</Text>
          </View>
          <View style={styles.whiteBadge}>
            <MaterialCommunityIcons
              name="certificate"
              size={30}
              color={activeColor}
            />
          </View>
          <Text style={styles.headerTitle}>Religious Certification</Text>
          <Text style={styles.headerSubtitle}>
            Upload your religious qualifications
          </Text>
        </View>
        <View style={styles.formCard}>
          {/* DYNAMIC PROGRESS BAR COLOR */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { backgroundColor: activeColor, width: "60%" },
              ]}
            />
          </View>
          {/* Voice Guidance Section */}
          <TouchableOpacity
            onPress={startVoiceAssistant}
            style={[
              styles.voiceBar,
              {
                borderColor: primary,
                backgroundColor: isListening ? `${primary}10` : "#F9FAFB",
              },
            ]}
          >
            <Ionicons
              name={isListening ? "mic" : "mic-outline"}
              size={22}
              color={isListening ? "red" : primary}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.voiceText,
                  { color: isListening ? "red" : "#4B5563" },
                ]}
              >
                {isListening ? "Assistant Speaking..." : "🎤 Voice Guidance"}
              </Text>
              {selectedVoiceLanguages.length > 0 && !isListening && (
                <Text style={styles.selectedLangsText}>
                  {selectedVoiceLanguages
                    .map((lang) => {
                      const langObj = voiceLanguages.find(
                        (l) => l.name === lang,
                      );
                      return `${langObj?.flag || "🌐"} ${lang}`;
                    })
                    .join(" • ")}
                </Text>
              )}
            </View>
            <Ionicons
              name="volume-high"
              size={18}
              color={isListening ? "red" : "#999"}
            />
          </TouchableOpacity>

          {/* Multiple Language Selection */}
          <View style={styles.languageSection}>
            <View style={styles.languageHeader}>
              <Ionicons name="language" size={18} color={primary} />
              <Text style={styles.languageTitle}>Select Voice Languages</Text>
            </View>
            <Text style={styles.languageSubLabel}>
              Choose languages for voice guidance (multiple allowed)
            </Text>

            <View style={styles.languageGrid}>
              {voiceLanguages.map((lang) => {
                const isSelected = selectedVoiceLanguages.includes(lang.name);
                return (
                  <TouchableOpacity
                    key={lang.name}
                    onPress={() => toggleVoiceLanguage(lang.name)}
                    style={[
                      styles.langItem,
                      isSelected && {
                        borderColor: primary,
                        backgroundColor: `${primary}08`,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && {
                          backgroundColor: primary,
                          borderColor: primary,
                        },
                      ]}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.langText}>
                      {lang.flag} {lang.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedVoiceLanguages.length > 0 && (
              <TouchableOpacity
                onPress={() => setSelectedVoiceLanguages([])}
                style={styles.clearButton}
              >
                <Text style={[styles.clearText, { color: primary }]}>
                  Clear all
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Religious Certificates *</Text>
          <TouchableOpacity
            onPress={handleUploadCertificate}
            style={styles.uploadBox}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={32}
              color={activeColor}
            />
            <Text style={styles.uploadText}>
              {certificateFile
                ? "Certificate Selected ✓"
                : "Tap to upload certificate"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Reference Type *</Text>
          {referenceOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setReferenceType(option)}
              style={[
                styles.radioItem,
                referenceType === option && {
                  borderColor: activeColor,
                  backgroundColor: activeBg,
                },
              ]}
            >
              <View
                style={[
                  styles.radioCircle,
                  referenceType === option && { borderColor: activeColor },
                ]}
              >
                {referenceType === option && (
                  <View
                    style={[
                      styles.radioInner,
                      { backgroundColor: activeColor },
                    ]}
                  />
                )}
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.inputTitle}>Institution Name *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="business-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              value={institutionName}
              onChangeText={setInstitutionName}
              placeholder="Enter institution name"
              style={styles.textInput}
            />
          </View>

          <Text style={styles.inputTitle}>Reference Contact *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              value={referencePerson}
              onChangeText={setReferencePerson}
              placeholder="Reference person name"
              style={styles.textInput}
            />
          </View>

          <Text style={styles.inputTitle}>Contact Phone *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              value={contactPhone}
              onChangeText={setContactPhone}
              placeholder="Reference phone"
              keyboardType="phone-pad"
              style={styles.textInput}
            />
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>
            Reference Letter (Optional)
          </Text>
          <Text style={{ top: -6, color: "#7d8399" }}>
            Upload official recommendation letter
          </Text>
          <TouchableOpacity
            onPress={handleUploadLetter}
            style={styles.uploadBox}
          >
            <Ionicons name="document-text-outline" size={32} color="#4285F4" />
            <Text style={styles.uploadText}>
              {referenceLetter
                ? "Letter Uploaded ✓"
                : "Tap to upload reference letter"}
            </Text>
          </TouchableOpacity>
          <View style={styles.timelineBox1}>
            <Ionicons name="alert-circle" size={20} color="#D97706" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.timelineTitle1}>Verification Process</Text>
              <Text style={styles.timelineText1}>
                We may contact your refrence for verification. This helps
                maintain the quality and authenticity of our scholar network.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueBtn, { backgroundColor: activeColor }]}
          >
            <Text style={styles.continueBtnText}>Continue to Next Step →</Text>
          </TouchableOpacity>
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
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.helpButton, { backgroundColor: primary }]}
        onPress={() => router.push("/booking/help")}
      >
        <Ionicons name="information-circle-outline" size={18} color="white" />
        <View>
          <Text
            style={{
              fontSize: 8,
              color: "white",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Get Help
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function getReferenceOptions(religion: string | null) {
  switch (religion) {
    case "islam":
      return ["Mosque Reference", "Madrassa Reference", "Islamic Center"];
    case "christianity":
      return ["Church Reference", "Christian Ministry", "Community Church"];
    case "hindu":
      return ["Temple Reference", "Ashram Reference", "Hindu Institution"];
    default:
      return [];
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { padding: 20, paddingBottom: 40, alignItems: "center" },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  stepText: { color: "white", fontWeight: "bold", bottom: -15 },
  whiteBadge: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerSubtitle: { color: "white", opacity: 0.9 },
  formCard: {
    marginTop: -30,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    marginBottom: 25,
  },
  progressBarFill: { height: 6, borderRadius: 3 },
  label: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10 },
  uploadBox: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    marginTop: 8,
    color: "#444",
    fontWeight: "600",
    textAlign: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  voiceBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
    bottom: -10,
    width: 350,
    right: 15,
  },
  voiceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4B5563",
  },
  selectedLangsText: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  languageSection: {
    marginTop: 5,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  languageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  languageTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  languageSubLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    minWidth: 100,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  langText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  clearButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 12,
    fontWeight: "500",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: { height: 10, width: 10, borderRadius: 5 },
  radioText: { fontSize: 15, color: "#333" },
  inputTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginTop: 15,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, height: "100%" },
  continueBtn: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  continueBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
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
