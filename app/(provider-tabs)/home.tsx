import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { religion } = useReligion();
  const [isOnline, setIsOnline] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Calendar states
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2024, 2025, 2026, 2027, 2028];

  const getTheme = () => {
    const selected = religion?.toLowerCase().trim();
    if (selected === "islam" || selected === "muslim") {
      return { primary: "#0E9F6E", secondary: "#E8F5E9", label: "Islam" };
    }
    if (selected === "hindu" || selected === "hinduism") {
      return { primary: "#F59E0B", secondary: "#FFF3E0", label: "Hinduism" };
    }
    if (selected === "christianity" || selected === "christian") {
      return {
        primary: "#3B82F6",
        secondary: "#E3F2FD",
        label: "Christianity",
      };
    }
    return { primary: "#6200EE", secondary: "#F3E5F5", label: "Default" };
  };

  const theme = getTheme();

  // Sample data
  const scholarInfo = {
    name: "Sheikh Ahmed",
    title: "Islamic Scholar",
    rating: 4.9,
    completedBookings: 127,
    totalClients: 89,
    todayEarnings: 550,
    earningsIncrease: 18,
    servicesOffered: 2,
  };

  const todayBookings = [
    {
      id: 1,
      clientName: "Muhammad Ali",
      service: "Jummah Prayer Service",
      status: "confirmed",
      time: "2:00 PM - 3:30 PM",
      distance: "2.5 km",
      clientImage: null,
    },
    {
      id: 2,
      clientName: "Fatima Hassan",
      service: "Quran Recitation",
      status: "pending",
      time: "5:30 PM - 6:30 PM",
      distance: "1.2 km",
      clientImage: null,
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      title: "Nikhah Ceremony",
      date: "Tomorrow, Dec 20",
      time: "10:00 AM",
      description: "Ahmad & Sarah",
    },
    {
      id: 2,
      title: "Jummah Prayer",
      date: "Dec 22, Friday",
      time: "1:00 PM",
      description: "Community Service",
    },
    {
      id: 3,
      title: "Quran Teaching",
      date: "Dec 24, Sunday",
      time: "4:00 PM",
      description: "Private Session",
    },
  ];

  const handleBookingAction = (bookingId: number, action: string) => {
    if (action === "accept") {
      Alert.alert("Success", "Booking accepted successfully");
    } else if (action === "decline") {
      Alert.alert("Booking Declined", "You have declined this booking");
    }
  };

  const CalendarModal = () => (
    <Modal
      visible={showCalendar}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.calendarModalContent}>
          <Text style={styles.calendarModalTitle}>Select Date</Text>

          {/* Year Selection */}
          <Text style={styles.pickerLabel}>Year</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.yearScroll}
          >
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearButton,
                  selectedYear === year && styles.selectedYearButton,
                ]}
                onPress={() => setSelectedYear(year)}
              >
                <Text
                  style={[
                    styles.yearButtonText,
                    selectedYear === year && styles.selectedYearText,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Month Selection */}
          <Text style={styles.pickerLabel}>Month</Text>
          <View style={styles.monthGrid}>
            {monthNames.map((month, index) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthButton,
                  selectedMonth === index && styles.selectedMonthButton,
                ]}
                onPress={() => setSelectedMonth(index)}
              >
                <Text
                  style={[
                    styles.monthButtonText,
                    selectedMonth === index && styles.selectedMonthText,
                  ]}
                >
                  {month.substring(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Selection */}
          <Text style={styles.pickerLabel}>Date</Text>
          <View style={styles.dateGrid}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateButton,
                  selectedDate.getDate() === date &&
                    selectedDate.getMonth() === selectedMonth &&
                    selectedDate.getFullYear() === selectedYear &&
                    styles.selectedDateButton,
                ]}
                onPress={() => {
                  setSelectedDate(new Date(selectedYear, selectedMonth, date));
                  setShowCalendar(false);
                  router.push(
                    `/(provider-tabs)/schedule?date=${selectedYear}-${selectedMonth + 1}-${date}`,
                  );
                }}
              >
                <Text
                  style={[
                    styles.dateButtonText,
                    selectedDate.getDate() === date &&
                      selectedDate.getMonth() === selectedMonth &&
                      selectedDate.getFullYear() === selectedYear &&
                      styles.selectedDateText,
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: theme.primary }]}
              onPress={() => {
                setShowCalendar(false);
                router.push(
                  `/(provider-tabs)/schedule?date=${selectedYear}-${selectedMonth + 1}-${selectedDate.getDate()}`,
                );
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ProfileMenu = () => (
    <Modal
      visible={showProfileMenu}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowProfileMenu(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowProfileMenu(false)}
      >
        <ScrollView>
          <View
            style={[styles.profileMenu, { backgroundColor: theme.primary }]}
          >
            <View style={styles.profileMenuHeader}>
              <View style={styles.profileImageLarge}>
                <Text style={styles.profileImageText}>SA</Text>
              </View>
              <Text style={styles.profileName}>Sheikh Ahmed</Text>
              <Text style={styles.profileTitle}>Islamic Scholar</Text>
            </View>

            <View style={styles.profileMenuItems}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/(provider-tabs)/profile");
                }}
              >
                <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                <Text style={styles.menuItemText}>My Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/booking/earnings");
                }}
              >
                <Ionicons name="wallet-outline" size={22} color="#FFFFFF" />
                <Text style={styles.menuItemText}>Earnings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/booking/schedule");
                }}
              >
                <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
                <Text style={styles.menuItemText}>My Schedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/booking/services");
                }}
              >
                <Ionicons name="apps-outline" size={22} color="#FFFFFF" />
                <Text style={styles.menuItemText}>Services</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/booking/settings");
                }}
              >
                <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/booking/help");
                }}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#FFFFFF"
                />
                <Text style={styles.menuItemText}>Help & Support</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={() => {
                  setShowProfileMenu(false);
                  Alert.alert("Logout", "Are you sure you want to logout?", [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Logout",
                      onPress: () => router.replace("/(auth)/login"),
                    },
                  ]);
                }}
              >
                <Ionicons name="log-out-outline" size={22} color="#FFB4B4" />
                <Text style={[styles.menuItemText, styles.logoutText]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeMenuButton}
              onPress={() => setShowProfileMenu(false)}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.profileToggle}
            onPress={() => setShowProfileMenu(true)}
          >
            <View style={styles.profileImageSmall}>
              <Text style={styles.profileImageSmallText}>SA</Text>
            </View>
            <View>
              <Text style={styles.scholarName}>{scholarInfo.name}</Text>
              <Text style={styles.scholarTitle}>{scholarInfo.title}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Online Status Toggle */}
        <View style={styles.statusContainer}>
          <View style={styles.statusLeft}>
            <View
              style={[
                styles.statusDot,
                isOnline ? styles.onlineDot : styles.offlineDot,
              ]}
            />
            <Text style={styles.statusText}>
              You are {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
          <Text style={styles.statusSubtext}>
            {isOnline ? "Available for bookings" : "Not accepting bookings"}
          </Text>
          <TouchableOpacity
            style={[
              styles.statusToggle,
              isOnline ? styles.onlineToggle : styles.offlineToggle,
            ]}
            onPress={() => setIsOnline(!isOnline)}
          >
            <Text style={styles.toggleText}>
              {isOnline ? "Go Offline" : "Go Online"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Todays Earnings</Text>
            <TouchableOpacity onPress={() => router.push("/booking/earnings")}>
              <Text style={[styles.viewAllText, { color: theme.primary }]}>
                View All →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.earningsContent}>
            <View>
              <Text style={styles.earningsAmount}>
                ₦{scholarInfo.todayEarnings}
              </Text>
              <View style={styles.earningsIncrease}>
                <Ionicons name="arrow-up" size={16} color="#10B981" />
                <Text style={styles.increaseText}>
                  +{scholarInfo.earningsIncrease}% from yesterday
                </Text>
              </View>
            </View>

            <View style={styles.servicesBadge}>
              <Text style={styles.servicesCount}>
                {scholarInfo.servicesOffered}
              </Text>
              <Text style={styles.servicesLabel}>Services</Text>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Today's Bookings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today s Bookings</Text>
            <TouchableOpacity
              onPress={() => router.push("/(provider-tabs)/bookings")}
            >
              <Text style={[styles.seeAllText, { color: theme.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {todayBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => router.push("/(provider-tabs)/bookings")}
            >
              <View style={styles.bookingHeader}>
                <View style={styles.clientInfo}>
                  <View style={styles.clientImagePlaceholder}>
                    <Text style={styles.clientInitials}>
                      {booking.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.clientName}>{booking.clientName}</Text>
                    <Text style={styles.serviceName}>{booking.service}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.bookingStatus,
                    {
                      backgroundColor:
                        booking.status === "confirmed" ? "#DCFCE7" : "#FEF3C7",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          booking.status === "confirmed"
                            ? "#166534"
                            : "#92400E",
                      },
                    ]}
                  >
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Text>
                </View>
              </View>

              <View style={styles.bookingDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{booking.distance} away</Text>
                </View>
              </View>

              {booking.status === "confirmed" ? (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => router.push("/(provider-tabs)/messages")}
                  >
                    <Ionicons name="call-outline" size={18} color="#3B82F6" />
                    <Text style={styles.callButtonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.messageButton]}
                    onPress={() => router.push("/(provider-tabs)/messages")}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={18}
                      color="#FFFFFF"
                    />
                    <Text style={styles.messageButtonText}>Message</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={() => handleBookingAction(booking.id, "accept")}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.declineButton]}
                    onPress={() => handleBookingAction(booking.id, "decline")}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming This Week Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.upcomingHeaderLeft}>
              <Ionicons name="calendar" size={20} color={theme.primary} />
              <Text style={styles.sectionTitle}>Upcoming This Week</Text>
            </View>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>

          {upcomingBookings.map((booking) => (
            <View key={booking.id} style={styles.upcomingCard}>
              <View style={styles.upcomingDateBox}>
                <Text style={styles.upcomingDate}>
                  {booking.date.split(",")[0]}
                </Text>
                <Text style={styles.upcomingDay}>
                  {booking.date.split(",")[1]}
                </Text>
              </View>
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{booking.title}</Text>
                <Text style={styles.upcomingTime}>{booking.time}</Text>
                <Text style={styles.upcomingDesc}>{booking.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rating and Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{scholarInfo.rating}</Text>
            <View style={styles.statStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={14}
                  color={
                    star <= Math.floor(scholarInfo.rating)
                      ? "#F59E0B"
                      : "#D1D5DB"
                  }
                />
              ))}
            </View>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {scholarInfo.completedBookings}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{scholarInfo.totalClients}</Text>
            <Text style={styles.statLabel}>Clients</Text>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Profile Menu Modal */}
      <ProfileMenu />

      {/* Calendar Modal */}
      <CalendarModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageSmallText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0E9F6E",
  },
  scholarName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  scholarTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  statusContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 15,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  onlineDot: {
    backgroundColor: "#10B981",
  },
  offlineDot: {
    backgroundColor: "#9CA3AF",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  statusSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginBottom: 10,
  },
  statusToggle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  onlineToggle: {
    backgroundColor: "#EF4444",
  },
  offlineToggle: {
    backgroundColor: "#10B981",
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  earningsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  earningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  earningsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  earningsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },
  earningsIncrease: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  increaseText: {
    fontSize: 12,
    color: "#10B981",
    marginLeft: 4,
  },
  servicesBadge: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  servicesCount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  servicesLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  completedText: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  upcomingHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  clientImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  clientInitials: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4B5563",
  },
  clientName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  serviceName: {
    fontSize: 12,
    color: "#6B7280",
  },
  bookingStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  // statusText: {
  //   fontSize: 11,
  //   fontWeight: "700",
  // },
  bookingDetails: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: "#6B7280",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  callButton: {
    backgroundColor: "#EFF6FF",
  },
  callButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  messageButton: {
    backgroundColor: "#3B82F6",
  },
  messageButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  acceptButton: {
    backgroundColor: "#10B981",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  declineButton: {
    backgroundColor: "#FEE2E2",
  },
  declineButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  upcomingCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  upcomingDateBox: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  upcomingDate: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  upcomingDay: {
    fontSize: 11,
    color: "#6B7280",
  },
  upcomingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  upcomingTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  upcomingDesc: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },
  statStars: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  // Calendar Modal Styles
  calendarModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    alignSelf: "center",
  },
  calendarModalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 10,
    marginTop: 10,
  },
  yearScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
  yearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    marginRight: 10,
  },
  selectedYearButton: {
    backgroundColor: "#0E9F6E",
  },
  yearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  selectedYearText: {
    color: "#FFFFFF",
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  monthButton: {
    width: "23%",
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedMonthButton: {
    backgroundColor: "#0E9F6E",
  },
  monthButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  selectedMonthText: {
    color: "#FFFFFF",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
    maxHeight: 200,
  },
  dateButton: {
    width: "13%",
    padding: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedDateButton: {
    backgroundColor: "#0E9F6E",
  },
  dateButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  selectedDateText: {
    color: "#FFFFFF",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Profile Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  profileMenu: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: "80%",
  },
  profileMenuHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImageText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0E9F6E",
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  profileTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  profileMenuItems: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    gap: 15,
  },
  menuItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FFB4B4",
  },
  closeMenuButton: {
    alignItems: "center",
    paddingVertical: 15,
  },
});
