import {
  RELIGION_HEADER_ICON,
  ReligionType,
  SCHOLAR_TYPE_ICONS,
} from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateReligiousDetails,
} from "../../store/onboardingSlice";
import { RootState } from "../../store/store";
export default function ReligiousAffiliation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  const isEditing = returnTo === "review";
  // Get saved data from Redux
  const savedData = useSelector(
    (state: RootState) => state.onboarding.religiousDetails,
  );

  if (!religion) {
    router.replace("/(auth)/religionselect");
    return null;
  }

  const [scholarType, setScholarType] = useState<string | null>(
    savedData?.scholarType || null,
  );
  const [experience, setExperience] = useState<string | null>(
    savedData?.yearsOfExperience || null,
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    savedData?.languages || [],
  );
  const [specialization, setSpecialization] = useState<string>(
    savedData?.specialization || "",
  );
  const [community, setCommunity] = useState<string>(
    savedData?.community || "",
  );

  const languages = [
    "Arabic",
    "English",
    "Urdu",
    "Hindi",
    "Kannada",
    "Bengali",
  ];

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const scholarTypes = getScholarTypes(religion);
  const handleContinue = () => {
    // 1. Validation Logic
    if (!scholarType || !experience || selectedLanguages.length === 0) {
      alert(
        "Please select scholar type, experience, and at least one language",
      );
      return;
    }

    // 2. Save to Redux (Using the variables from your useState)
    dispatch(
      updateReligiousDetails({
        scholarType: scholarType,
        specialization: specialization,
        languages: selectedLanguages,
        yearsOfExperience: experience,
      }),
    );

    // 3. Conditional Navigation
    if (isEditing) {
      // Jump straight back to Review screen
      router.replace({
        pathname: "/(provider-onboarding)/reviewsubmit",
        params: { updated: "true" },
      });
    } else {
      // Normal onboarding flow: move to step 3
      dispatch(setCurrentStep(3));
      router.push("/(provider-onboarding)/identityverification");
    }
  };
  // const handleContinue = () => {
  //   if (!scholarType || !experience || selectedLanguages.length === 0) {
  //     alert(
  //       "Please select scholar type, experience, and at least one language",
  //     );
  //     return;
  //   }

  //   console.log("Sending to Redux:", {
  //     scholarType,
  //     specialization,
  //     community,
  //     languages: selectedLanguages,
  //     yearsOfExperience: experience,
  //   });

  //   dispatch(
  //     updateReligiousDetails({
  //       scholarType: scholarType,
  //       // specialization: specialization,
  //       // community: community,
  //       languages: selectedLanguages,
  //       yearsOfExperience: experience,
  //     }),
  //   );

  //   dispatch(setCurrentStep(3));
  //   router.push("/(provider-onboarding)/identityverification");
  // };
  // started here mainy

  return (
    <View style={{ flex: 1, backgroundColor: primary }}>
      <ScrollView bounces={false} style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* HEADER SECTION */}
        <View style={[styles.header, { backgroundColor: primary }]}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>Step 2 of 7</Text>
            </View>
          </View>

          <View style={styles.headerCenter}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name={RELIGION_HEADER_ICON[religion] || "mosque"}
                size={35}
                color={primary}
              />
            </View>
            <Text style={styles.headerTitle}>Religious Affiliation</Text>
            <Text style={styles.headerSubtitle}>
              Tell us about your role in the community
            </Text>
          </View>
        </View>

        {/* CONTENT SECTION */}
        <View style={styles.formContent}>
          {/* DYNAMIC PROGRESS BAR */}
          <View style={styles.progressContainer}>
            {/* The backgroundColor here now uses the 'primary' variable */}
            <View
              style={[
                styles.progressBar,
                { width: "28%", backgroundColor: primary },
              ]}
            />
          </View>

          {/* SCHOLAR TYPE SELECTION */}
          <Text style={styles.label}>
            Scholar Type <Text style={{ color: primary }}>*</Text>
          </Text>
          <Text style={styles.subLabel}>
            Select your religious role or position
          </Text>

          {scholarTypes.map((type) => {
            const isSelected = scholarType === type;
            const iconName =
              SCHOLAR_TYPE_ICONS[religion]?.[type] || "account-check";

            return (
              <TouchableOpacity
                key={type}
                activeOpacity={0.8}
                onPress={() => setScholarType(type)}
                style={[
                  styles.typeCard,
                  isSelected && {
                    borderColor: primary,
                    backgroundColor: `${primary}08`,
                  },
                ]}
              >
                <View
                  style={[styles.radio, isSelected && { borderColor: primary }]}
                >
                  {isSelected && (
                    <View
                      style={[styles.radioDot, { backgroundColor: primary }]}
                    />
                  )}
                </View>

                <View
                  style={[
                    styles.cardIconContainer,
                    { backgroundColor: `${primary}15` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={22}
                    color={primary}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.cardTitle, isSelected && { color: primary }]}
                  >
                    {type}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {getScholarDescription(type)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* EXPERIENCE DROPDOWN */}
          <Text style={[styles.label, { marginTop: 25 }]}>
            Years of Experience <Text style={{ color: primary }}>*</Text>
          </Text>
          <View style={styles.dropdownWrapper}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={20}
              color="#666"
              style={{ marginLeft: 12 }}
            />
            <Picker
              selectedValue={experience}
              onValueChange={(itemValue) => setExperience(itemValue)}
              style={{ flex: 1 }}
            >
              <Picker.Item
                label="Select experience level"
                value={null}
                color="#999"
              />
              <Picker.Item label="0-2 years" value="0-2 years" />
              <Picker.Item label="3-5 years" value="3-5 years" />
              <Picker.Item label="6-10 years" value="6-10 years" />
              <Picker.Item label="10+ years" value="10+ years" />
            </Picker>
          </View>

          {/* LANGUAGES GRID */}
          <Text style={[styles.label, { marginTop: 25 }]}>
            Languages Spoken <Text style={{ color: primary }}>*</Text>
          </Text>
          <View style={styles.languageGrid}>
            {languages.map((lang) => {
              const isSelected = selectedLanguages.includes(lang);
              return (
                <TouchableOpacity
                  key={lang}
                  onPress={() => toggleLanguage(lang)}
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
                      <Icon name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.langText}>{lang}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* INFO CARD */}
          <View style={styles.verificationNotice}>
            <Icon name="shield-checkmark" size={20} color="#D97706" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.noticeTitle}>Community Verification</Text>
              <Text style={styles.noticeText}>
                Your credentials will be verified by local authorities before
                activation.
              </Text>
            </View>
          </View>

          {/* PRIMARY BUTTON */}
          {/* <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueBtn, { backgroundColor: primary }]}
          >
            <Text style={styles.continueBtnText}>Continue to Next Step</Text>
            <Icon
              name="arrow-forward"
              size={18}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  stepText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  headerCenter: { alignItems: "center", marginTop: 15 },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  formContent: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 25,
  },
  progressBar: { height: 6, borderRadius: 3 },
  label: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  subLabel: { fontSize: 13, color: "#6B7280", marginTop: 4, marginBottom: 15 },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  cardIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  cardDesc: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    marginTop: 10,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },
  langItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    marginBottom: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  langText: { fontSize: 14, fontWeight: "500", color: "#374151" },
  verificationNotice: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    marginTop: 10,
  },
  noticeTitle: { fontSize: 14, fontWeight: "700", color: "#92400E" },
  noticeText: { fontSize: 12, color: "#B45309", marginTop: 2, lineHeight: 18 },
  continueBtn: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  continueBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

function getScholarTypes(religion: ReligionType): string[] {
  switch (religion) {
    case "islam":
      return ["Imam", "Qari", "Hafiz", "Islamic Scholar"];
    case "christianity":
      return ["Pastor", "Priest", "Minister"];
    case "hindu":
      return ["Pandit", "Pujari", "Acharya"];
    default:
      return [];
  }
}

function getScholarDescription(type: string): string {
  const descriptions: Record<string, string> = {
    Imam: "Prayer leader and religious teacher",
    Qari: "Quran recitation specialist",
    Hafiz: "Quran memorization expert",
    "Islamic Scholar": "Religious studies expert",
    Pastor: "Congregation leader",
    Pandit: "Ceremony specialist",
  };
  return descriptions[type] || "Community religious leader";
}
