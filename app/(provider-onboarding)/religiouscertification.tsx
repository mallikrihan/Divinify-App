import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useReligion } from "@/contexts/ReligionContext";
import { saveReligiousCertification } from "@/lib/providerService";
import { useTheme } from "@/theme/ThemeProvider";
import { useUser } from "../../contexts/Usercontext";

export default function ReligiousCertification() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const { user } = useUser();

  const [certificateFile, setCertificateFile] = useState<string | null>(null);
  const [referenceType, setReferenceType] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState("");
  const [referencePerson, setReferencePerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [referenceLetter, setReferenceLetter] = useState<string | null>(null);

  // 🎨 DYNAMIC THEME COLOR
  const activeColor = religion === "islam" ? "#00A86B" : primary;
  const activeBg = religion === "islam" ? "#F0F9F4" : "#f5f5f5";

  const handleUploadCertificate = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setCertificateFile(result.assets[0].uri);
  };

  const handleUploadLetter = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      router.push("/(provider-onboarding)/serviceoffer");
    } catch (error) {
      router.push("/(provider-onboarding)/serviceoffer");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: activeColor }}>
      <ScrollView bounces={false} style={styles.container}>
        <View style={[styles.header, { backgroundColor: activeColor }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
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

          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueBtn, { backgroundColor: activeColor }]}
          >
            <Text style={styles.continueBtnText}>Continue to Next Step →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  stepText: { color: "white", fontWeight: "bold", bottom: -10 },
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
    marginBottom: 40,
  },
  continueBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
