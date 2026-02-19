import { useReligion } from "@/contexts/ReligionContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TabsLayout() {
  const { religion } = useReligion();

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerTitle: "Faithful Services",
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
           headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerTitle: "My Bookings",// Example badge count
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
           headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
          headerTitle: "Messages",
        // Example badge count
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
           headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerTitle: "My Profile",
        }}
      />
    </Tabs>
  );
}