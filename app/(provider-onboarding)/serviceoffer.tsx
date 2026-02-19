// import { useReligion } from "@/contexts/ReligionContext";
// import { useTheme } from "@/theme/ThemeProvider";
// import { useRouter } from "expo-router";
// import {
//   Baby,
//   BookOpen,
//   ChevronLeft,
//   GraduationCap,
//   Heart,
//   Info,
//   Mic,
//   Moon,
// } from "lucide-react-native";
// import { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function ServiceOffer() {
//   const router = useRouter();
//   const { religion } = useReligion();
//   const { primary } = useTheme();

//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [services, setServices] = useState(getServicesByReligion(religion));

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [editingService, setEditingService] = useState<any>(null);

//   const getProgressColor = () => {
//     switch (religion?.toLowerCase()) {
//       case "islam":
//         return "#10B981";
//       case "hindu":
//         return "#F59E0B";
//       case "christianity":
//         return "#3B82F6";
//       default:
//         return primary;
//     }
//   };

//   const toggleService = (serviceName: string) => {
//     setSelectedServices((prev) =>
//       prev.includes(serviceName)
//         ? prev.filter((s) => s !== serviceName)
//         : [...prev, serviceName],
//     );
//   };

//   const openCustomize = (service: any) => {
//     setEditingService({ ...service });
//     setModalVisible(true);
//   };

//   const saveCustomization = () => {
//     setServices((prev) =>
//       prev.map((s) => (s.name === editingService.name ? editingService : s)),
//     );
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* HEADER SECTION */}
//       <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.backButton}
//         >
//           <ChevronLeft color="#fff" size={24} />
//         </TouchableOpacity>
//         <View style={styles.stepBadge}>
//           <Text style={styles.stepText}>Step 5 of 7</Text>
//         </View>
//         <View style={styles.headerContent}>
//           <View style={styles.iconCircle}>
//             <Moon
//               color={getProgressColor()}
//               size={28}
//               fill={getProgressColor()}
//             />
//           </View>
//           <Text style={styles.headerTitle}>Services You Offer</Text>
//           <Text style={styles.headerSubtitle}>
//             Select the religious services you can provide
//           </Text>
//         </View>
//       </View>

//       {/* WHITE CONTENT CARD */}
//       <View style={styles.cardOverlap}>
//         <View style={styles.progressContainer}>
//           <View
//             style={[
//               styles.progressBar,
//               { width: "70%", backgroundColor: getProgressColor() },
//             ]}
//           />
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         >
//           {services.map((service) => {
//             const isSelected = selectedServices.includes(service.name);
//             return (
//               <TouchableOpacity
//                 key={service.name}
//                 activeOpacity={0.7}
//                 onPress={() => toggleService(service.name)}
//                 style={[
//                   styles.serviceCard,
//                   isSelected && {
//                     borderColor: getProgressColor(),
//                     backgroundColor: "#F0FDF4",
//                   },
//                 ]}
//               >
//                 <View style={styles.cardRow}>
//                   <View
//                     style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}
//                   >
//                     {getServiceIcon(service.name, getProgressColor())}
//                   </View>
//                   <View style={styles.serviceInfo}>
//                     <View style={styles.titleRow}>
//                       <Text style={styles.serviceTitle}>{service.name}</Text>
//                       <View
//                         style={[
//                           styles.radioButton,
//                           isSelected && {
//                             backgroundColor: getProgressColor(),
//                             borderColor: getProgressColor(),
//                           },
//                         ]}
//                       >
//                         {isSelected && <View style={styles.radioInner} />}
//                       </View>
//                     </View>
//                     <Text style={styles.serviceDescription}>
//                       {service.description}
//                     </Text>
//                     <View style={styles.metaRow}>
//                       <Text style={styles.metaText}>
//                         🕒 {service.duration} • ₹{service.price}
//                       </Text>
//                       <TouchableOpacity onPress={() => openCustomize(service)}>
//                         <Text
//                           style={[
//                             styles.customizeText,
//                             { color: getProgressColor() },
//                           ]}
//                         >
//                           Customize
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}

