import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NotificationCard from "../../components/cards/NotificationCard";

interface AllTabProps {
  themeColor: string;
}

// Simulating user-specific notifications
// In a real app, this data would come from an API or context
export default function AllTab({ themeColor }: AllTabProps) {
  // This would typically come from a user context or API
  const currentUser = {
    id: "scholar_123",
    name: "Imam Abdullah",
  };

  // User-specific notifications for this scholar
  const notifications = [
    {
      id: "1",
      type: "Bookings" as const,
      title: "New Booking Request",
      message:
        "Sarah Ahmed has requested a Nikah ceremony for March 25, 2024 at 2:00 PM",
      time: "5 minutes ago",
      showActions: true,
      customerName: "Sarah Ahmed",
      serviceType: "Nikah Ceremony",
      amount: "₹150.00",
    },
    {
      id: "2",
      type: "Payments" as const,
      title: "Payment Received",
      message:
        "₹150 payment received for Nikah ceremony service from Ahmed Hassan",
      time: "2 hours ago",
      customerName: "Ahmed Hassan",
      amount: "₹150.00",
    },
    {
      id: "3",
      type: "Reviews" as const,
      title: "New Review Received",
      message:
        "Ahmed Hassan left a 5-star review for your Nikah ceremony service",
      time: "Yesterday, 8:00 PM",
      customerName: "Ahmed Hassan",
      rating: 5,
    },
    {
      id: "4",
      type: "System" as const,
      title: "Service Reminder",
      message:
        "Reminder: You have a Quran Khani service scheduled for today at 10:00 AM",
      time: "Yesterday, 8:00 PM",
    },
    {
      id: "5",
      type: "System" as const,
      title: "Welcome to Faithful Services",
      message:
        "Your scholar account has been approved. Start receiving bookings now!",
      time: "3 days ago",
    },
  ];

  // Group notifications by date
  const today = notifications.filter(
    (n) => n.time.includes("minutes") || n.time.includes("hours"),
  );
  const yesterday = notifications.filter((n) => n.time.includes("Yesterday"));
  const earlier = notifications.filter((n) => n.time.includes("days"));

  return (
    <View>
      {today.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Today</Text>
          {today.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              themeColor={themeColor}
            />
          ))}
        </>
      )}

      {yesterday.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Yesterday</Text>
          {yesterday.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              themeColor={themeColor}
            />
          ))}
        </>
      )}

      {earlier.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Earlier</Text>
          {earlier.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              themeColor={themeColor}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
    fontSize: 16,
    color: "#1A1A1A",
  },
});
