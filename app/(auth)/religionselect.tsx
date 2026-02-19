import { RELIGIONS, ReligionType } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReligionSelectScreen() {
  const router = useRouter();
  const { setReligion } = useReligion();
  const [selected, setSelected] = useState<ReligionType | null>(null);

  return (
    <View style={styles.container}>
      {/* 2. Wrap content in ScrollView to allow movement */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <FontAwesome5 name="hands" size={30} color="white" />
          </View>
        </View>

        <Text style={styles.title}>Choose Your Faith</Text>
        <Text style={styles.subtitle}>
          Select your religion to personalize your spiritual journey with us
        </Text>

        <View style={styles.cards}>
          {Object.values(RELIGIONS).map((item) => {
            const isActive = selected === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={[
                  styles.card,
                  isActive && {
                    borderColor: item.color,
                    // backgroundColor: item.color + "08",
                  },
                ]}
                onPress={() => {
                  setSelected(item.id);
                  setReligion(item.id);
                }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color + "20" },
                  ]}
                >
                  {/* Dynamically render icons based on religion id */}
                  {item.id === "islam" && (
                    <FontAwesome5 name="moon" size={20} color="#059669" />
                  )}
                  {item.id === "hindu" && (
                    <MaterialCommunityIcons
                      name="om"
                      size={24}
                      color="#ea580c"
                    />
                  )}
                  {item.id === "christianity" && (
                    <FontAwesome5 name="cross" size={20} color="#2563eb" />
                  )}
                </View>

                <View style={styles.cardTextContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isActive ? item.color : "#D1D5DB"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Privacy Section */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyIconContainer}>
            <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
          </View>
          <View style={styles.privacyTextContent}>
            <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
            <Text style={styles.privacyText}>
              Your religious preference helps us personalize your experience.
              This information is kept private and secure, and is only used to
              show relevant services and content.
            </Text>
          </View>
        </View>
        {/* 3. Place Footer inside ScrollView or right below it */}
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={!selected}
            style={[
              styles.continueBtn,
              { backgroundColor: selected ? "#7C7E8C" : "#9CA3AF" },
            ]}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.bottomNote}>
            Religion selection is permanent and cannot be edited after
            registration.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logoBackground: {
    width: 70,
    height: 70,
    backgroundColor: "#374151",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  cards: {
    gap: 16,
    width: 280,
    right: 9,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 2,
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  privacyCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    width: 350,
    right: 45,
  },
  privacyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    left: 10,
  },
  privacyTextContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  privacyText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 20,
  },
  continueBtn: {
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  bottomNote: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40, // Extra padding so the bottom note isn't cut off
    flexGrow: 1, // Crucial: allows content to fill space and scroll
  },
});
