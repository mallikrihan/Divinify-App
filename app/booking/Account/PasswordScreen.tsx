import { RELIGIONS } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ForgotPassword() {
  const router = useRouter();
  const { religion } = useReligion();
  const themeColor = religion ? RELIGIONS[religion].color : "#0A8F6A";

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const renderRequirements = (label: string) => (
    <View style={styles.reqRow}>
      <Icon name="circle" size={6} color="#CBD5E1" />
      <Text style={styles.reqText}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={() => (step > 1 ? setStep(step - 1) : router.back())}
          style={styles.backBtn}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.illustrationContainer}>
          <Icon
            name={step === 3 ? "shield-check-outline" : "lock-outline"}
            size={80}
            color="rgba(255,255,255,0.3)"
          />
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {step === 1 && (
            <View>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.description}>
                We will help you regain access peacefully. Enter your email
                address and we will send you a reset code.
              </Text>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon name="email-outline" size={20} color="#999" />
                <TextInput
                  placeholder="Enter your registered email"
                  style={styles.flexInput}
                />
              </View>
              <TouchableOpacity
                style={[styles.mainBtn, { backgroundColor: themeColor }]}
                onPress={() => setStep(2)}
              >
                <Text style={styles.btnText}>Send Reset Code</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.title}>Verify Your Identity</Text>
              <Text style={styles.description}>
                We are sent a verification code to{"\n"}
                <Text style={{ color: themeColor, fontWeight: "700" }}>
                  user@example.com
                </Text>
              </Text>
              <Text style={styles.inputLabelCenter}>
                Enter Verification Code
              </Text>
              <View style={styles.otpContainer}>
                {otp.map((_, i) => (
                  <TextInput
                    key={i}
                    style={styles.otpBox}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>
              <Text style={styles.timer}>
                <Icon name="clock-outline" /> Code expires in{" "}
                <Text style={{ color: themeColor }}>02:00</Text>
              </Text>
              <TouchableOpacity
                style={[styles.mainBtn, { backgroundColor: themeColor }]}
                onPress={() => setStep(3)}
              >
                <Text style={styles.btnText}>Verify Code</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.title}>Create New Password</Text>
              <Text style={styles.description}>
                Choose a strong password to keep your account safe and secure
              </Text>
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                placeholder="Enter new password"
                secureTextEntry
                style={styles.fullInput}
              />
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry
                style={styles.fullInput}
              />

              <View style={styles.reqBox}>
                <Text style={styles.reqTitle}>
                  <Icon name="shield-check" color={themeColor} /> Password
                  Requirements
                </Text>
                {renderRequirements("At least 8 characters long")}
                {renderRequirements("One uppercase letter")}
                {renderRequirements("One lowercase letter")}
                {renderRequirements("One number")}
              </View>

              <TouchableOpacity
                style={[styles.mainBtn, { backgroundColor: themeColor }]}
                onPress={() =>
                  Alert.alert("Success", "Password updated!", [
                    {
                      text: "OK",
                      onPress: () => router.push("/(auth)/createaccount"),
                    },
                  ])
                }
              >
                <Text style={styles.btnText}>Save New Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { height: "30%", padding: 25, justifyContent: "center" },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  illustrationContainer: { alignSelf: "center" },
  bottomSheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  inputLabelCenter: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 25,
  },
  flexInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  fullInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  mainBtn: {
    height: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  timer: { textAlign: "center", color: "#666", marginBottom: 25 },
  reqBox: {
    backgroundColor: "#F0F9FF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  reqTitle: { fontWeight: "700", marginBottom: 10, color: "#0369A1" },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 10,
  },
  reqText: { fontSize: 13, color: "#64748B" },
});
