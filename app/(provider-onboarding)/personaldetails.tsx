import { useReligion } from "@/contexts/ReligionContext";
import { useTheme } from "@/theme/ThemeProvider";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../contexts/Usercontext";
import {
  setCurrentStep,
  updatePersonalDetails,
} from "../../store/onboardingSlice";
import { RootState } from "../../store/store";

export default function PersonalDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const { user, updateUser } = useUser();
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  const isEditing = returnTo === "review";

  const savedData = useSelector(
    (state: RootState) =>
      (state as any).onboarding?.personalDetails,
  ) || ({} as Record<string, any>);

  const [formData, setFormData] = useState({
    fullName: savedData?.name || user?.name || "",
    address: savedData?.address || "",
    city: savedData?.city || "",
    selectedState: savedData?.state || "",
    zip: savedData?.zip || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!religion) {
    router.replace("/(auth)/religionselect");
    return null;
  }
  const phoneNumber = user?.phone || "+91 ";
  const email = user?.email || "your.email@example.com";

  const statesList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.selectedState) newErrors.selectedState = "State is required";
    if (!/^\d{5,6}$/.test(formData.zip)) newErrors.zip = "Enter valid ZIP code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      dispatch(
        updatePersonalDetails({
          name: formData.fullName,
          phone: phoneNumber,
          email: email,
          address: formData.address,
          city: formData.city,
          state: formData.selectedState,
          zip: formData.zip,
        }),
      );

      updateUser({
        name: formData.fullName,
        address: `${formData.address}, ${formData.city}, ${formData.selectedState} - ${formData.zip}`,
        id: user?.id,
        email: user?.email,
        phone: user?.phone,
        religion: user?.religion,
      });

      if (isEditing) {
        router.replace({
          pathname: "/(provider-onboarding)/reviewsubmit",
          params: { updated: "true" },
        });
      } else {
        dispatch(setCurrentStep(2));
        router.push("/(provider-onboarding)/religiousaffiliation");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: primary }}>
        <ScrollView
          bounces={false}
          style={{ flex: 1, backgroundColor: primary }}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>Step 1 of 7</Text>
            </View>

            <View style={styles.avatarCircle}>
              <FontAwesome5 name="user-alt" size={30} color={primary} />
            </View>

            <Text style={styles.headerTitle}>Personal Details</Text>
            <Text style={styles.headerSubtitle}>
              Lets start with your basic information
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.progressBarBg}>
              <Text
                style={[styles.progressBarFill, { backgroundColor: primary }]}
              />
            </View>

            <Text style={styles.label}>
              Full Name <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputWrapper,
                errors.fullName && { borderColor: "red" },
              ]}
            >
              <Ionicons
                name="person"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
                placeholder="Enter your full name"
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>
              Phone Number <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View style={[styles.inputWrapper, styles.disabledInput]}>
              <Ionicons
                name="call"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                value={phoneNumber}
                editable={false}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>
              Email Address <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View style={[styles.inputWrapper, styles.disabledInput]}>
              <Ionicons
                name="mail"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput value={email} editable={false} style={styles.input} />
            </View>

            <Text style={styles.label}>
              Religion <Text style={{ color: "#2ecc71" }}>(Verified)</Text>
            </Text>
            <View style={[styles.verifiedBox, { borderColor: "#d1f2eb" }]}>
              <View style={styles.verifiedRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="business" size={20} color={primary} />
                  <Text style={[styles.religionText, { color: "#333" }]}>
                    {" "}
                    {religion || "Islam"}
                  </Text>
                </View>
                <Ionicons name="lock-closed" size={18} color={primary} />
              </View>
              <View style={styles.verifiedNoteRow}>
                <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
                <Text style={styles.verifiedNote}>
                  Verified during signup and cannot be changed
                </Text>
              </View>
            </View>

            <Text style={styles.label}>
              Address <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputWrapper,
                { alignItems: "flex-start", height: 80 },
                errors.address && { borderColor: "red" },
              ]}
            >
              <Ionicons
                name="location"
                size={20}
                color="#999"
                style={[styles.inputIcon, { marginTop: 12 }]}
              />
              <TextInput
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
                placeholder="Enter your complete address"
                multiline
                style={[
                  styles.input,
                  { height: "100%", textAlignVertical: "top" },
                ]}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>
                  City <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.city && { borderColor: "red" },
                  ]}
                >
                  <TextInput
                    value={formData.city}
                    onChangeText={(text) =>
                      setFormData({ ...formData, city: text })
                    }
                    placeholder="City"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>
                  State <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.pickerWrapper,
                    errors.selectedState && { borderColor: "red" },
                  ]}
                >
                  <Picker
                    selectedValue={formData.selectedState}
                    onValueChange={(value) =>
                      setFormData({ ...formData, selectedState: value })
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="State" value="" color="#999" />
                    {statesList.map((s, i) => (
                      <Picker.Item key={i} label={s} value={s} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <Text style={styles.label}>
              Zip Code <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputWrapper,
                errors.zip && { borderColor: "red" },
              ]}
            >
              <Ionicons
                name="pin"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                value={formData.zip}
                onChangeText={(text) => setFormData({ ...formData, zip: text })}
                placeholder="00000"
                keyboardType="numeric"
                style={styles.input}
                maxLength={6}
              />
            </View>

            <View style={styles.privacyBox1}>
              <View style={styles.infoRow}>
                <Ionicons name="timer" size={20} color="#ea580c" />
                <Text style={styles.privacyTitle1}>What happens Next?</Text>
              </View>
              <Text style={styles.infoContent1}>
                After registration, you will complete a detailed onboarding
                process including document verification, qualification, details,
                and service setup. Verification typically takes 24-48 hours.
              </Text>
            </View>

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

            <View style={styles.privacyBox}>
              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark" size={20} color="#27ae60" />
                <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
              </View>
              <Text style={styles.infoContent}>
                We protect your personal information with industry-standard
                encryption.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        style={[styles.helpButton, { backgroundColor: primary }]}
        onPress={() => { }}
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

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    alignItems: "center",
    bottom: -20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  stepBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-end",
    position: "absolute",
    top: 50,
    right: 20,
  },
  stepText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginTop: 5,
  },
  formCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: "100%",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 25,
    width: "100%",
  },
  progressBarFill: {
    width: "15%",
    height: "100%",
    borderRadius: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  disabledInput: {
    backgroundColor: "#f9f9f9",
  },
  verifiedBox: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#f0fff9",
    padding: 12,
  },
  verifiedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  religionText: {
    fontWeight: "700",
    fontSize: 16,
  },
  verifiedNoteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#d1f2eb",
  },
  verifiedNote: {
    fontSize: 11,
    color: "#27ae60",
    flex: 1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
  },
  picker: {
    height: 50,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 12,
    color: "#546e7a",
    lineHeight: 18,
  },
  mainButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
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
  privacyBox: {
    backgroundColor: "#e9f7ef",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 40,
  },
  privacyTitle: {
    fontWeight: "700",
    color: "#186a3b",
    fontSize: 14,
  },
  privacyBox1: {
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 40,
  },
  privacyTitle1: {
    fontWeight: "700",
    color: "#c47713",
    fontSize: 14,
  },
  infoContent1: {
    fontSize: 12,
    color: "#cd6f2b",
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
});