//           {/* ℹ️ INFO BOX CARD (Inside Scroll) */}
//           <View style={styles.infoBox}>
//             <Info size={18} color="#3B82F6" />
//             <View style={{ flex: 1, marginLeft: 10 }}>
//               <Text style={styles.infoTitle}>Service Selection</Text>
//               <Text style={styles.infoDescription}>
//                 Select at least 1 service to continue. You can always add or
//                 modify services later from your dashboard.
//               </Text>
//             </View>
//           </View>
//         </ScrollView>

//         {/* FIXED FOOTER BUTTON */}
//         <View style={styles.footer}>
//           <TouchableOpacity
//             onPress={() => router.push("/(provider-onboarding)/paymentsetup")}
//             style={[
//               styles.continueButton,
//               { backgroundColor: getProgressColor() },
//             ]}
//           >
//             <Text style={styles.continueButtonText}>
//               Continue to Next Step →
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* CUSTOMIZATION MODAL */}
//       <Modal visible={isModalVisible} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>Customize Service</Text>

//             <Text style={styles.label}>Duration</Text>
//             <TextInput
//               style={styles.input}
//               value={editingService?.duration}
//               onChangeText={(txt) =>
//                 setEditingService({ ...editingService, duration: txt })
//               }
//             />

//             <Text style={styles.label}>Price (₹)</Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="numeric"
//               value={editingService?.price}
//               onChangeText={(txt) =>
//                 setEditingService({ ...editingService, price: txt })
//               }
//             />
//             <Text style={styles.label}>Service Content</Text>
//             <TextInput
//               style={styles.input}
//               value={editingService}
//               onChangeText={(txt) =>
//                 setEditingService({ ...editingService, name: txt })
//               }
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={{ color: "#6B7280" }}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={saveCustomization}
//                 style={[
//                   styles.saveBtn,
//                   { backgroundColor: getProgressColor() },
//                 ]}
//               >
//                 <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                   Update
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     height: 260,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },
//   backButton: { position: "absolute", left: 20, top: 50 },
//   stepBadge: {
//     position: "absolute",
//     right: 20,
//     top: 50,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//   },
//   stepText: { color: "#fff", fontSize: 12, fontWeight: "600" },
//   headerContent: { alignItems: "center", marginTop: 10 },
//   iconCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
//   headerSubtitle: {
//     color: "rgba(255,255,255,0.8)",
//     textAlign: "center",
//     marginTop: 5,
//     fontSize: 13,
//   },
//   cardOverlap: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -35,
//     paddingHorizontal: 20,
//   },
//   progressContainer: {
//     height: 6,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 3,
//     marginVertical: 20,
//     overflow: "hidden",
//   },
//   progressBar: { height: "100%" },
//   serviceCard: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 16,
//     padding: 14,
//     marginBottom: 12,
//   },
//   cardRow: { flexDirection: "row" },
//   iconBox: {
//     width: 42,
//     height: 42,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   serviceInfo: { flex: 1 },
//   titleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   serviceTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
//   serviceDescription: { fontSize: 12, color: "#6B7280", marginTop: 4 },
//   metaRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//     alignItems: "center",
//   },
//   metaText: { fontSize: 12, color: "#4B5563", fontWeight: "600" },
//   customizeText: { fontSize: 12, fontWeight: "700" },
//   radioButton: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 2,
//     borderColor: "#D1D5DB",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" },
//   infoBox: {
//     flexDirection: "row",
//     backgroundColor: "#EFF6FF",
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   infoTitle: { color: "#1E40AF", fontWeight: "700", fontSize: 14 },
//   infoDescription: {
//     color: "#1E40AF",
//     fontSize: 12,
//     marginTop: 2,
//     lineHeight: 16,
//   },
//   footer: { paddingVertical: 20, backgroundColor: "#fff" },
//   continueButton: { padding: 16, borderRadius: 15, alignItems: "center" },
//   continueButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     padding: 25,
//   },
//   modalContent: { backgroundColor: "#fff", borderRadius: 24, padding: 24 },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: { fontSize: 13, color: "#374151", marginBottom: 6, fontWeight: "600" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 15,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   cancelBtn: { flex: 1, alignItems: "center", justifyContent: "center" },
//   saveBtn: {
//     flex: 2,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
// });

