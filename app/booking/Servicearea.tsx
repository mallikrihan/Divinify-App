import { useReligion } from "@/contexts/ReligionContext";
import Slider from "@react-native-community/slider"; // Ensure this is installed
import { useRouter } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { ChevronLeft, MapPin, Plus, Trash, Home, Landmark, Zap, Info, Bike } =
  LucideIcons;
const { width } = Dimensions.get("window");

export default function ServiceAreas() {
  const router = useRouter();
  const { religion } = useReligion();

  // 1. THEME COLOR LOGIC
  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  // 2. STATES
  const [radius, setRadius] = useState(15);
  const [coverageAreas, setCoverageAreas] = useState([
    { id: "1", name: "Manhattan, NY", active: true },
    { id: "2", name: "Brooklyn, NY", active: true },
  ]);

  const [preferences, setPreferences] = useState({
    homeVisits: true,
    mosqueServices: true,
    communityCenters: true,
    emergencyCalls: false,
  });

  const [travelCharges, setTravelCharges] = useState({
    freeDistance: "10 miles",
    ratePerMile: "2.50",
  });

  // Modal State for Add Area
  const [areaModal, setAreaModal] = useState(false);
  const [newArea, setNewArea] = useState({ street: "", city: "", pin: "" });

  // 3. HANDLERS
  const handleAddArea = () => {
    if (!newArea.city || !newArea.street)
      return Alert.alert("Error", "Please fill location details");
    const fullAddress = `${newArea.street}, ${newArea.city}`;
    setCoverageAreas([
      ...coverageAreas,
      { id: Date.now().toString(), name: fullAddress, active: true },
    ]);
    setAreaModal(false);
    setNewArea({ street: "", city: "", pin: "" });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color="#fff" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service Areas</Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Success", "Location Settings Saved")}
          >
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          {/* PRIMARY LOCATION (Mocked for now - Supabase link later) */}
          <Text style={styles.sectionTitle}>Primary Location</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: `${themeColor}15` },
                ]}
              >
                <Landmark size={20} color={themeColor} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardLabel}>Al-Noor Mosque</Text>
                <Text style={styles.cardSub}>
                  123 Main Street, Downtown, NY
                </Text>
              </View>
              <View
                style={[styles.checkBadge, { backgroundColor: themeColor }]}
              >
                <LucideIcons.Check color="#fff" size={14} />
              </View>
            </View>
          </View>

          {/* SERVICE RADIUS */}
          <Text style={styles.sectionTitle}>Service Radius</Text>
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.labelMedium}>Travel Distance</Text>
              <Text style={[styles.radiusText, { color: themeColor }]}>
                {radius} km
              </Text>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={5}
              maximumValue={50}
              step={5}
              value={radius}
              onValueChange={setRadius}
              minimumTrackTintColor={themeColor}
              maximumTrackTintColor="#D1D5DB"
            />
            <View style={styles.rowBetween}>
              <Text style={styles.rangeText}>5 km</Text>
              <Text style={styles.rangeText}>25 km</Text>
              <Text style={styles.rangeText}>50 km</Text>
            </View>
            <View style={styles.infoBox}>
              <Info size={16} color="#3B82F6" />
              <Text style={styles.infoText}>
                Travel charges may apply for distances over 10 miles
              </Text>
            </View>
          </View>

          {/* COVERAGE AREAS */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Coverage Areas</Text>
            <TouchableOpacity onPress={() => setAreaModal(true)}>
              <Text style={{ color: themeColor, fontWeight: "bold" }}>
                Add Area
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {coverageAreas.map((area) => (
              <View key={area.id} style={styles.listItem}>
                <View style={styles.row}>
                  <View style={styles.pinIcon}>
                    <MapPin
                      size={18}
                      color={area.active ? themeColor : "#9CA3AF"}
                    />
                  </View>
                  <Text style={styles.listText}>{area.name}</Text>
                </View>
                <Switch
                  value={area.active}
                  onValueChange={(val) =>
                    setCoverageAreas(
                      coverageAreas.map((a) =>
                        a.id === area.id ? { ...a, active: val } : a,
                      ),
                    )
                  }
                  trackColor={{ false: "#eee", true: themeColor }}
                />
              </View>
            ))}
          </View>

          {/* TRAVEL PREFERENCES */}
          <Text style={styles.sectionTitle}>Travel Preferences</Text>
          <View style={styles.card}>
            {[
              {
                key: "homeVisits",
                label: "Home Visits",
                icon: <Home size={18} color="#6B7280" />,
              },
              {
                key: "mosqueServices",
                label: "Mosque Services",
                icon: <Landmark size={18} color="#6B7280" />,
              },
              {
                key: "communityCenters",
                label: "Community Centers",
                icon: <LucideIcons.Users size={18} color="#6B7280" />,
              },
              {
                key: "emergencyCalls",
                label: "Emergency Calls",
                icon: <Zap size={18} color="#6B7280" />,
              },
            ].map((pref) => (
              <View key={pref.key} style={styles.listItem}>
                <View style={styles.row}>
                  {pref.icon}
                  <Text style={styles.listText}>{pref.label}</Text>
                </View>
                <Switch
                  value={preferences[pref.key]}
                  onValueChange={(val) =>
                    setPreferences({ ...preferences, [pref.key]: val })
                  }
                  trackColor={{ false: "#eee", true: themeColor }}
                />
              </View>
            ))}
          </View>

          {/* TRAVEL CHARGES */}
          <Text style={styles.sectionTitle}>Travel Charges</Text>
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.labelMedium}>Free Travel Distance</Text>
                <Text style={styles.cardSub}>No extra charges within</Text>
              </View>
              <TextInput
                value={travelCharges.freeDistance}
                style={styles.inputBox}
              />
            </View>
            <View style={[styles.rowBetween, { marginTop: 15 }]}>
              <View>
                <Text style={styles.labelMedium}>Rate per Mile</Text>
                <Text style={styles.cardSub}>Charge beyond free distance</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginRight: 5 }}>₹</Text>
                <TextInput
                  value={travelCharges.ratePerMile}
                  style={styles.inputBox}
                />
              </View>
            </View>
            <View style={styles.exampleBox}>
              <Bike size={18} color="#B45309" />
              <Text style={styles.exampleText}>
                Example: 15-mile trip = ₹12.50 travel charge
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* ADD AREA POPUP */}
        <Modal visible={areaModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Coverage Area</Text>
              <TextInput
                placeholder="Street / Landmark"
                style={styles.input}
                onChangeText={(t) => setNewArea({ ...newArea, street: t })}
              />
              <TextInput
                placeholder="City"
                style={styles.input}
                onChangeText={(t) => setNewArea({ ...newArea, city: t })}
              />
              <TextInput
                placeholder="Pin Code"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(t) => setNewArea({ ...newArea, pin: t })}
              />
              <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => setAreaModal(false)}>
                  <Text style={{ color: "#888" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddArea}
                  style={[styles.popBtn, { backgroundColor: themeColor }]}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Add Area
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  saveBtn: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  scrollBody: { padding: 15 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
    marginTop: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardSub: { color: "#888", fontSize: 12 },
  labelMedium: { fontSize: 14, fontWeight: "600", color: "#374151" },
  radiusText: { fontSize: 18, fontWeight: "bold" },
  rangeText: { fontSize: 12, color: "#9CA3AF" },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  infoText: { color: "#1E40AF", fontSize: 12, marginLeft: 8, flex: 1 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F3F4F6",
  },
  pinIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  listText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 10,
  },
  inputBox: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 80,
    textAlign: "center",
  },
  exampleBox: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  exampleText: { color: "#92400E", fontSize: 12, marginLeft: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  popBtn: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 10 },
});
