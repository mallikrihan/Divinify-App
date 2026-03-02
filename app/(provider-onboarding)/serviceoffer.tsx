import { useReligion } from "@/contexts/ReligionContext";
import { updateServices } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Book, Flower, Heart, Sun } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceOffer() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const dispatch = useDispatch();

  const savedServices = useSelector(
    (state: RootState) => state.onboarding.services,
  );

  const [selectedServices, setSelectedServices] = useState<string[]>(
    savedServices?.services?.map((s) => s.name) || [],
  );

  const [services, setServices] = useState(
    getServicesByReligion(religion, savedServices?.services),
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const getProgressColor = () => {
    switch (religion?.toLowerCase()) {
      case "islam":
        return "#10B981";
      case "hindu":
        return "#F59E0B";
      case "christianity":
        return "#3B82F6";
      default:
        return primary;
    }
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName],
    );
  };

  const openCustomize = (service: any) => {
    setEditingService({ ...service });
    setModalVisible(true);
  };

  const saveCustomization = () => {
    setServices((prev) =>
      prev.map((s) =>
        s.name === editingService.name
          ? { ...editingService, customizedPricing: true }
          : s,
      ),
    );

    if (!selectedServices.includes(editingService.name)) {
      setSelectedServices((prev) => [...prev, editingService.name]);
    }

    setModalVisible(false);
  };

  const { returnTo, fromReview } = useLocalSearchParams<{
    returnTo: string;
    fromReview: string;
  }>();
  const isEditing = returnTo === "review" || fromReview === "true";

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      Alert.alert("Selection Required", "Please select at least one service.");
      return;
    }

    const selectedServicesData = services.filter((s) =>
      selectedServices.includes(s.name),
    );
    dispatch(
      updateServices({
        services: selectedServicesData,
        updatedAt: new Date().toISOString(),
      }),
    );

    isEditing
      ? router.replace({
          pathname: "/(provider-onboarding)/reviewsubmit",
          params: { updated: "true" },
        })
      : router.push("/(provider-onboarding)/paymentsetup");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {religion ? `${religion} Scholar` : "Scholar"} Services
          </Text>
          <Text style={styles.headerSubtitle}>
            Configure your specific religious offerings
          </Text>
        </View>

        <View style={styles.cardOverlap}>
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <TouchableOpacity
                key={service.name}
                onPress={() => toggleService(service.name)}
                style={[
                  styles.serviceCard,
                  isSelected && {
                    borderColor: getProgressColor(),
                    backgroundColor: "#F9FAFB",
                  },
                ]}
              >
                <View style={styles.cardRow}>
                  <View
                    style={[
                      styles.iconBox,
                      {
                        backgroundColor: isSelected
                          ? `${getProgressColor()}20`
                          : "#F3F4F6",
                      },
                    ]}
                  >
                    {getServiceIcon(service.name, getProgressColor())}
                  </View>
                  <View style={styles.serviceInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.serviceTitle}>{service.name}</Text>
                      <View
                        style={[
                          styles.check,
                          isSelected && {
                            backgroundColor: getProgressColor(),
                            borderColor: getProgressColor(),
                          },
                        ]}
                      >
                        {isSelected && (
                          <Ionicons name="checkmark" size={12} color="white" />
                        )}
                      </View>
                    </View>
                    <Text style={styles.desc}>{service.description}</Text>
                    <View style={styles.meta}>
                      <Text style={styles.priceText}>
                        🕒 {service.duration} • Rs ₹{service.price}
                      </Text>
                      <TouchableOpacity onPress={() => openCustomize(service)}>
                        <Text
                          style={[
                            styles.custLink,
                            { color: getProgressColor() },
                          ]}
                        >
                          Customize
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: getProgressColor() },
            selectedServices.length === 0 && { opacity: 0.5 },
          ]}
          onPress={handleContinue}
          disabled={selectedServices.length === 0}
        >
          <Text style={styles.btnText}>
            {isEditing ? "Save & Return" : "Continue to Next Step"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Customize {editingService?.name}
            </Text>

            <Text style={styles.label}>Service Fee (₹)</Text>
            <TextInput
              style={styles.input}
              value={String(editingService?.price || "")}
              keyboardType="numeric"
              onChangeText={(t) =>
                setEditingService({ ...editingService, price: t })
              }
            />

            <Text style={styles.label}>Estimated Duration</Text>
            <TextInput
              style={styles.input}
              value={editingService?.duration}
              onChangeText={(t) =>
                setEditingService({ ...editingService, duration: t })
              }
            />

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: getProgressColor() }]}
              onPress={saveCustomization}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Apply to Main View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EF4444",
                  fontWeight: "600",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

