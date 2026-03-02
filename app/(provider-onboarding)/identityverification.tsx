import { useReligion } from "@/contexts/ReligionContext";
import { saveIdentityVerification } from "@/lib/providerService";
import { updateVerification } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
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
  const { religion } = useReligion();
  const { primary } = useTheme(); // Assuming this is your green color
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
    {
      label: "Passport",
      sub: "International ID document",
      icon: "passport",
      mIcon: "book-outline",
    },
    {
      label: "National ID Card",
      sub: "Government issued ID",
      icon: "id-card",
      mIcon: "card-outline",
    },
    {
      label: "Driving License",
      sub: "Valid driver's license",
      icon: "car",
      mIcon: "car-outline",
    },
  ];

  const { returnTo, fromReview } = useLocalSearchParams<{
    returnTo: string;
    fromReview: string;
  }>();
  const isEditing = returnTo === "review" || fromReview === "true";

  const handlePickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ comma added
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
    if (!result.canceled) setSelfieImage(result.assets[0].uri);
  };

  const handleContinue = async () => {
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
      dispatch(updateVerification(verificationData));
      if (user?.id) await saveIdentityVerification(user.id, verificationData);

      if (isEditing) {
        router.replace({
          pathname: "/(provider-onboarding)/reviewsubmit",
          params: { updated: "true" },
        });
      } else {
        router.push("/(provider-onboarding)/religiouscertification");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save verification.");
    }
  };

  return (
    <ScrollView>
      <View style={[styles.mainContainer, { backgroundColor: primary }]}>
        <StatusBar barStyle="light-content" />

        {/* Curved Header Section */}
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 3 of 7</Text>
        </View>

        <View style={styles.headerContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-circle-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.titleText}>Identity Verification</Text>
          <Text style={styles.subtitleText}>
            Secure verification for community trust
          </Text>
        </View>

        {/* Main Form Container */}
        <View style={styles.formContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollPadding}
          >
            <View style={styles.progressContainer}>
              <View
                style={[styles.progressBase, { backgroundColor: "#E0E0E0" }]}
              >
                <View
                  style={[
                    styles.progressFill,
                    { width: "30%", backgroundColor: primary },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.label}>
              Government ID Type <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.subLabel}>
              Select your preferred ID document
            </Text>

            {idOptions.map((option) => (
              <TouchableOpacity
                key={option.label}
                onPress={() => setIdType(option.label)}
                style={[
                  styles.idCard,
                  idType === option.label && { borderColor: primary },
                ]}
              >
                <View
                  style={[
                    styles.radioCircle,
                    idType === option.label && { borderColor: primary },
                  ]}
                >
                  {idType === option.label && (
                    <View
                      style={[styles.radioInner, { backgroundColor: primary }]}
                    />
                  )}
                </View>
                <View style={styles.idIconContainer}>
                  <Ionicons
                    name={option.mIcon as any}
                    size={20}
                    color={primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.idLabelText}>{option.label}</Text>
                  <Text style={styles.idSubText}>{option.sub}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>
              ID Number <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="card-outline"
                size={18}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your ID number"
                value={idNumber}
                onChangeText={setIdNumber}
                autoCapitalize="characters"
              />
            </View>

            <Text style={styles.label}>
              Upload ID Document <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.subLabel}>
              Upload a clear photo of your ID (front side)
            </Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickDocument}
            >
              {documentImage ? (
                <Image
                  source={{ uri: documentImage }}
                  style={styles.fullImage}
                />
              ) : (
                <>
                  <View style={styles.uploadCircle}>
                    <Ionicons name="cloud-upload" size={24} color="white" />
                  </View>
                  <Text style={styles.uploadMainText}>
                    Tap to upload document
                  </Text>
                  <Text style={styles.uploadSmallText}>PNG, JPG up to 5MB</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>
              Selfie Verification{" "}
              <Text style={styles.optional}>(Optional)</Text>
            </Text>
            <Text style={styles.subLabel}>
              Take a selfie for enhanced verification
            </Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleTakeSelfie}
            >
              {selfieImage ? (
                <Image source={{ uri: selfieImage }} style={styles.fullImage} />
              ) : (
                <>
                  <View
                    style={[
                      styles.uploadCircle,
                      { backgroundColor: "#D1E3FF" },
                    ]}
                  >
                    <Ionicons name="camera" size={24} color="#3B82F6" />
                  </View>
                  <Text style={styles.uploadMainText}>Tap to take selfie</Text>
                  <Text style={styles.uploadSmallText}>
                    Clear face photo required
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.securityBox}>
              <Ionicons name="lock-closed" size={20} color="#3B82F6" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.securityTitle}>Data Security</Text>
                <Text style={styles.securityText}>
                  Your documents are encrypted and stored securely. We only use
                  them for verification purposes and never share with third
                  parties.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: primary }]}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>
                {isEditing ? "Save & Return" : "Continue to Next Step"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.timelineBox}>
              <Ionicons name="alert-circle" size={20} color="#D97706" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.timelineTitle}>Verification Timeline</Text>
                <Text style={styles.timelineText}>
                  Identity verification typically takes 24-48 hours. You will
                  receive a notification once approved.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: { padding: 8, top: -20 },
  stepIndicator: {
    color: "white",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
    top: -20,
  },
  headerContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  titleText: { color: "white", fontSize: 24, fontWeight: "bold" },
  subtitleText: { color: "white", opacity: 0.8, fontSize: 14, marginTop: 5 },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollPadding: { padding: 24, paddingBottom: 40 },
  progressContainer: { marginBottom: 25 },
  progressBase: { height: 6, borderRadius: 3, width: "100%" },
  progressFill: { height: 6, borderRadius: 3 },
  label: { fontSize: 16, fontWeight: "700", color: "#333", marginTop: 10 },
  subLabel: { fontSize: 13, color: "#666", marginBottom: 15, marginTop: 4 },
  idCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 15,
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  idIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  idLabelText: { fontSize: 16, fontWeight: "600", color: "#333" },
  idSubText: { fontSize: 12, color: "#999" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 20,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 15,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
    overflow: "hidden",
  },
  uploadCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A7F3D0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadMainText: { fontWeight: "600", color: "#333" },
  uploadSmallText: { fontSize: 11, color: "#999", marginTop: 4 },
  fullImage: { width: "100%", height: "100%" },
  optional: { fontWeight: "400", color: "#999" },
  securityBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
  securityTitle: { color: "#1E40AF", fontWeight: "700", fontSize: 14 },
  securityText: {
    color: "#1E40AF",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
  },
  continueButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  continueText: { color: "white", fontSize: 16, fontWeight: "bold" },
  timelineBox: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  timelineTitle: { color: "#92400E", fontWeight: "700", fontSize: 14 },
  timelineText: { color: "#B45309", fontSize: 12, marginTop: 2 },
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
