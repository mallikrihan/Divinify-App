import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../theme/ThemeProvider";

const { width } = Dimensions.get("window");

const getMockData = (religion: string) => {
  const services = {
    islam: [
      "Quran Recitation",
      "Nikah Ceremony",
      "Islamic Lecture",
      "Dua Request",
    ],
    hindu: ["Puja Ceremony", "Hawan", "Vedic Path", "Griha Pravesh"],
    christianity: [
      "Prayer Service",
      "Bible Study",
      "Wedding Ceremony",
      "Baptism",
    ],
  };

  const selectedServices =
    services[religion as keyof typeof services] || services.islam;

  return {
    newRequests: [
      {
        id: "BK101",
        clientName:
          religion === "hindu"
            ? "Rajesh Kumar"
            : religion === "christianity"
              ? "John Doe"
              : "Fatima Hassan",
        clientImage: "https://i.pravatar.cc/150?u=2",
        serviceType: selectedServices[0],
        serviceLocation: "Home Service",
        time: "05:30 PM",
        location: "Sector 45, Gurgaon",
        distance: "2.4 km",
        rating: 4.8,
      },
      {
        id: "BK102",
        clientName:
          religion === "hindu"
            ? "Priya Sharma"
            : religion === "christianity"
              ? "Mary Smith"
              : "Mohammed Ali",
        clientImage: "https://i.pravatar.cc/150?u=3",
        serviceType: selectedServices[1],
        serviceLocation: "Venue Service",
        time: "07:00 PM",
        location: "Community Hall, Block C",
        distance: "3.1 km",
        rating: 4.9,
      },
    ],
    upcomingEvents: [
      {
        id: "EV101",
        title: selectedServices[1],
        date: "2026-02-24",
        day: "24",
        month: "FEB",
        time: "10:00 AM - 12:00 PM",
        clientName:
          religion === "hindu"
            ? "Amit Patel"
            : religion === "christianity"
              ? "David Williams"
              : "Ahmed Khan",
      },
      {
        id: "EV102",
        title: selectedServices[2],
        date: "2026-02-25",
        day: "25",
        month: "FEB",
        time: "02:00 PM - 04:00 PM",
        clientName:
          religion === "hindu"
            ? "Neha Gupta"
            : religion === "christianity"
              ? "Sarah Johnson"
              : "Aisha Begum",
      },
    ],
  };
};

