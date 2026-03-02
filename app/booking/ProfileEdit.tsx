import { useReligion } from "@/contexts/ReligionContext";
import { useUser } from "@/contexts/Usercontext";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

// Edit Modal Component
const EditModal = ({
  visible,
  title,
  value,
  onSave,
  onClose,
  placeholder,
  keyboardType = "default",
  multiline = false,
}: {
  visible: boolean;
  title: string;
  value: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={[
              styles.modalInput,
              multiline && { height: 100, textAlignVertical: "top" },
            ]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoFocus
            multiline={multiline}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalSaveBtn, { backgroundColor: "#22C55E" }]}
              onPress={() => {
                if (inputValue.trim()) {
                  onSave(inputValue);
                  onClose();
                } else {
                  Alert.alert("Error", "Field cannot be empty");
                }
              }}
            >
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Gender Selection Modal
const GenderModal = ({
  visible,
  selectedGender,
  onSave,
  onClose,
}: {
  visible: boolean;
  selectedGender: string;
  onSave: (gender: string) => void;
  onClose: () => void;
}) => {
  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Gender</Text>
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={styles.genderOption}
              onPress={() => {
                onSave(gender);
                onClose();
              }}
            >
              <Text style={styles.genderText}>{gender}</Text>
              {selectedGender === gender && (
                <Ionicons name="checkmark" size={20} color="#22C55E" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Language Modal
const LanguageModal = ({
  visible,
  selectedLanguage,
  onSave,
  onClose,
}: {
  visible: boolean;
  selectedLanguage: string;
  onSave: (language: string) => void;
  onClose: () => void;
}) => {
  const languages = [
    "English (US)",
    "English (UK)",
    "Spanish",
    "French",
    "Arabic",
    "Hindi",
    "Urdu",
    "Bengali",
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.genderOption}
              onPress={() => {
                onSave(language);
                onClose();
              }}
            >
              <Text style={styles.genderText}>{language}</Text>
              {selectedLanguage === language && (
                <Ionicons name="checkmark" size={20} color="#22C55E" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  isLocked = false,
  type = "ionicon",
  onPress,
}: {
  icon: string;
  label?: string;
  value: string;
  isLocked?: boolean;
  type?: "ionicon" | "material";
  onPress?: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={[styles.infoItem, isLocked && styles.lockedItem]}
    onPress={onPress}
    disabled={isLocked}
  >
    <View style={styles.infoIconContainer}>
      {type === "ionicon" ? (
        <Ionicons name={icon} size={22} color="#6B7280" />
      ) : (
        <MaterialCommunityIcons name={icon} size={22} color="#6B7280" />
      )}
    </View>

    <View style={styles.infoTextContainer}>
      {label && <Text style={styles.infoLabel}>{label}</Text>}
      <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
        {value || "Not set"}
      </Text>
    </View>

    {isLocked ? (
      <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
    ) : (
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

const PreferenceItem = ({
  icon,
  title,
  subtitle,
  value,
  onToggle,
}: {
  icon: string;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.preferenceRow}>
    <View style={styles.preferenceLeft}>
      <View style={[styles.infoIconContainer, { marginRight: 12 }]}>
        <Ionicons name={icon} size={20} color="#6B7280" />
      </View>
      <View>
        <Text style={styles.preferenceTitle}>{title}</Text>
        <Text style={styles.preferenceSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#E5E7EB", true: "#22C55E" }}
      thumbColor="white"
    />
  </View>
);

export default function Profile() {
  const router = useRouter();
  const { primary } = useTheme();
  const { user, updateUser } = useUser();
  const { religion } = useReligion();

  const personalDetails = useSelector(
    (state: RootState) => state.onboarding?.personalDetails,
  );

  // State for all editable fields - ONLY ONE ADDRESS FIELD
  const [userData, setUserData] = useState({
    fullName:
      user?.name || user?.fullName || personalDetails?.name || "Ahmed Hassan",
    email: user?.email || personalDetails?.email || "ahmed.hassan@email.com",
    phone: user?.phone || personalDetails?.phone || "+1 (555) 123-4567",
    dob: personalDetails?.dob || "05/15/1990",
    gender: personalDetails?.gender || "Male",
    address:
      personalDetails?.address ||
      user?.address ||
      "123 Main Street, Apartment 4B, New York, NY 10001",
    language: "English (US)",
  });

  // Modal states
  const [editModal, setEditModal] = useState({
    visible: false,
    field: "",
    value: "",
    title: "",
    keyboardType: "default" as any,
    multiline: false,
  });
  const [genderModal, setGenderModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);

  // Toggle states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const displayReligion = religion || user?.religion || "Islam";

  const getReligionIcon = () => {
    const rel = displayReligion.toLowerCase();
    if (rel.includes("islam") || rel.includes("muslim")) return "mosque";
    if (rel.includes("hindu")) return "om";
    if (rel.includes("christian")) return "cross";
    if (rel.includes("sikh")) return "khanda";
    if (rel.includes("buddhist") || rel.includes("buddhism")) return "lotus";
    return "account";
  };

  // Handle edit field
  const handleEditField = (
    field: string,
    currentValue: string,
    title: string,
    keyboardType: any = "default",
    multiline = false,
  ) => {
    setEditModal({
      visible: true,
      field,
      value: currentValue,
      title,
      keyboardType,
      multiline,
    });
  };

  // Handle save field
  const handleSaveField = (newValue: string) => {
    setUserData((prev) => ({ ...prev, [editModal.field]: newValue }));

    // Update user context for relevant fields
    if (editModal.field === "fullName") {
      updateUser({ name: newValue });
    } else if (editModal.field === "email") {
      updateUser({ email: newValue });
    } else if (editModal.field === "phone") {
      updateUser({ phone: newValue });
    } else if (editModal.field === "address") {
      updateUser({ address: newValue });
    }
  };

  // Handle save all changes
  const handleSaveChanges = () => {
    updateUser({
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
    Alert.alert("Success", "Profile updated successfully");
    router.back();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={[styles.header, { backgroundColor: primary }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=ahmed" }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={[styles.verifiedBadge, { backgroundColor: primary }]}
                onPress={() =>
                  Alert.alert(
                    "Change Photo",
                    "Photo upload feature coming soon",
                  )
                }
              >
                <Ionicons name="camera" size={14} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{userData.fullName}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Change Photo", "Photo upload feature coming soon")
              }
            >
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
            <Text style={styles.photoHint}>JPG or PNG, max 5MB</Text>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.card}>
              <InfoRow
                icon="person-outline"
                label="Full Name"
                value={userData.fullName}
                onPress={() =>
                  handleEditField(
                    "fullName",
                    userData.fullName,
                    "Edit Full Name",
                  )
                }
              />
              <InfoRow
                icon="mail-outline"
                label="Email Address"
                value={userData.email}
                onPress={() =>
                  handleEditField(
                    "email",
                    userData.email,
                    "Edit Email",
                    "email-address",
                  )
                }
              />
              <InfoRow
                icon="call-outline"
                label="Phone Number"
                value={userData.phone}
                onPress={() =>
                  handleEditField(
                    "phone",
                    userData.phone,
                    "Edit Phone Number",
                    "phone-pad",
                  )
                }
              />
              <InfoRow
                icon="calendar-outline"
                label="Date of Birth"
                value={userData.dob}
                onPress={() =>
                  handleEditField("dob", userData.dob, "Edit Date of Birth")
                }
              />
              <InfoRow
                icon="people-outline"
                label="Gender"
                value={userData.gender}
                onPress={() => setGenderModal(true)}
              />
              <InfoRow
                icon="location-outline"
                label="Address"
                value={userData.address}
                onPress={() =>
                  handleEditField(
                    "address",
                    userData.address,
                    "Edit Address",
                    "default",
                    true,
                  )
                }
              />
              <InfoRow
                icon="mosque"
                type="material"
                label="Religious Preference"
                value={displayReligion}
                isLocked
              />
            </View>
            <Text style={styles.religionNote}>
              Your religious preference is set during registration and cannot be
              modified for service occurrence and school matching.
            </Text>
          </View>

          {/* Communication Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Communication Preferences</Text>
            <View style={styles.card}>
              <PreferenceItem
                icon="notifications-outline"
                title="Push Notifications"
                subtitle="Booking updates & reminders"
                value={pushNotifications}
                onToggle={() => setPushNotifications(!pushNotifications)}
              />
              <PreferenceItem
                icon="mail-outline"
                title="Email Updates"
                subtitle="Service offers & news"
                value={emailUpdates}
                onToggle={() => setEmailUpdates(!emailUpdates)}
              />
              <PreferenceItem
                icon="chatbubble-outline"
                title="SMS Alerts"
                subtitle="Urgent notifications only"
                value={smsAlerts}
                onToggle={() => setSmsAlerts(!smsAlerts)}
              />
            </View>
          </View>

          {/* Language & Display */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Language & Display</Text>
            <View style={styles.card}>
              <InfoRow
                icon="language-outline"
                label="Preferred Language"
                value={userData.language}
                onPress={() => setLanguageModal(true)}
              />
              <View style={styles.preferenceRow}>
                <View style={styles.preferenceLeft}>
                  <View style={[styles.infoIconContainer, { marginRight: 12 }]}>
                    <Ionicons name="moon-outline" size={20} color="#6B7280" />
                  </View>
                  <View>
                    <Text style={styles.preferenceTitle}>Dark Mode</Text>
                    <Text style={styles.preferenceSubtitle}>
                      Theme preference
                    </Text>
                  </View>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={() => setDarkMode(!darkMode)}
                  trackColor={{ false: "#E5E7EB", true: "#22C55E" }}
                  thumbColor="white"
                />
              </View>
            </View>
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.saveButton, { backgroundColor: primary }]}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert("Log Out", "Are you sure you want to log out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => router.replace("/(auth)/login"),
                },
              ]);
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Edit Modal */}
        <EditModal
          visible={editModal.visible}
          title={editModal.title}
          value={editModal.value}
          onSave={handleSaveField}
          onClose={() => setEditModal({ ...editModal, visible: false })}
          keyboardType={editModal.keyboardType}
          multiline={editModal.multiline}
        />

        {/* Gender Modal */}
        <GenderModal
          visible={genderModal}
          selectedGender={userData.gender}
          onSave={(gender) => setUserData((prev) => ({ ...prev, gender }))}
          onClose={() => setGenderModal(false)}
        />

        {/* Language Modal */}
        <LanguageModal
          visible={languageModal}
          selectedLanguage={userData.language}
          onSave={(language) => setUserData((prev) => ({ ...prev, language }))}
          onClose={() => setLanguageModal(false)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingTop: 48,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.2,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Profile Card
  profileCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarWrapper: {
    position: "relative",
    marginTop: -22,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "white",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
  },
  changePhotoText: {
    fontSize: 14,
    color: "#22C55E",
    marginTop: 4,
    fontWeight: "500",
  },
  photoHint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  // Sections
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  // Info Row
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lockedItem: {
    opacity: 0.75,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  religionNote: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    marginHorizontal: 4,
    lineHeight: 18,
  },

  // Preferences
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  preferenceSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 1,
  },

  // Save Button
  saveButton: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 12,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelBtn: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  modalSaveBtn: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    marginLeft: 8,
    borderRadius: 16,
  },
  modalSaveText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  genderOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  genderText: {
    fontSize: 16,
    color: "#111827",
  },
});
