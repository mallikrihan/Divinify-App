// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import NotificationCard from "../../components/cards/NotificationCard";

// interface PaymentsTabProps {
//   themeColor: string;
// }

// export default function PaymentsTab({ themeColor }: PaymentsTabProps) {
//   return (
//     <View>
//       <Text style={styles.sectionLabel}>Today</Text>
//       <NotificationCard
//         type="Payments"
//         title="Payment Received"
//         message="₹150 payment received for Nikah ceremony service from Ahmed Hassan"
//         time="2 hours ago"
//         themeColor={themeColor}
//       />

//       <Text style={styles.sectionLabel}>Yesterday</Text>
//       <NotificationCard
//         type="Payments"
//         title="Payment Received"
//         message="$200 payment received for Quran Khani service from Fatima Begum"
//         time="Yesterday, 2:15 PM"
//         themeColor={themeColor}
//       />

//       <Text style={styles.sectionLabel}>March 15, 2024</Text>
//       <NotificationCard
//         type="Payments"
//         title="Payout Processed"
//         message="Your earnings of $450 have been transferred to your bank account"
//         time="3 days ago"
//         themeColor={themeColor}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionLabel: {
//     fontWeight: "bold",
//     marginBottom: 10,
//     marginTop: 5,
//     fontSize: 16,
//     color: "#1A1A1A",
//   },
// });
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NotificationCard from "../../components/cards/NotificationCard";

interface PaymentsTabProps {
  themeColor: string;
}

export default function PaymentsTab({ themeColor }: PaymentsTabProps) {
  const paymentNotifications = [
    {
      id: "p1",
      type: "Payments" as const,
      title: "Payment Received",
      message:
        "₹150 payment received for Nikah ceremony service from Ahmed Hassan",
      time: "2 hours ago",
      customerName: "Ahmed Hassan",
      amount: "₹150.00",
      paymentMethod: "Credit Card",
      transactionId: "TXN123456789",
      date: "March 18, 2024",
      serviceType: "Nikah Ceremony",
    },
    {
      id: "p2",
      type: "Payments" as const,
      title: "Payment Received",
      message:
        "$200 payment received for Quran Khani service from Fatima Begum",
      time: "Yesterday, 2:15 PM",
      customerName: "Fatima Begum",
      amount: "$200.00",
      paymentMethod: "PayPal",
      transactionId: "TXN987654321",
      date: "March 17, 2024",
      serviceType: "Quran Khani",
    },
    {
      id: "p3",
      type: "Payments" as const,
      title: "Payout Processed",
      message:
        "Your earnings of $450 have been transferred to your bank account",
      time: "3 days ago",
      customerName: "System",
      amount: "$450.00",
      paymentMethod: "Bank Transfer",
      transactionId: "POUT123456",
      date: "March 15, 2024",
      serviceType: "Weekly Payout",
    },
  ];

  // Group by date
  const today = paymentNotifications.filter((n) => n.time.includes("hours"));
  const yesterday = paymentNotifications.filter((n) =>
    n.time.includes("Yesterday"),
  );
  const earlier = paymentNotifications.filter((n) => n.time.includes("days"));

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
