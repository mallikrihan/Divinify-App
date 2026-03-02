import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NotificationCard from "../../components/cards/NotificationCard";

interface SystemTabProps {
  themeColor: string;
}

export default function SystemTab({ themeColor }: SystemTabProps) {
  return (
    <View>
      <Text style={styles.sectionLabel}>Yesterday</Text>
      <NotificationCard
        type="System"
        title="Profile Update"
        message="Your scholar profile has been successfully updated with new services"
        time="Yesterday, 11:15 AM"
        themeColor={themeColor}
      />

      <Text style={styles.sectionLabel}>Earlier</Text>
      <NotificationCard
        type="System"
        title="Welcome to Faithful Services"
        message="Your scholar account has been approved. Start receiving bookings now!"
        time="3 days ago"
        themeColor={themeColor}
      />
      <NotificationCard
        type="System"
        title="Verification Complete"
        message="Your religious certification and identity verification has been completed"
        time="5 days ago"
        themeColor={themeColor}
      />
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
