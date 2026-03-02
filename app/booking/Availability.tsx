import { useReligion } from "@/contexts/ReligionContext";
import { toggleOnlineStatus } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { ChevronLeft, Power, Trash, Coffee, Calendar, Bell } = LucideIcons;

export default function AvailabilityManager() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { religion } = useReligion();

  // 1. REDUX STATE (Sync with Home)
  const isOnline = useSelector((state: RootState) => state.onboarding.isOnline);

  // 2. THEME COLOR LOGIC
  const themeColor =
    religion?.toLowerCase() === "islam"
      ? "#10B981"
      : religion?.toLowerCase() === "hindu"
        ? "#F59E0B"
        : "#3B82F6";

  // 3. COMPONENT STATES
  const [isAutoAccept, setIsAutoAccept] = useState(false);
  const [schedule, setSchedule] = useState({
    Monday: { active: true, time: "09:00 AM - 06:00 PM" },
    Tuesday: { active: true, time: "09:00 AM - 06:00 PM" },
    Wednesday: { active: true, time: "09:00 AM - 06:00 PM" },
    Thursday: { active: true, time: "09:00 AM - 06:00 PM" },
    Friday: { active: true, time: "09:00 AM - 06:00 PM" },
    Saturday: { active: false, time: "Off" },
    Sunday: { active: false, time: "Off" },
  });

  const [breaks, setBreaks] = useState([
    { id: "1", title: "Lunch", val: "01:00 PM" },
  ]);
  const [specialDays, setSpecialDays] = useState([
    { id: "1", title: "Eid/Holiday", val: "20 Oct" },
  ]);

  // Modal Control
  const [modalType, setModalType] = useState<null | "break" | "date">(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempVal, setTempVal] = useState("");

  // 4. FUNCTIONS
  const handleAddItem = () => {
    if (!tempTitle || !tempVal)
      return Alert.alert("Wait", "Please fill both fields");
    const newItem = {
      id: Date.now().toString(),
      title: tempTitle,
      val: tempVal,
    };
    if (modalType === "break") setBreaks([...breaks, newItem]);
    else setSpecialDays([...specialDays, newItem]);

    setModalType(null);
    setTempTitle("");
    setTempVal("");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color="#fff" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Availability</Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Success", "Settings Saved")}
          >
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          {/* TOP CARD: SERVICE STATUS (Syncs with Home) */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: isOnline ? `${themeColor}20` : "#F3F4F6",
                    },
                  ]}
                >
                  <Power size={20} color={isOnline ? themeColor : "#888"} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.cardLabel}>
                    {isOnline ? "Service Online" : "Service Offline"}
                  </Text>
                  <Text style={styles.cardSub}>Visible on Home Screen</Text>
                </View>
              </View>
              <Switch
                value={isOnline}
                onValueChange={() => dispatch(toggleOnlineStatus())}
                trackColor={{ false: "#ccc", true: themeColor }}
              />
            </View>
          </View>

          {/* WEEKLY SCHEDULE */}
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.card}>
            {Object.entries(schedule).map(([day, data]: any) => (
              <View key={day} style={styles.dayRow}>
                <View
                  style={[
                    styles.dayCircle,
                    {
                      backgroundColor: data.active
                        ? `${themeColor}15`
                        : "#F3F4F6",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayLetter,
                      { color: data.active ? themeColor : "#9CA3AF" },
                    ]}
                  >
                    {day[0]}
                  </Text>
                </View>
                <Text style={styles.dayName}>{day}</Text>
                <Text style={styles.timeText}>
                  {data.active ? "09:00 AM - 06:00 PM" : "Off"}
                </Text>
                <Switch
                  value={data.active}
                  onValueChange={() =>
                    setSchedule({
                      ...schedule,
                      [day]: { ...data, active: !data.active },
                    })
                  }
                  trackColor={{ false: "#eee", true: themeColor }}
                />
              </View>
            ))}
          </View>

          {/* BREAKS */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Breaks</Text>
            <TouchableOpacity onPress={() => setModalType("break")}>
              <Text style={{ color: themeColor, fontWeight: "bold" }}>
                + Add Break
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {breaks.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.row}>
                  <Coffee size={18} color="#888" />
                  <Text style={styles.listText}>
                    {item.title} ({item.val})
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setBreaks(breaks.filter((i) => i.id !== item.id))
                  }
                >
                  <Trash size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* SPECIAL DATES */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Special Dates</Text>
            <TouchableOpacity onPress={() => setModalType("date")}>
              <Text style={{ color: themeColor, fontWeight: "bold" }}>
                + Add Date
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {specialDays.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.row}>
                  <Calendar size={18} color="#888" />
                  <Text style={styles.listText}>
                    {item.title} - {item.val}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setSpecialDays(specialDays.filter((i) => i.id !== item.id))
                  }
                >
                  <Trash size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* BOOKING NOTIFICATION CARD */}
          <View style={styles.notificationCard}>
            <View style={styles.cardHeader}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.bellCircle,
                    { backgroundColor: `${themeColor}15` },
                  ]}
                >
                  <LucideIcons.Bell size={18} color={themeColor} />
                </View>
                <Text style={styles.newRequestText}>New Booking Request</Text>
              </View>
              <Text style={styles.timeAgo}>Just Now</Text>
            </View>

            <View style={styles.bookingDetails}>
              <Text style={styles.customerName}>Rahul Sharma</Text>
              <Text style={styles.serviceType}>AC Repair & Service</Text>

              <View style={styles.infoRow}>
                <LucideIcons.MapPin size={14} color="#6B7280" />
                <Text style={styles.infoText}>Sector 15, Green Apartments</Text>
              </View>

              <View style={styles.infoRow}>
                <LucideIcons.Clock size={14} color="#6B7280" />
                <Text style={styles.infoText}>Today, 04:30 PM</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.declineBtn}>
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.acceptBtn, { backgroundColor: themeColor }]}
              >
                <Text style={styles.acceptText}>Accept Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* POP-UP MODAL */}
        <Modal visible={!!modalType} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {modalType === "break" ? "Add Break" : "Add Special Date"}
              </Text>
              <TextInput
                placeholder="Title"
                style={styles.input}
                onChangeText={setTempTitle}
              />
              <TextInput
                placeholder={
                  modalType === "break"
                    ? "Time (e.g. 1PM)"
                    : "Date (e.g. 25 Oct)"
                }
                style={styles.input}
                onChangeText={setTempVal}
              />
              <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => setModalType(null)}>
                  <Text style={{ color: "#888" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddItem}
                  style={[styles.popBtn, { backgroundColor: themeColor }]}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Add</Text>
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
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: { fontSize: 16, fontWeight: "700" },
  cardSub: { color: "#888", fontSize: 12 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
    marginTop: 5,
  },
  dayRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dayLetter: { fontWeight: "bold", fontSize: 13 },
  dayName: { flex: 1, fontWeight: "600", fontSize: 14 },
  timeText: { fontSize: 12, color: "#666", marginRight: 10 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  listText: { marginLeft: 10, fontWeight: "500" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    padding: 8,
  },
  popBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bellCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  newRequestText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  timeAgo: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  bookingDetails: {
    marginBottom: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  serviceType: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#4B5563",
    marginLeft: 6,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  declineBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  declineText: {
    color: "#4B5563",
    fontWeight: "600",
  },
  acceptBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
