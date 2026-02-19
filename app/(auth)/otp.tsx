import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
// import { router } from "@/.expo/types/router";
import { RELIGIONS } from "@/constants/religions";
import { useReligion } from "@/contexts/ReligionContext";

/* ---------- Navigation Types ---------- */
type RootStackParamList = {
  CreateAccountScreen: undefined;
  OtpScreen: undefined;
};

// type NavProp = StackNavigationProp<RootStackParamList, "OtpScreen">;

/* ---------- Component ---------- */
export default function OtpScreen() {
  // const navigation = useNavigation<NavProp>();

  const { religion } = useReligion();
  const themeColor = RELIGIONS[religion!].color;

  const phoneNumber = "+91 98765 43210";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const [resendUsed, setResendUsed] = useState(false);
  const [timer, setTimer] = useState(30);

  /* ---------- Countdown Timer ---------- */
  useEffect(() => {
    if (!resendUsed || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendUsed, timer]);

  /* ---------- OTP Input ---------- */
  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* ---------- Verify ---------- */
  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      console.log("OTP incomplete");
      return;
    }
    router.replace("/(provider-onboarding)/personaldetails"); // replace is smoother after OTP
  };

  /* ---------- Resend ---------- */
  const handleResend = () => {
    if (resendUsed) return;

    setResendUsed(true);
    setTimer(30);
    // 🔁 Call resend OTP API here
  };

  /* ---------- Change Number ---------- */
  const handleChangeNumber = () => {
    router.replace("/(auth)/createaccount");
  };

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <Text style={styles.headerIcon}>🛡️</Text>
        <Text style={styles.headerTitle}>Verify Your Identity</Text>
        <Text style={styles.headerSub}>
          {" "}
          Enter the verification code sent to your device{" "}
        </Text>
      </View>

      {/* ---------- OTP Card ---------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Enter Verification Code</Text>
        <Text style={styles.cardSub}>
          We’ve sent a 6-digit code to your number
        </Text>
        <Text style={styles.headerSub}>
          OTP sent to <Text style={{ fontWeight: "600" }}>{phoneNumber}</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref!)}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(v) => handleOtpChange(v, i)}
              style={[styles.otpInput, { borderColor: themeColor }]}
            />
          ))}
        </View>

        {/* Resend */}
        {!resendUsed ? (
          <Text style={styles.resend}>
            Didn’t receive the code?{" "}
            <Text style={{ color: themeColor }} onPress={handleResend}>
              🔄 Resend
            </Text>
          </Text>
        ) : (
          <Text style={styles.resend}>Resend available in {timer}s</Text>
        )}

        <View style={styles.infoBoxSafe}>
          <Text style={styles.infoTitle}>
            <Icon
              style={styles.icon}
              name="information-circle-outline"
              size={16}
              color="#4A90E2"
            />
            Verification Tips
          </Text>
          <Text style={styles.infoText}>Check your SMS inbox for the code</Text>
          <Text style={styles.infoText}>Code expires in 10 minutes</Text>
          <Text style={styles.infoText}>Contact support if issues persist</Text>
        </View>
        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColor }]}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>Verify Code ✓</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoBoxSafe}>
          <Text style={styles.infoTitle}>
            <Icon
              style={styles.icon}
              name="shield-checkmark-outline"
              size={16}
              color="#2196F3"
            />
            Secure Verification
          </Text>
          <Text style={styles.infoText}>
            your secuirity is our priority. This verification process ensures
            your account and services remain protected.
          </Text>
        </View>

        {/* Change Number */}
        <TouchableOpacity onPress={handleChangeNumber}>
          {/* <Icon name="pencil-outline" size={16} color="#555" /> */}
          <Text style={styles.footerText}>Change Phone Number</Text>
        </TouchableOpacity>

        <View style={styles.smallInfoRow}>
          <Icon name="checkmark-circle-outline" size={14} color="#4CAF50" />
          <Text style={styles.smallInfoText}>Verified identity</Text>

          <Text style={styles.dot}>•</Text>

          <Icon name="shield-checkmark-outline" size={14} color="#2196F3" />
          <Text style={styles.smallInfoText}>Secure platform</Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  icon: {
    margin: 0,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerIcon: { fontSize: 32, marginBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  headerSub: { fontSize: 14, color: "#E5E7EB", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  cardSub: { fontSize: 13, color: "#6B7280", marginBottom: 16 },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  otpInput: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },

  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  infoBoxSafe: {
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  infoTitle: { fontSize: 14, fontWeight: "600", marginRight: 20 },
  infoText: { fontSize: 12, color: "#374151", marginTop: 4, paddingLeft: 20 },

  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
  },

  resend: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  smallInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -2,
    right: -20,
  },

  smallInfoText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 4,
    padding: 5,
  },

  dot: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 6,
  },
});
