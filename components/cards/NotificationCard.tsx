import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotificationCardProps {
  type: "Bookings" | "Payments" | "Reviews" | "System";
  title: string;
  message: string;
  time: string;
  themeColor: string;
  showActions?: boolean;
  notificationId?: string;
  customerName?: string;
  serviceType?: string;
  amount?: string;
  rating?: number;
  paymentMethod?: string;
  transactionId?: string;
  date?: string;
}

export default function NotificationCard({
  type,
  title,
  message,
  time,
  themeColor,
  showActions = false,
  notificationId = "1",
  customerName = "Sarah Ahmed",
  serviceType = "Nikah Ceremony",
  amount = "₹150.00",
  rating = 5,
  paymentMethod = "Credit Card",
  transactionId = "TXN123456789",
  date = "March 18, 2024",
}: NotificationCardProps) {
  const router = useRouter();

  const getIconDetails = () => {
    switch (type) {
      case "Bookings":
        return {
          name: "calendar" as const,
          bgColor: "#E8FDF5",
          iconColor: "#0E9F6E",
        };
      case "Payments":
        return {
          name: "cash" as const,
          bgColor: "#EBF5FF",
          iconColor: "#3B82F6",
        };
      case "Reviews":
        return {
          name: "star" as const,
          bgColor: "#FFF8E1",
          iconColor: "#F59E0B",
        };
      case "System":
        return {
          name: "information-circle" as const,
          bgColor: "#F3E8FF",
          iconColor: "#8B5CF6",
        };
    }
  };

  const handleAccept = () => {
    Alert.alert(
      "Accept Booking",
      `Are you sure you want to accept this booking request from ${customerName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: () => {
            Alert.alert("Success", "Booking request accepted successfully!");
            router.push({
              pathname: "/booking/NotificationDetails",
              params: {
                themeColor,
                notificationId,
                customerName,
                serviceType,
                amount,
                status: "accepted",
              },
            });
          },
        },
      ],
    );
  };

  const handleDecline = () => {
    Alert.alert(
      "Decline Booking",
      `Are you sure you want to decline this booking request from ${customerName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          onPress: () => {
            Alert.alert("Declined", "Booking request has been declined.");
          },
          style: "destructive",
        },
      ],
    );
  };

  const handleViewDetails = () => {
    switch (type) {
      case "Bookings":
        router.push({
          pathname: "/booking/NotificationDetails",
          params: {
            themeColor,
            notificationId,
            customerName,
            serviceType,
            amount,
          },
        });
        break;
      case "Payments":
        router.push({
          pathname: "/booking/PaymentDetails",
          params: {
            themeColor,
            amount,
            customerName,
            notificationId,
            paymentMethod,
            transactionId,
            date,
            serviceType,
          },
        });
        break;
      case "Reviews":
        router.push({
          pathname: "/booking/ReviewsScreen",
          params: {
            themeColor,
            customerName,
            rating,
            notificationId,
            serviceType,
            date,
          },
        });
        break;
      case "System":
        Alert.alert(title, message, [{ text: "OK" }]);
        break;
    }
  };

  const icon = getIconDetails();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleViewDetails}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: icon.bgColor }]}>
        <Ionicons name={icon.name} size={22} color={icon.iconColor} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={[styles.dot, { backgroundColor: themeColor }]} />
        </View>

        <Text style={styles.cardMsg} numberOfLines={2}>
          {message}
        </Text>

        <Text style={styles.cardTime}>{time}</Text>

        {showActions && type === "Bookings" && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.btnD} onPress={handleDecline}>
              <Text style={styles.btnTextD}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnA, { backgroundColor: themeColor }]}
              onPress={handleAccept}
            >
              <Text style={styles.btnTextA}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}

        {type === "Payments" && (
          <TouchableOpacity
            style={[styles.viewBtn, { borderColor: themeColor }]}
            onPress={handleViewDetails}
          >
            <Text style={[styles.viewBtnText, { color: themeColor }]}>
              View Payment Details
            </Text>
          </TouchableOpacity>
        )}

        {type === "Reviews" && (
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= rating ? "star" : "star-outline"}
                size={16}
                color={star <= rating ? "#F59E0B" : "#D1D5DB"}
              />
            ))}
            <TouchableOpacity onPress={handleViewDetails}>
              <Text style={[styles.viewLink, { color: themeColor }]}>
                View Review
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1A1A1A",
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardMsg: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
  },
  cardTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  btnA: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnD: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
  btnTextA: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  btnTextD: {
    color: "#374151",
    fontWeight: "bold",
    fontSize: 14,
  },
  viewBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 4,
  },
  viewLink: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "600",
  },
});