function getServicesByReligion(religion: string, existing?: any[]) {
  const data: Record<string, any[]> = {
    islam: [
      {
        name: "Nikah Ceremony",
        description: "Islamic marriage contract and ritual.",
        duration: "2 hours",
        price: 3000,
      },
      {
        name: "Quran Recitation",
        description: "Spiritual Quran reading for events.",
        duration: "1 hour",
        price: 1000,
      },
      {
        name: "Janaza Guidance",
        description: "Support for funeral rites.",
        duration: "1.5 hours",
        price: 2000,
      },
    ],
    hindu: [
      {
        name: "Vedic Wedding",
        description: "Traditional 7-phera marriage ceremony.",
        duration: "4 hours",
        price: 8000,
      },
      {
        name: "Griha Pravesh Puja",
        description: "Blessing ceremony for new homes.",
        duration: "3 hours",
        price: 5000,
      },
      {
        name: "Satyanarayan Katha",
        description: "Auspicious storytelling and prayer.",
        duration: "2 hours",
        price: 3500,
      },
    ],
    christianity: [
      {
        name: "Church Wedding",
        description: "Sacramental marriage ceremony.",
        duration: "2 hours",
        price: 6000,
      },
      {
        name: "Christening",
        description: "Sacrament of baptism for infants.",
        duration: "1 hour",
        price: 2500,
      },
    ],
  };

  const defaults = data[religion?.toLowerCase()] || data.islam;
  return existing
    ? defaults.map((d) => ({
        ...d,
        ...(existing.find((s) => s.name === d.name) || {}),
      }))
    : defaults;
}

function getServiceIcon(name: string, color: string) {
  if (name.includes("Wedding") || name.includes("Nikah"))
    return <Heart size={22} color={color} />;
  if (name.includes("Puja") || name.includes("Quran"))
    return <Book size={22} color={color} />;
  if (name.includes("Katha")) return <Sun size={22} color={color} />;
  return <Flower size={22} color={color} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBFBFB" },
  header: {
    padding: 25,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  backButton: { marginBottom: 20 },
  headerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
  headerSubtitle: { color: "white", opacity: 0.9, fontSize: 14, marginTop: 4 },
  cardOverlap: { paddingHorizontal: 20, marginTop: 25 },
  serviceCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },
  cardRow: { flexDirection: "row" },
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  serviceInfo: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceTitle: { fontSize: 17, fontWeight: "700", color: "#111827" },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  desc: { fontSize: 13, color: "#6B7280", marginTop: 6, lineHeight: 18 },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  priceText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  custLink: { fontWeight: "800", fontSize: 14 },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  btn: { padding: 18, borderRadius: 16, alignItems: "center", elevation: 2 },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 25,
  },
  modalContainer: { backgroundColor: "white", padding: 30, borderRadius: 25 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 14, color: "#4B5563", marginTop: 15, fontWeight: "600" },
  input: {
    borderBottomWidth: 2,
    borderColor: "#F3F4F6",
    paddingVertical: 12,
    fontSize: 18,
    color: "#111827",
    fontWeight: "500",
  },
  saveBtn: {
    marginTop: 30,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
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
