import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { RELIGIONS } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { useUser } from "@/contexts/Usercontext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { religion } = useReligion();
  const themeColor = religion ? RELIGIONS[religion].color : "#0A8F6A";

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "85%"], []);

  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setUser({
      email,
      password,
    });

    router.push("/(provider-onboarding)/personaldetails");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🎓</Text>
        </View>
        <Text style={styles.portalTitle}>Scholar Portal</Text>
        <Text style={styles.portalSubtitle}>Access your scholar dashboard</Text>
      </View>

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "#fff" }}
        handleIndicatorStyle={{ backgroundColor: "#D1D5DB" }}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.subText}>Sign in to manage your services</Text>

          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[styles.signInBtn, { backgroundColor: themeColor }]}
            onPress={handleContinue}
          >
            <Text style={styles.signInText}>Continue →</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="logo-apple" size={22} color="#000" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.verifyBox}>
            <Text style={styles.verifyTitle}>
              Scholar Verification Required
            </Text>
            <Text style={styles.verifyText}>
              Your account must be verified before accessing scholar features.
              This ensures community trust and service quality.
            </Text>
          </View>

          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text
              style={{ color: themeColor, fontWeight: "600" }}
              onPress={() => router.push("/(auth)/createaccount")}
            >
              Sign Up
            </Text>
          </Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    top: -100,
  },
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: { fontSize: 28 },
  portalTitle: { fontSize: 24, fontWeight: "700", color: "#fff" },
  portalSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.85)" },
  sheetContent: { padding: 24, paddingBottom: 40 },
  welcome: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  signInBtn: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  orText: {
    textAlign: "center",
    fontSize: 13,
    color: "#999",
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    width: "48%",
    borderRadius: 10,
    marginBottom: 10,
  },
  socialText: { fontSize: 16, fontWeight: "600" },
  verifyBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  verifyTitle: { fontSize: 14, fontWeight: "600" },
  verifyText: { fontSize: 13, color: "#555" },
  footerText: { textAlign: "center", fontSize: 14, color: "#666" },
});
