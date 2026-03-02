import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
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
import { saveReligiousCertification } from "@/lib/providerService";
import { updateCertification } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
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