// function getServiceIcon(name: string, color: string) {
//   if (name.includes("Nikah") || name.includes("Milad"))
//     return <Moon size={20} color={color} />;
//   if (name.includes("Quran") || name.includes("Fatiha"))
//     return <BookOpen size={20} color={color} />;
//   if (name.includes("Janaza")) return <Heart size={20} color={color} />;
//   if (name.includes("Aqeeqah")) return <Baby size={20} color={color} />;
//   if (name.includes("Khutba")) return <Mic size={20} color={color} />;
//   return <GraduationCap size={20} color={color} />;
// }

// function getServicesByReligion(religion: string | null) {
//   const rel = religion?.toLowerCase();
//   if (rel === "islam")
//     return [
//       {
//         name: "Nikah Ceremony",
//         description:
//           "Complete Islamic marriage ceremony with proper rituals and documentation",
//         duration: "2 hours",
//         price: "3,000",
//       },
//       {
//         name: "Fatiha Service",
//         description:
//           "Prayer service for deceased souls with Quran recitation and dua",
//         duration: "1 hour",
//         price: "1,500",
//       },
//       {
//         name: "Aqeeqah Ceremony",
//         description:
//           "Traditional naming ceremony for newborns with prayers and blessings",
//         duration: "1.5 hours",
//         price: "2,000",
//       },
//       {
//         name: "Janaza Prayer",
//         description: "Funeral prayer service according to Islamic traditions",
//         duration: "45 mins",
//         price: "1,200",
//       },
//       {
//         name: "Quran Teaching",
//         description: "Private Quran recitation and Islamic studies lessons",
//         duration: "1 hour",
//         price: "800",
//       },
//       {
//         name: "Milad Ceremony",
//         description: "Prophet's birthday celebration with naat and prayers",
//         duration: "2 hours",
//         price: "2,500",
//       },
//       {
//         name: "Friday Khutba",
//         description: "Friday sermon delivery in Arabic and local language",
//         duration: "30 mins",
//         price: "2,000",
//       },
//     ];
//   if (rel === "hindu")
//     return [
//       {
//         name: "Puja Ceremony",
//         description: "Traditional temple or home puja service",
//         duration: "1.5 hours",
//         price: "2,500",
//       },
//       {
//         name: "Wedding Ritual",
//         description: "Complete Hindu wedding rituals",
//         duration: "3 hours",
//         price: "5,000",
//       },
//     ];
//   if (rel === "christianity")
//     return [
//       {
//         name: "Church Wedding",
//         description: "Christian marriage ceremony in church",
//         duration: "2 hours",
//         price: "4,000",
//       },
//       {
//         name: "Funeral Prayer",
//         description: "Christian funeral service and prayers",
//         duration: "1 hour",
//         price: "2,000",
//       },
//     ];
//   return [];
// }
import { useReligion } from "@/contexts/ReligionContext";
import { updateServices } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Baby,
  BookOpen,
  ChevronLeft,
  GraduationCap,
  Heart,
  Info,
  Mic,
  Moon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function ServiceOffer() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const dispatch = useDispatch();

  // Get saved services from Redux store
  const savedServices = useSelector(
    (state: RootState) => state.onboarding.services,
  );

  const [selectedServices, setSelectedServices] = useState<string[]>(
    savedServices?.services?.map((s) => s.name) || [],
  );
  const [services, setServices] = useState(
    getServicesByReligion(religion, savedServices?.services),
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Check if coming from review screen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromReview") === "true") {
      // Optional: Show message or highlight
    }
  }, []);

  const getProgressColor = () => {
    switch (religion?.toLowerCase()) {
      case "islam":
        return "#10B981";
      case "hindu":
        return "#F59E0B";
      case "christianity":
        return "#3B82F6";
      default:
        return primary;
    }
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName],
    );
  };

  const openCustomize = (service: any) => {
    setEditingService({ ...service });
    setModalVisible(true);
  };

  const saveCustomization = () => {
    setServices((prev) =>
      prev.map((s) => (s.name === editingService.name ? editingService : s)),
    );
    setModalVisible(false);
  };

  // const handleContinue = () => {
  //   if (selectedServices.length === 0) {
  //     Alert.alert(
  //       "Selection Required",
  //       "Please select at least one service to continue",
  //     );
  //     return;
  //   }

  //   // Filter only selected services with their customized details
  //   const selectedServicesData = services.filter((service) =>
  //     selectedServices.includes(service.name),
  //   );

  //   // Prepare service data for Redux
  //   const serviceData = {
  //     services: selectedServicesData.map((service) => ({
  //       name: service.name,
  //       description: service.description,
  //       duration: service.duration,
  //       price: service.price,
  //       customizedPricing: service.customizedPricing || false,
  //       travelCharges: service.travelCharges || 0,
  //       additionalNotes: service.additionalNotes || "",
  //       category: service.category || "general",
  //     })),
  //     travelAllowed: true, // You can add this to your form
  //     onlineAllowed: false, // You can add this to your form
  //     updatedAt: new Date().toISOString(),
  //   };

  //   // Save to Redux
  //   dispatch(updateServices(serviceData));

  //   // Check if returning to review
  //   const params = new URLSearchParams(window.location.search);
  //   if (
  //     params.get("fromReview") === "true" ||
  //     params.get("fromEdit") === "true"
  //   ) {
  //     router.back();
  //   } else {
  //     router.push("/(provider-onboarding)/paymentsetup");
  //   }
  // };
  const { returnTo, fromReview } = useLocalSearchParams<{
    returnTo: string;
    fromReview: string;
  }>();
  const isEditing = returnTo === "review" || fromReview === "true";

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      Alert.alert(
        "Selection Required",
        "Please select at least one service to continue",
      );
      return;
    }

    // Filter only selected services with their customized details
    const selectedServicesData = services.filter((service) =>
      selectedServices.includes(service.name),
    );

    // Prepare service data for Redux
    const serviceData = {
      services: selectedServicesData.map((service) => ({
        name: service.name,
        description: service.description,
        duration: service.duration,
        price: service.price,
        customizedPricing: service.customizedPricing || false,
        travelCharges: service.travelCharges || 0,
        additionalNotes: service.additionalNotes || "",
        category: service.category || "general",
      })),
      travelAllowed: true,
      onlineAllowed: false,
      updatedAt: new Date().toISOString(),
    };

    // Save to Redux
    dispatch(updateServices(serviceData));

    // --- UPDATED NAVIGATION LOGIC ---
    if (isEditing) {
      // Return to Review screen and trigger the refresh effect
      router.replace({
        pathname: "/(provider-onboarding)/reviewsubmit",
        params: { updated: "true" },
      });
    } else {
      // Continue normal onboarding sequence
      router.push("/(provider-onboarding)/paymentsetup");
    }
  };
  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>
        <View style={styles.stepBadge}>
          <Text style={styles.stepText}>Step 5 of 7</Text>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.iconCircle}>
            <Moon
              color={getProgressColor()}
              size={28}
              fill={getProgressColor()}
            />
          </View>
          <Text style={styles.headerTitle}>Services You Offer</Text>
          <Text style={styles.headerSubtitle}>
            Select the religious services you can provide
          </Text>
        </View>
      </View>

      {/* WHITE CONTENT CARD */}
      <View style={styles.cardOverlap}>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: "70%", backgroundColor: getProgressColor() },
            ]}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Selected Count Indicator */}
          {selectedServices.length > 0 && (
            <View style={styles.selectedCountContainer}>
              <Text style={styles.selectedCountText}>
                {selectedServices.length} service
                {selectedServices.length > 1 ? "s" : ""} selected
              </Text>
            </View>
          )}

          {services.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <TouchableOpacity
                key={service.name}
                activeOpacity={0.7}
                onPress={() => toggleService(service.name)}
                style={[
                  styles.serviceCard,
                  isSelected && {
                    borderColor: getProgressColor(),
                    backgroundColor: "#F0FDF4",
                  },
                ]}
              >
                <View style={styles.cardRow}>
                  <View
                    style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}
                  >
                    {getServiceIcon(service.name, getProgressColor())}
                  </View>
                  <View style={styles.serviceInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.serviceTitle}>{service.name}</Text>
                      <View
                        style={[
                          styles.radioButton,
                          isSelected && {
                            backgroundColor: getProgressColor(),
                            borderColor: getProgressColor(),
                          },
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                    </View>
                    <Text style={styles.serviceDescription}>
                      {service.description}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaText}>
                        🕒 {service.duration} • ₹{service.price}
                      </Text>
                      <TouchableOpacity onPress={() => openCustomize(service)}>
                        <Text
                          style={[
                            styles.customizeText,
                            { color: getProgressColor() },
                          ]}
                        >
                          Customize
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Show customization if exists */}
                    {service.customizedPricing && (
                      <View style={styles.customizationBadge}>
                        <Text style={styles.customizationText}>
                          ✨ Customized pricing available
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Additional Options Section */}
          <View style={styles.additionalOptions}>
            <Text style={styles.optionsTitle}>Additional Preferences</Text>

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <GraduationCap size={20} color="#666" />
                <Text style={styles.optionText}>
                  Allow travel to devotees location
                </Text>
              </View>
              <View style={[styles.toggle, { backgroundColor: "#E5E7EB" }]}>
                <View style={[styles.toggleCircle, { marginLeft: 0 }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Mic size={20} color="#666" />
                <Text style={styles.optionText}>
                  Offer online consultations
                </Text>
              </View>
              <View style={[styles.toggle, { backgroundColor: "#E5E7EB" }]}>
                <View style={[styles.toggleCircle, { marginLeft: 0 }]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Info size={20} color={getProgressColor()} />
            <Text style={styles.infoText}>
              You can customize pricing and duration for each service. These
              will be visible to devotees when they book.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: getProgressColor() },
              selectedServices.length === 0 && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={selectedServices.length === 0}
          >
            <Text style={styles.continueButtonText}>
              Continue with {selectedServices.length} service
              {selectedServices.length !== 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Customization Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customize Service</Text>
            {editingService && (
              <>
                <Text style={styles.modalServiceName}>
                  {editingService.name}
                </Text>

                <Text style={styles.inputLabel}>Price (₹)</Text>
                <TextInput
                  style={styles.modalInput}
                  value={String(editingService.price)}
                  onChangeText={(text) =>
                    setEditingService({
                      ...editingService,
                      price: parseInt(text) || 0,
                      customizedPricing: true,
                    })
                  }
                  keyboardType="numeric"
                  placeholder="Enter price"
                />

                <Text style={styles.inputLabel}>Duration</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingService.duration}
                  onChangeText={(text) =>
                    setEditingService({ ...editingService, duration: text })
                  }
                  placeholder="e.g., 2 hours"
                />

                <Text style={styles.inputLabel}>Travel Charges (₹)</Text>
                <TextInput
                  style={styles.modalInput}
                  value={String(editingService.travelCharges || "")}
                  onChangeText={(text) =>
                    setEditingService({
                      ...editingService,
                      travelCharges: parseInt(text) || 0,
                    })
                  }
                  keyboardType="numeric"
                  placeholder="Enter travel charges"
                />

                <Text style={styles.inputLabel}>Additional Notes</Text>
                <TextInput
                  style={[styles.modalInput, styles.textArea]}
                  value={editingService.additionalNotes || ""}
                  onChangeText={(text) =>
                    setEditingService({
                      ...editingService,
                      additionalNotes: text,
                    })
                  }
                  placeholder="Any special instructions..."
                  multiline
                  numberOfLines={3}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.saveButton,
                      { backgroundColor: getProgressColor() },
                    ]}
                    onPress={saveCustomization}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={handleContinue}
                    style={[styles.mainButton, { backgroundColor: primary }]}
                  >
                    <Text style={styles.buttonText}>
                      {isEditing ? "Save & Return" : "Continue to Next Step"}
                    </Text>
                    <Ionicons
                      name={isEditing ? "checkmark-circle" : "arrow-forward"}
                      size={18}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Helper function to get services by religion
function getServicesByReligion(religion: string, existingServices?: any[]) {
  const baseServices: Record<string, any[]> = {
    islam: [
      {
        name: "Nikah Ceremony",
        description:
          "Complete Islamic wedding ceremony with Quranic verses and duas",
        duration: "2 hours",
        price: 5000,
        category: "ceremony",
      },
      {
        name: "Quran Classes",
        description: "One-on-one Quran reading and memorization sessions",
        duration: "1 hour",
        price: 1000,
        category: "education",
      },
      {
        name: "Spiritual Counseling",
        description: "Guidance on Islamic matters and personal issues",
        duration: "45 mins",
        price: 1500,
        category: "counseling",
      },
      {
        name: "Funeral Prayer (Janazah)",
        description: "Lead funeral prayers and provide burial guidance",
        duration: "1 hour",
        price: 3000,
        category: "ceremony",
      },
    ],
    hindu: [
      {
        name: "Puja Ceremony",
        description: "Perform traditional puja with mantras and rituals",
        duration: "2 hours",
        price: 4000,
        category: "ceremony",
      },
      {
        name: "Wedding Rituals",
        description: "Complete Vedic wedding ceremony guidance",
        duration: "3 hours",
        price: 8000,
        category: "ceremony",
      },
      {
        name: "Vastu Consultation",
        description: "Home and office Vastu guidance",
        duration: "1 hour",
        price: 2500,
        category: "consultation",
      },
    ],
    christianity: [
      {
        name: "Wedding Ceremony",
        description: "Christian wedding service with biblical readings",
        duration: "2 hours",
        price: 6000,
        category: "ceremony",
      },
      {
        name: "Bible Study",
        description: "Group or individual Bible study sessions",
        duration: "1 hour",
        price: 800,
        category: "education",
      },
      {
        name: "Pastoral Counseling",
        description: "Spiritual guidance and counseling",
        duration: "1 hour",
        price: 2000,
        category: "counseling",
      },
    ],
  };

  const defaultServices =
    baseServices[religion?.toLowerCase()] || baseServices.islam;

  // Merge with existing customizations if provided
  if (existingServices) {
    return defaultServices.map((defaultService) => {
      const existing = existingServices.find(
        (s) => s.name === defaultService.name,
      );
      return existing ? { ...defaultService, ...existing } : defaultService;
    });
  }

  return defaultServices;
}

// Helper function to get service icon
function getServiceIcon(serviceName: string, color: string) {
  if (serviceName.includes("Wedding") || serviceName.includes("Nikah")) {
    return <Heart size={24} color={color} />;
  } else if (serviceName.includes("Quran") || serviceName.includes("Bible")) {
    return <BookOpen size={24} color={color} />;
  } else if (serviceName.includes("Counseling")) {
    return <Mic size={24} color={color} />;
  } else if (
    serviceName.includes("Funeral") ||
    serviceName.includes("Janazah")
  ) {
    return <Moon size={24} color={color} />;
  } else if (serviceName.includes("Puja") || serviceName.includes("Rituals")) {
    return <GraduationCap size={24} color={color} />;
  } else {
    return <Baby size={24} color={color} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
  },
  stepBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  stepText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  headerContent: {
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  cardOverlap: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  selectedCountContainer: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedCountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
    textAlign: "center",
  },
  serviceCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: 13,
    color: "#4B5563",
  },
  customizeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  customizationBadge: {
    marginTop: 8,
    padding: 4,
    backgroundColor: "#FEF3C7",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  customizationText: {
    fontSize: 11,
    color: "#D97706",
  },
  additionalOptions: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 14,
    color: "#4B5563",
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  continueButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalServiceName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
  },
  cancelButtonText: {
    color: "#4B5563",
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#10B981",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mainButton: {
    flexDirection: "row",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
