import {
  ChevronRight
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationCard from "../../components/cards/NotificationCard";

interface BookingsTabProps {
  themeColor: string;
}

export default function BookingsTab({ themeColor }: BookingsTabProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* TODAY SECTION */}
      <View style={styles.sectionHeader}>
        <View style={[styles.dot, { backgroundColor: themeColor }]} />
        <Text style={styles.sectionLabel}>Today</Text>
      </View>

      <View style={styles.cardWrapper}>
        <NotificationCard
          type="Bookings"
          title="New Booking Request"
          message="Sarah Ahmed has requested a Nikah ceremony for March 25, 2026 at 2:00 PM"
          time="5 minutes ago"
          themeColor={themeColor}
          showActions={true}
        />
      </View>

      {/* YESTERDAY SECTION */}
      <View style={styles.sectionHeader}>
        <View style={styles.dotGrey} />
        <Text style={styles.sectionLabel}>Yesterday</Text>
      </View>

      <View style={styles.cardWrapper}>
        <NotificationCard
          type="Bookings"
          title="Booking Confirmed"
          message="Your booking for Fatiha service has been confirmed for March 20, 2026"
          time="Yesterday, 3:30 PM"
          themeColor={themeColor}
        />

        <NotificationCard
          type="Bookings"
          title="Service Reminder"
          message="Reminder: You have a Quran Khani service scheduled for today at 10:00 AM"
          time="Yesterday, 8:00 PM"
          themeColor={themeColor}
        />
      </View>

      {/* VIEW ALL BUTTON (Optional UI addition) */}
      <TouchableOpacity style={styles.historyBtn}>
        <Text style={[styles.historyText, { color: themeColor }]}>
          View Booking History
        </Text>
        <ChevronRight size={16} color={themeColor} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingHorizontal: 4, // Slight padding so shadows aren't cut off
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotGrey: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
    marginRight: 8,
  },
  sectionLabel: {
    fontWeight: "800",
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardWrapper: {
    // Add a slight vertical gap between grouped cards
    gap: 12,
  },
  historyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  historyText: {
    fontSize: 14,
    fontWeight: "700",
    marginRight: 4,
  },
});
