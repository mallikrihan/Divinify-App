import { RELIGIONS } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { useUser } from "@/contexts/Usercontext";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
export default function LoginScreen() {
  const { religion } = useReligion();
  const themeColor = religion ? RELIGIONS[religion].color : "#0A8F6A";
  const snapPoints = useMemo(() => ["75%", "85%"], []);
  const router = useRouter();
  const { setUser } = useUser();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
    setUser({ email, password });
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
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 30 }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          <View>
            <Text style={styles.welcome}>Welcome Back</Text>
            <Text style={styles.subText}>Sign in to manage your services</Text>
          </View>

          <TextInput
            placeholder="Email address"
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
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Ionicons name="square-outline" size={22} color="#9CA3AF" />
              <Text style={{ marginLeft: 8, color: "#374151" }}>
                Remember Me
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => router.push("/booking/Account/PasswordScreen")}
            >
              <Text style={[styles.forgotText, { color: themeColor }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

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
              <Text style={styles.socialLink}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="logo-apple" size={22} color="#000" />
              <Text style={styles.socialLink}>Apple</Text>
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
              style={{ color: themeColor, fontWeight: "700" }}
              onPress={() => router.push("/(auth)/createaccount")}
            >
              Sign Up
            </Text>
          </Text>

          <View style={styles.trustFooter}>
            <Text style={styles.trustText}>
              Trusted by religious communities worldwide
            </Text>
            <View style={styles.trustRow}>
              <View style={styles.trustItem}>
                <Icon name="checkmark-circle" size={14} color={themeColor} />
                <Text style={styles.trustLabel}>Verified Scholars</Text>
              </View>
              <View style={styles.trustItem}>
                <Icon name="lock-closed" size={14} color={themeColor} />
                <Text style={styles.trustLabel}>Secure Platform</Text>
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },
  header: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: { fontSize: 28 },
  portalTitle: { fontSize: 24, fontWeight: "700", color: "#fff" },
  portalSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  sheetContent: { padding: 24 },
  welcome: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#1A1A1A",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  forgotText: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 25,
    top: -35,
  },
  signInBtn: {
    height: 55,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  signInText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  orText: { textAlign: "center", color: "#999", marginBottom: 20 },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#EEE",
    width: "48%",
    height: 50,
    borderRadius: 12,
  },
  socialLink: { fontWeight: "600" },
  footerText: { textAlign: "center", color: "#666", fontSize: 15 },
  trustFooter: { marginTop: 20, alignItems: "center" },
  trustText: { fontSize: 12, color: "#999", marginBottom: 8 },
  trustRow: { flexDirection: "row", justifyContent: "center" },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  trustLabel: { fontSize: 12, color: "#999", marginLeft: 4 },
  verifyBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  verifyTitle: { fontSize: 14, fontWeight: "600" },
  verifyText: { fontSize: 13, color: "#555" },
});