export default function ScholarHomeScreen() {
  const router = useRouter();
  const { religion } = useReligion();
  const theme = useTheme();

  const [scholarName, setScholarName] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const todayEarnings = 1250;
  const completedCount = 12;
  const rating = 4.9;

  useEffect(() => {
    // Mock scholar name - replace with real storage/context later
    if (religion === "hindu") setScholarName("Moodi");
    else if (religion === "christianity") setScholarName("John Peter");
    else setScholarName("Ahmed Khan");
  }, [religion]);

  const mockData = getMockData(religion || "islam");
  const [newRequests, setNewRequests] = useState(mockData.newRequests);
  const upcomingEvents = mockData.upcomingEvents;

  const handleAcceptBooking = (booking: any) => {
    router.push({
      pathname: "/booking/Bookingdetails",
      params: { ...booking, status: "pending" },
    });
  };

  const handleDeclineBooking = (bookingId: string) => {
    Alert.alert("Decline Request", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Decline",
        onPress: () => {
          setNewRequests((prev) => prev.filter((req) => req.id !== bookingId));
          Alert.alert("Declined", "Booking request declined");
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => router.replace("/login") },
    ]);
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    const dayEvents = upcomingEvents.filter((e) => e.date === date.dateString);
    if (dayEvents.length > 0) {
      Alert.alert(
        "Scheduled Events",
        dayEvents
          .map((e) => `${e.title}\n${e.time}\nClient: ${e.clientName}`)
          .join("\n\n"),
      );
    } else {
      Alert.alert("No Events", "No services scheduled for this date");
    }
  };

  const getReligiousGreeting = () => {
    if (religion === "islam") return "Assalamu Alaikum";
    if (religion === "hindu") return "Namaste";
    if (religion === "christianity") return "Peace be with you";
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, paddingBottom: 0.1 }}></View>
        {/* Header with Theme Color */}
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                source={{
                  uri: "https://www.pmindia.gov.in/wp-content/uploads/2025/12/01.jpg",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>

            <View style={styles.headerText}>
              <Text style={styles.greeting}>
                {getReligiousGreeting()}, {scholarName}
              </Text>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme.primary + "40" },
                ]}
              >
                <Text style={styles.badgeText}>{theme.label}</Text>
              </View>
            </View>

            {/* Three Lines Menu Button */}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowMenu(true)}
            >
              <Ionicons name="menu" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Online/Offline Toggle */}
          <View style={styles.statusBanner}>
            <View>
              <Text style={styles.statusTitle}>
                {isOnline ? "🟢 You are Online" : "⚫ Currently Offline"}
              </Text>
              <Text style={styles.statusSub}>
                {isOnline
                  ? "Accepting new service requests"
                  : "No new requests will be shown"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsOnline(!isOnline)}
              style={[
                styles.toggleTrack,
                {
                  backgroundColor: isOnline
                    ? "#090909"
                    : "rgba(255,255,255,0.3)",
                },
              ]}
            >
              <View
                style={[
                  styles.toggleCircle,
                  isOnline
                    ? { alignSelf: "flex-end" }
                    : { alignSelf: "flex-start" },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: theme.primary }]}>
            <Text style={styles.statValue}>₹{todayEarnings}</Text>
            <Text style={styles.statLabel}>Todays Pay</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: theme.primary }]}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: theme.primary }]}>
            <Text style={styles.statValue}>{rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Pending Requests Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Pending Requests
          </Text>
          <TouchableOpacity onPress={() => router.push("/bookings")}>
            <Text style={{ color: theme.primary }}>View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Pending Requests */}
          {isOnline ? (
            newRequests.length > 0 ? (
              newRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.cardHeader}>
                    <Image
                      source={{ uri: request.clientImage }}
                      style={styles.clientImage}
                    />
                    <View style={styles.clientInfo}>
                      <Text style={styles.clientName}>
                        {request.clientName}
                      </Text>
                      <Text style={styles.serviceName}>
                        {request.serviceType} • {request.serviceLocation}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.timeTag,
                        { backgroundColor: theme.primary + "20" },
                      ]}
                    >
                      <Text style={[styles.timeText, { color: theme.primary }]}>
                        {request.time}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color="#6B7280"
                    />
                    <Text style={styles.locationText}>
                      {request.location} ({request.distance})
                    </Text>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.btn, styles.declineBtn]}
                      onPress={() => handleDeclineBooking(request.id)}
                    >
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: theme.primary }]}
                      onPress={() => handleAcceptBooking(request)}
                    >
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={48}
                  color="#D1D5DB"
                />
                <Text style={styles.emptyText}>No pending requests</Text>
              </View>
            )
          ) : (
            <View style={styles.offlineState}>
              <Ionicons name="cloud-offline" size={48} color="#D1D5DB" />
              <Text style={styles.offlineText}>
                Go online to see new requests
              </Text>
            </View>
          )}

          {/* Upcoming Events Section with Calendar */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>
              Upcoming Events
            </Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Ionicons name="calendar" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>

          {/* Upcoming Events Cards */}
          {upcomingEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.scheduleItem}>
              <View
                style={[
                  styles.dateIndicator,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text style={styles.dateNum}>{event.day}</Text>
                <Text style={styles.dateMonth}>{event.month}</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleTitle}>{event.title}</Text>
                <Text style={styles.scheduleClient}>{event.clientName}</Text>
                <Text style={styles.scheduleTime}>{event.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Calendar Modal */}
        <Modal visible={showCalendar} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <Text style={[styles.calendarTitle, { color: theme.primary }]}>
                  My Schedule
                </Text>
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                  "2026-02-24": {
                    selected: true,
                    selectedColor: theme.primary,
                    marked: true,
                  },
                  "2026-02-25": {
                    marked: true,
                    dotColor: theme.primary,
                  },
                }}
                theme={{
                  selectedDayBackgroundColor: theme.primary,
                  todayTextColor: theme.primary,
                  arrowColor: theme.primary,
                  monthTextColor: theme.primary,
                  textMonthFontWeight: "bold",
                }}
              />

              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                  <Text style={styles.legendText}>Scheduled Events</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.closeBtn, { backgroundColor: theme.primary }]}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Menu Modal */}
        <ScrollView>
          <Modal visible={showMenu} transparent animationType="fade">
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setShowMenu(false)}
            >
              <View style={styles.menuBox}>
                <View style={styles.menuHeader}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    style={styles.menuAvatar}
                  />
                  <View>
                    <Text style={styles.menuName}>{scholarName}</Text>
                    <Text style={[styles.menuRole, { color: theme.primary }]}>
                      {theme.label}
                    </Text>
                  </View>
                </View>

                <MenuOption
                  icon="person-outline"
                  label="My Profile"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/profile");
                  }}
                />
                <MenuOption
                  icon="calendar-outline"
                  label="My Schedule"
                  onPress={() => {
                    setShowMenu(false);
                    setShowCalendar(true);
                  }}
                />
                <MenuOption
                  icon="book-outline"
                  label="Notifications"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/Notifications");
                  }}
                />
                <MenuOption
                  icon="wallet-outline"
                  label="Earnings"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/earnings");
                  }}
                />
                <MenuOption
                  icon="wallet-outline"
                  label="Service"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/services");
                  }}
                />
                <MenuOption
                  icon="wallet-outline"
                  label="Service area"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/Servicearea");
                  }}
                />
                <MenuOption
                  icon="wallet-outline"
                  label="Availability"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/Availability");
                  }}
                />
                <MenuOption
                  icon="settings-outline"
                  label="Settings"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/settings");
                  }}
                />
                <MenuOption
                  icon="wallet-outline"
                  label="Reviews"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/ReviewsScreen");
                  }}
                />
                <MenuOption
                  icon="help-circle-outline"
                  label="Help & Support"
                  onPress={() => {
                    setShowMenu(false);
                    router.push("/booking/help");
                  }}
                />

                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const MenuOption = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#374151" />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  menuButton: {
    padding: 5,
    top: -20,
  },
  headerText: { flex: 1, marginLeft: 15 },
  greeting: { fontSize: 20, fontWeight: "700", color: "#FFF" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  badgeText: { color: "#FFF", fontSize: 10, fontWeight: "600" },
  statusBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 20,
  },
  statusTitle: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  statusSub: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  toggleTrack: { width: 50, height: 26, borderRadius: 15, padding: 3 },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 3,
  },
  statValue: { fontSize: 20, fontWeight: "800", color: "#1F2937" },
  statLabel: { fontSize: 11, color: "#6B7280", marginTop: 4 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  requestCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 15,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  clientImage: { width: 50, height: 50, borderRadius: 15 },
  clientInfo: { flex: 1, marginLeft: 12 },
  clientName: { fontSize: 16, fontWeight: "700" },
  serviceName: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  timeTag: { padding: 6, borderRadius: 10 },
  timeText: { fontSize: 11, fontWeight: "700" },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  locationText: { marginLeft: 6, color: "#6B7280", fontSize: 13 },
  cardActions: { flexDirection: "row", gap: 10, marginTop: 15 },
  btn: { flex: 1, padding: 12, borderRadius: 12, alignItems: "center" },
  declineBtn: { backgroundColor: "#FEE2E2" },
  declineText: { color: "#EF4444", fontWeight: "700" },
  acceptText: { color: "#FFF", fontWeight: "700" },
  offlineState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 15,
  },
  offlineText: { color: "#9CA3AF", marginTop: 10 },
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 15,
  },
  emptyText: { color: "#9CA3AF", marginTop: 10 },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
  },
  dateIndicator: {
    width: 50,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dateNum: { color: "#FFF", fontWeight: "800", fontSize: 18 },
  dateMonth: { color: "#FFF", fontSize: 10, fontWeight: "700" },
  scheduleDetails: { flex: 1, marginLeft: 15 },
  scheduleTitle: { fontWeight: "700", fontSize: 16 },
  scheduleClient: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  scheduleTime: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "#FFF",
    width: width * 0.9,
    borderRadius: 20,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6B7280",
  },
  closeBtn: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  menuBox: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 10,
  },
  menuAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  menuName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  menuRole: {
    fontSize: 12,
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F3F4F6",
  },
  menuLabel: { marginLeft: 15, fontSize: 16, color: "#374151" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  logoutText: {
    marginLeft: 10,
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
});
