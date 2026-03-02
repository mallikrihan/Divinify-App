import { useReligion } from "@/contexts/ReligionContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ServiceProgressScreen() {
  const router = useRouter();
  const { religion } = useReligion();
  const params = useLocalSearchParams();
  const theme = getTheme(religion);

  const [serviceStarted, setServiceStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState("5:30 PM");
  const [estimatedEndTime, setEstimatedEndTime] = useState("6:30 PM");
  const [currentSurah, setCurrentSurah] = useState("Surah Yaseen");
  const [serviceNotes, setServiceNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (serviceStarted && !isPaused && isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [serviceStarted, isPaused, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCall = () => {
    Linking.openURL(`tel:${params.phone || "+12345678900"}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${params.phone || "+12345678900"}`);
  };

  const handleStartService = () => {
    Alert.alert("Start Service", "Are you ready to start this service?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start",
        onPress: () => {
          setServiceStarted(true);
          setIsTimerRunning(true);
        },
      },
    ]);
  };

  const handlePauseService = () => {
    if (!isPaused) {
      Alert.alert(
        "Pause Service",
        "Do you want to pause the service? Timer will stop.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Pause",
            onPress: () => {
              setIsPaused(true);
              setIsTimerRunning(false);
            },
          },
        ],
      );
    } else {
      Alert.alert("Resume Service", "Do you want to resume the service?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resume",
          onPress: () => {
            setIsPaused(false);
            setIsTimerRunning(true);
          },
        },
      ]);
    }
  };

  const handleReportIssue = () => {
    Alert.alert("Report Issue", "Please describe the issue", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Submit",
        onPress: () => {
          Alert.alert(
            "Reported",
            "Issue reported successfully to support team",
          );
        },
      },
    ]);
  };

  const handleCompleteService = () => {
    Alert.alert(
      "Complete Service",
      "Are you sure you want to mark this service as complete?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: () => {
            Alert.alert(
              "Success",
              "Service completed successfully! Redirecting to home...",
              [
                {
                  text: "OK",
                  onPress: () => router.push("/(provider-tabs)/bookings"),
                },
              ],
            );
          },
        },
      ],
    );
  };

  const handleCancelService = () => {
    Alert.alert(
      "Cancel Service",
      "Are you sure you want to cancel this service?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const handleGetDirections = () => {
    const address = params.address || "123 Maple Street, Springfield";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={[styles.header, { borderBottomColor: theme.primary + "20" }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Service Progress</Text>
          <Text style={styles.headerSubtitle}>
            {serviceStarted
              ? isPaused
                ? "⏸️ Paused"
                : "▶️ Active"
              : "⏳ Ready to Start"}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: serviceStarted
                ? isPaused
                  ? "#F59E0B20"
                  : "#22C55E20"
                : "#3B82F620",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: serviceStarted
                  ? isPaused
                    ? "#F59E0B"
                    : "#22C55E"
                  : "#3B82F6",
              },
            ]}
          >
            {serviceStarted ? (isPaused ? "Paused" : "Active") : "Ready"}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Client Info Card */}
        <View style={styles.card}>
          <View style={styles.clientHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=2" }}
              style={styles.clientImage}
            />
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>
                {params.clientName || "Fatima Hassan"}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>4.8 Rating · 12 Bookings</Text>
              </View>
            </View>
          </View>

          {/* Contact Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={handleCall}
            >
              <Ionicons name="call-outline" size={18} color="#3B82F6" />
              <Text style={styles.callBtnText}>Call Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.messageBtn]}
              onPress={handleMessage}
            >
              <Ionicons name="chatbubble-outline" size={18} color="#10B981" />
              <Text style={styles.messageBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Card */}
        <View style={styles.card}>
          <View style={styles.locationHeader}>
            <View style={styles.locationTitleRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color={theme.primary}
              />
              <Text style={styles.locationTitle}>Service Location</Text>
            </View>
            <Text style={styles.distanceText}>
              {params.distance || "1.2 km away"}
            </Text>
          </View>

          <Text style={styles.address}>
            {params.address ||
              "123 Maple Street, Apt 4B, Springfield, IL 62701"}
          </Text>

          <TouchableOpacity
            style={styles.directionBtn}
            onPress={handleGetDirections}
          >
            <Text style={[styles.directionBtnText, { color: theme.primary }]}>
              Get Directions →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>1 hour</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Fee</Text>
            <Text style={[styles.feeValue, { color: theme.primary }]}>
              {params.fee || "$50.00"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Special Instructions</Text>
            <Text style={styles.instructions}>
              Please bring your own Quran. We prefer recitation of Surah Yaseen
              and Surah Rahman. Family will be present during the session.
            </Text>
          </View>
        </View>

        {/* Service Progress - Shows only after start */}
        {serviceStarted && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service Progress</Text>

            {/* Timer Display */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Service Duration</Text>
              <Text style={[styles.timerValue, { color: theme.primary }]}>
                {formatTime(timerSeconds)}
              </Text>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="play-circle" size={20} color="#22C55E" />
                <Text style={styles.progressTitle}>Service Started</Text>
              </View>
              <Text style={styles.progressTime}>{currentTime}</Text>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="book" size={20} color={theme.primary} />
                <Text style={styles.progressTitle}>Recitation in Progress</Text>
              </View>
              <Text style={styles.progressSubText}>
                Current: {currentSurah}
              </Text>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Ionicons name="checkmark-circle" size={20} color="#9CA3AF" />
                <Text style={styles.progressTitle}>Service Completion</Text>
              </View>
              <Text style={styles.progressTime}>
                Estimated: {estimatedEndTime}
              </Text>
            </View>

            {/* Pause/Resume Status Indicator */}
            {isPaused && (
              <View style={styles.pausedIndicator}>
                <Ionicons name="pause-circle" size={20} color="#F59E0B" />
                <Text style={styles.pausedText}>Service Paused</Text>
              </View>
            )}
          </View>
        )}

        {/* Quick Actions - Shows only after start */}
        {serviceStarted && (
          <>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.quickActionBtn, isPaused && styles.resumeBtn]}
                onPress={handlePauseService}
              >
                <Ionicons
                  name={isPaused ? "play" : "pause"}
                  size={22}
                  color={isPaused ? "#10B981" : "#F59E0B"}
                />
                <Text
                  style={[
                    styles.quickActionText,
                    { color: isPaused ? "#10B981" : "#F59E0B" },
                  ]}
                >
                  {isPaused ? "Resume Service" : "Pause Service"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickActionBtn}
                onPress={handleReportIssue}
              >
                <Ionicons name="alert-circle" size={22} color="#EF4444" />
                <Text style={[styles.quickActionText, { color: "#EF4444" }]}>
                  Report Issue
                </Text>
              </TouchableOpacity>
            </View>

            {/* Service Notes */}
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.notesHeader}
                onPress={() => setShowNotes(!showNotes)}
              >
                <Text style={styles.cardTitle}>Service Notes</Text>
                <Ionicons
                  name={showNotes ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {showNotes && (
                <>
                  <Text style={styles.noteContent}>
                    Family is present and engaged.{"\n"}
                    Reciting {currentSurah} as requested.
                  </Text>
                  <TextInput
                    style={styles.notesInput}
                    placeholder="Add additional notes..."
                    value={serviceNotes}
                    onChangeText={setServiceNotes}
                    multiline
                    numberOfLines={3}
                  />
                </>
              )}
            </View>

            {/* Complete Service Button */}
            <TouchableOpacity
              style={[styles.completeBtn, { backgroundColor: theme.primary }]}
              onPress={handleCompleteService}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              <Text style={styles.completeBtnText}>Complete Service</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Cancel Service Button - Shows only before start */}
        {!serviceStarted && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancelService}
          >
            <Text style={styles.cancelBtnText}>Cancel Service</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Start Service Button - Shows only before start */}
      {!serviceStarted && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: theme.primary }]}
            onPress={handleStartService}
          >
            <Ionicons name="play" size={24} color="#FFF" />
            <Text style={styles.startBtnText}>Start Service</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function getTheme(r?: string) {
  const rel = r?.toLowerCase();
  if (rel === "islam") return { primary: "#0E9F6E", label: "Islamic Scholar" };
  if (rel === "hinduism") return { primary: "#F59E0B", label: "Hindu Scholar" };
  if (rel === "christianity")
    return { primary: "#3B82F6", label: "Christian Scholar" };
  return { primary: "#6366F1", label: "Scholar" };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  clientHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  clientInfo: {
    flex: 1,
    marginLeft: 15,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  callBtn: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F610",
  },
  callBtnText: {
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 8,
  },
  messageBtn: {
    borderColor: "#10B981",
    backgroundColor: "#10B98110",
  },
  messageBtnText: {
    color: "#10B981",
    fontWeight: "600",
    marginLeft: 8,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  address: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  directionBtn: {
    alignSelf: "flex-start",
  },
  directionBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 15,
  },
  detailRow: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  feeValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  instructions: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },
  timerContainer: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 5,
  },
  timerValue: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  progressItem: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  progressTime: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 28,
  },
  progressSubText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginLeft: 28,
    marginTop: 2,
  },
  pausedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F59E0B20",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  pausedText: {
    marginLeft: 8,
    color: "#F59E0B",
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 15,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 2,
    gap: 8,
  },
  resumeBtn: {
    backgroundColor: "#10B98120",
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteContent: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 15,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  completeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    elevation: 3,
  },
  completeBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelBtn: {
    alignItems: "center",
    margin: 20,
    marginTop: 0,
    marginBottom: 30,
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  startBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
