import { useReligion } from "@/contexts/ReligionContext";
import { RootState } from "@/store";
import { resetOnboarding } from "@/store/onboardingSlice";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function ReviewSubmit() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { religion } = useReligion();
  const params = useLocalSearchParams<{
    fromEdit?: string;
    updated?: string;
  }>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formData = useSelector((state: RootState) => state.onboarding);
  const [agreed, setAgreed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (params.fromEdit === "true" || params.updated === "true") {
        setIsRefreshing(true);
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

        refreshTimeoutRef.current = setTimeout(() => {
          setIsRefreshing(false);
          setLastUpdate(Date.now());
          router.setParams({ fromEdit: undefined, updated: undefined });
        }, 500);
      }
      return () => {
        if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
      };
    }, [params.fromEdit, params.updated]),
  );

  const getTheme = () => {
    const selected = religion?.toLowerCase().trim();
    if (selected === "islam" || selected === "muslim") {
      return {
        primary: "#0E9F6E",
        secondary: "#E8F5E9",
        label: "Islam",
        icon: "moon" as const,
      };
    }
    if (selected === "hindu" || selected === "hinduism") {
      return {
        primary: "#F59E0B",
        secondary: "#FFF3E0",
        label: "Hinduism",
        icon: "sunny" as const,
      };
    }
    return {
      primary: "#3B82F6",
      secondary: "#E3F2FD",
      label: religion || "Other",
      icon: "person" as const,
    };
  };

  const theme = getTheme();

  const handleEdit = (path: any) => {
    router.push({
      pathname: path,
      params: { fromReview: "true", returnTo: "review" },
    });
  };

  const handleSubmit = () => {
    if (!agreed) {
      Alert.alert(
        "Agreement Required",
        "Please agree to the terms to proceed.",
      );
      return;
    }
    dispatch(resetOnboarding());
    router.push("/(provider-onboarding)/applicationreview");
  };

  if (isRefreshing) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.primary + "10" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.primary }]}>
          Updating your information...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      key={lastUpdate}
    >
      <View style={[styles.headerVisual, { backgroundColor: theme.primary }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Review & Submit</Text>
          <Text style={styles.headerSubtext}>
            Please verify all information before submission
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Personal Details */}
        <Section
          title="Personal Details"
          icon="person-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/personaldetails")}
        >
          <DetailRow label="Full Name" value={formData.personalDetails?.name} />
          <DetailRow
            label="Phone Number"
            value={formData.personalDetails?.phone}
          />
          <DetailRow label="Email" value={formData.personalDetails?.email} />
          <DetailRow
            label="Religion"
            value={theme.label}
            isTag
            theme={theme}
            tagIcon={theme.icon}
          />
        </Section>

        {/* Religious Affiliation */}
        <Section
          title="Religious Affiliation"
          icon="ribbon-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/religiousaffiliation")
          }
        >
          <DetailRow
            label="Scholar Type"
            value={formData.religiousDetails?.scholarType}
          />
          <DetailRow
            label="yearsOfExperience"
            value={formData.religiousDetails?.yearsOfExperience}
            isMultiline
          />
          <DetailRow
            label="languages"
            value={formData.religiousDetails?.languages}
            isMultiline
          />
          <DetailRow
            label="Specialization"
            value={formData.religiousDetails?.specialization}
          />
        </Section>

        {/* Verification */}
        <Section
          title="Verification"
          icon="shield-checkmark-outline"
          theme={theme}
          onEdit={() =>
            handleEdit("/(provider-onboarding)/identityverification")
          }
        >
          <DetailRow
            label="Government ID"
            value={formData.verification?.idType || "Aadhaar Card"}
            isVerified
          />
          <DetailRow label="Selfie Verification" value="Completed" isVerified />
          <DetailRow
            label="Religious Certificate"
            value="Uploaded"
            isVerified
          />
        </Section>

        {/* Services */}
        {/* <Section
          title="Services Offered"
          icon="apps-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/serviceoffer")}
        >
          {formData.services &&
          Array.isArray(formData.services) &&
          formData.services.length > 0 ? (
            formData.services.map((service, index) => (
              <View key={index}>
                <View style={styles.serviceHeader}>
                  <Text style={[styles.serviceName, { color: theme.primary }]}>
                    {service.name}
                  </Text>
                </View>
                <View style={styles.serviceDetailsGrid}>
                  <View style={styles.serviceDetail}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{service.duration}</Text>
                  </View>
                  <View style={styles.serviceDetail}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={styles.detailValue}>₹{service.price}</Text>
                  </View>
                </View>
                {index < (formData.services as any[]).length - 1 && (
                  <View style={styles.serviceDivider} />
                )}
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.noDataText}>No services selected</Text>
            </View>
          )}
        </Section> */}
        {/* Services */}
        <Section
          title="Services Offered"
          icon="apps-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/serviceoffer")}
        >
          {/* CHANGE: Check formData.services.services instead of just formData.services */}
          {formData.services?.services &&
          Array.isArray(formData.services.services) &&
          formData.services.services.length > 0 ? (
            formData.services.services.map((service: any, index: number) => (
              <View key={index}>
                <View style={styles.serviceHeader}>
                  <Text style={[styles.serviceName, { color: theme.primary }]}>
                    {service.name}
                  </Text>
                </View>
                <View style={styles.serviceDetailsGrid}>
                  <View style={styles.serviceDetail}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{service.duration}</Text>
                  </View>
                  <View style={styles.serviceDetail}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={styles.detailValue}>₹{service.price}</Text>
                  </View>
                </View>
                {index < (formData.services.services as any[]).length - 1 && (
                  <View style={styles.serviceDivider} />
                )}
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.noDataText}>No services selected</Text>
            </View>
          )}
        </Section>
        {/* Availability */}
        <Section
          title="Availability"
          icon="time-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/availabilitysetup")}
        >
          <DetailRow label="Working Days" value="Mon - Sat" />
          <DetailRow label="Working Hours" value="9:00 AM - 7:00 PM" />
          <DetailRow
            label="Service Radius"
            value={`${formData.availability?.serviceRadius || 15} km`}
          />
        </Section>

        {/* Payment Details */}
        <Section
          title="Payment Details"
          icon="card-outline"
          theme={theme}
          onEdit={() => handleEdit("/(provider-onboarding)/paymentsetup")}
        >
          <DetailRow
            label="Bank Name"
            value={formData.payment?.bankName || "State Bank of India"}
          />
          <DetailRow
            label="Account Number"
            value={
              formData.payment?.accountNumber
                ? `****${formData.payment.accountNumber.slice(-4)}`
                : "****1234"
            }
          />
          <DetailRow
            label="IFSC Code"
            value={formData.payment?.ifscCode || "SBIN0001234"}
          />
        </Section>

        {/* Important Info */}
        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <Ionicons name="information-circle" size={20} color="#3B82F6" />
            <Text style={styles.infoTitle}>Important Information</Text>
          </View>
          <Text style={styles.infoText}>
            • Your application will be reviewed within 24-48 hours
          </Text>
          <Text style={styles.infoText}>
            • Background verification may take 3-5 business days
          </Text>
        </View>

        {/* Agreement */}
        <TouchableOpacity
          style={styles.agreementRow}
          onPress={() => setAgreed(!agreed)}
        >
          <Ionicons
            name={agreed ? "checkbox" : "square-outline"}
            size={24}
            color={agreed ? theme.primary : "#CCC"}
          />
          <Text style={styles.agreementText}>
            I confirm that all information provided is accurate and complete. I
            agree to the{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              Terms & Conditions
            </Text>
            .
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { backgroundColor: agreed ? theme.primary : "#A1A1A1" },
          ]}
          onPress={handleSubmit}
          disabled={!agreed}
        >
          <Text style={styles.submitBtnText}>Submit Application</Text>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.secureFooter}>
          <Ionicons name="lock-closed" size={14} color="#0E9F6E" />
          <Text style={styles.secureText}>Secure & Confidential</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function Section({ title, icon, children, onEdit, theme }: any) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleGroup}>
          <View style={[styles.iconBox, { backgroundColor: theme.secondary }]}>
            <Ionicons name={icon} size={20} color={theme.primary} />
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onEdit} style={styles.editBtnContainer}>
          <Ionicons name="pencil" size={14} color={theme.primary} />
          <Text style={[styles.editBtn, { color: theme.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function DetailRow({
  label,
  value,
  isTag,
  isVerified,
  theme,
  tagIcon,
  isMultiline,
}: any) {
  return (
    <View style={[styles.row, isMultiline && { alignItems: "flex-start" }]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valBox}>
        {isTag ? (
          <View style={[styles.tag, { backgroundColor: theme.secondary }]}>
            <Ionicons
              name={tagIcon}
              size={12}
              color={theme.primary}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{ color: theme.primary, fontWeight: "700", fontSize: 12 }}
            >
              {value}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.value,
              isMultiline && { textAlign: "right", flex: 1 },
            ]}
          >
            {value || "---"}
          </Text>
        )}
        {isVerified && (
          <Ionicons
            name="checkmark-circle"
            size={18}
            color="#0E9F6E"
            style={{ marginLeft: 6 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, fontSize: 16, fontWeight: "500" },
  headerVisual: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: { paddingHorizontal: 20, alignItems: "center" },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtext: { fontSize: 13, color: "rgba(255,255,255,0.9)" },
  content: { padding: 16 },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleGroup: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  editBtnContainer: { flexDirection: "row", alignItems: "center" },
  editBtn: { fontSize: 14, fontWeight: "600", marginLeft: 4 },
  sectionBody: { paddingLeft: 2 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 13, color: "#6B7280", flex: 1 },
  valBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  value: { fontSize: 14, color: "#111", fontWeight: "600" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceHeader: { marginBottom: 6 },
  serviceName: { fontSize: 15, fontWeight: "700" },
  serviceDetailsGrid: { flexDirection: "row", gap: 16, marginBottom: 8 },
  serviceDetail: { flex: 1 },
  detailLabel: { fontSize: 11, color: "#6B7280", marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: "500", color: "#111" },
  serviceDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 8,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E40AF",
    marginLeft: 8,
  },
  infoText: { fontSize: 13, color: "#1E40AF", marginBottom: 4 },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  agreementText: {
    fontSize: 13,
    color: "#4B5563",
    flex: 1,
    marginLeft: 10,
    lineHeight: 18,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginRight: 10,
  },
  secureFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  secureText: { fontSize: 12, color: "#6B7280", marginLeft: 6 },
  noDataText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
});
