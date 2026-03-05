// import Slider from "@react-native-community/slider";
// import { useRouter } from "expo-router";
// import {
//   Calendar,
//   CheckCircle2,
//   ChevronDown,
//   ChevronLeft,
//   Clock,
//   Info,
//   Lightbulb,
// } from "lucide-react-native";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import { useReligion } from "@/contexts/ReligionContext";
// import { updateAvailability } from "@/store/onboardingSlice";
// import { RootState } from "@/store/store";
// import { useTheme } from "@/theme/ThemeProvider";

// // Time options for picker
// const HOURS = Array.from({ length: 12 }, (_, i) =>
//   (i + 1).toString().padStart(2, "0"),
// );
// const MINUTES = ["00", "15", "30", "45"];
// const PERIODS = ["AM", "PM"];

// /**
//  * UTILITY: Calculates hours between two time strings (e.g., "06:00 AM" to "12:00 PM")
//  */
// const calculateHours = (from: string, to: string): number => {
//   try {
//     const parseTime = (t: string) => {
//       const [time, modifier] = t.split(" ");
//       let [hours, minutes] = time.split(":").map(Number);
//       if (modifier === "PM" && hours < 12) hours += 12;
//       if (modifier === "AM" && hours === 12) hours = 0;
//       return hours + minutes / 60;
//     };
//     const start = parseTime(from);
//     const end = parseTime(to);
//     return end > start ? end - start : 0;
//   } catch (e) {
//     return 0;
//   }
// };

// // Time Picker Modal Component
// const TimePickerModal = ({
//   visible,
//   onClose,
//   onSelect,
//   currentTime,
//   title,
// }: {
//   visible: boolean;
//   onClose: () => void;
//   onSelect: (time: string) => void;
//   currentTime: string;
//   title: string;
// }) => {
//   const [selectedHour, setSelectedHour] = useState(() => {
//     const match = currentTime.match(/(\d+):/);
//     return match ? match[1].padStart(2, "0") : "09";
//   });
//   const [selectedMinute, setSelectedMinute] = useState(() => {
//     const match = currentTime.match(/:(\d+)/);
//     return match ? match[1] : "00";
//   });
//   const [selectedPeriod, setSelectedPeriod] = useState(() => {
//     return currentTime.includes("PM") ? "PM" : "AM";
//   });

//   const handleConfirm = () => {
//     onSelect(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
//     onClose();
//   };

//   const renderPickerItem = (
//     item: string,
//     type: string,
//     selected: string,
//     onSelect: (val: string) => void,
//   ) => (
//     <TouchableOpacity
//       style={[
//         styles.pickerItem,
//         selected === item && styles.pickerItemSelected,
//       ]}
//       onPress={() => onSelect(item)}
//     >
//       <Text
//         style={[
//           styles.pickerItemText,
//           selected === item && styles.pickerItemTextSelected,
//         ]}
//       >
//         {item}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>{title}</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={styles.modalClose}>✕</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.pickerContainer}>
//             {/* Hours */}
//             <View style={styles.pickerColumn}>
//               <Text style={styles.pickerLabel}>Hour</Text>
//               <FlatList
//                 data={HOURS}
//                 keyExtractor={(item) => item}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.pickerList}
//                 renderItem={({ item }) =>
//                   renderPickerItem(item, "hour", selectedHour, setSelectedHour)
//                 }
//               />
//             </View>

//             {/* Minutes */}
//             <View style={styles.pickerColumn}>
//               <Text style={styles.pickerLabel}>Min</Text>
//               <FlatList
//                 data={MINUTES}
//                 keyExtractor={(item) => item}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.pickerList}
//                 renderItem={({ item }) =>
//                   renderPickerItem(
//                     item,
//                     "minute",
//                     selectedMinute,
//                     setSelectedMinute,
//                   )
//                 }
//               />
//             </View>

//             {/* AM/PM */}
//             <View style={styles.pickerColumn}>
//               <Text style={styles.pickerLabel}>Period</Text>
//               <FlatList
//                 data={PERIODS}
//                 keyExtractor={(item) => item}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.pickerList}
//                 renderItem={({ item }) =>
//                   renderPickerItem(
//                     item,
//                     "period",
//                     selectedPeriod,
//                     setSelectedPeriod,
//                   )
//                 }
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.confirmButton}
//             onPress={handleConfirm}
//           >
//             <Text style={styles.confirmButtonText}>Confirm Time</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// // Time Selector Component
// const TimeSelector = ({
//   label,
//   value,
//   onPress,
//   color,
// }: {
//   label: string;
//   value: string;
//   onPress: () => void;
//   color: string;
// }) => (
//   <TouchableOpacity style={styles.timeSelector} onPress={onPress}>
//     <Text style={styles.timeSelectorLabel}>{label}</Text>
//     <View style={[styles.timeSelectorValue, { borderColor: color }]}>
//       <Text style={styles.timeSelectorText}>{value}</Text>
//       <ChevronDown size={16} color="#6B7280" />
//     </View>
//   </TouchableOpacity>
// );

// export default function AvailabilitySetup() {
//   const router = useRouter();
//   const { religion } = useReligion();
//   const { primary } = useTheme();
//   const dispatch = useDispatch();

//   // Get saved availability from Redux
//   const savedAvailability = useSelector(
//     (state: RootState) => state.onboarding.availability,
//   );

//   const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const [activeTab, setActiveTab] = useState("Mon");
//   const [serviceRadius, setServiceRadius] = useState(
//     savedAvailability?.serviceRadius || 15,
//   );
//   const [timePickerVisible, setTimePickerVisible] = useState(false);
//   const [currentPicker, setCurrentPicker] = useState<{
//     slot: string;
//     field: "from" | "to";
//   } | null>(null);

//   // Initialize state with saved data or defaults
//   const [availability, setAvailability] = useState(() => {
//     // If we have saved data, use it
//     if (savedAvailability?.days) {
//       return savedAvailability.days;
//     }

//     // Otherwise use defaults
//     return daysList.reduce(
//       (acc, day) => ({
//         ...acc,
//         [day]: {
//           morning: { active: false, from: "09:00 AM", to: "12:00 PM" },
//           afternoon: { active: false, from: "12:00 PM", to: "05:00 PM" },
//           evening: { active: false, from: "05:00 PM", to: "09:00 PM" },
//         },
//       }),
//       {},
//     );
//   });

//   // Check if coming from review
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("fromReview") === "true") {
//       // Optional: Show message
//     }
//   }, []);

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

//   const toggleSlot = (slot: string) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         [slot]: {
//           ...prev[activeTab][slot],
//           active: !prev[activeTab][slot].active,
//         },
//       },
//     }));
//   };

//   const openTimePicker = (slot: string, field: "from" | "to") => {
//     setCurrentPicker({ slot, field });
//     setTimePickerVisible(true);
//   };

//   const updateTime = (time: string) => {
//     if (!currentPicker) return;

//     setAvailability((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         [currentPicker.slot]: {
//           ...prev[activeTab][currentPicker.slot],
//           [currentPicker.field]: time,
//         },
//       },
//     }));
//     setTimePickerVisible(false);
//   };

//   const copyPreviousDay = () => {
//     const currentIndex = daysList.indexOf(activeTab);
//     if (currentIndex === 0) return;
//     const prevDay = daysList[currentIndex - 1];
//     setAvailability((prev) => ({
//       ...prev,
//       [activeTab]: JSON.parse(JSON.stringify(prev[prevDay])), // Deep copy
//     }));
//   };

//   /**
//    * Summary Feature: Calculate total active days and total hours per day
//    */
//   const summary = useMemo(() => {
//     let totalActiveDays = 0;
//     let totalDailyHours = 0;

//     Object.keys(availability).forEach((day) => {
//       const daySlots = availability[day];
//       const isDayActive =
//         daySlots.morning.active ||
//         daySlots.afternoon.active ||
//         daySlots.evening.active;

//       if (isDayActive) {
//         totalActiveDays++;
//         if (day === activeTab) {
//           if (daySlots.morning.active)
//             totalDailyHours += calculateHours(
//               daySlots.morning.from,
//               daySlots.morning.to,
//             );
//           if (daySlots.afternoon.active)
//             totalDailyHours += calculateHours(
//               daySlots.afternoon.from,
//               daySlots.afternoon.to,
//             );
//           if (daySlots.evening.active)
//             totalDailyHours += calculateHours(
//               daySlots.evening.from,
//               daySlots.evening.to,
//             );
//         }
//       }
//     });

//     return { totalActiveDays, totalDailyHours: totalDailyHours.toFixed(1) };
//   }, [availability, activeTab]);

//   const handleContinue = () => {
//     if (summary.totalActiveDays === 0) {
//       Alert.alert("Required", "Please set availability for at least one day.");
//       return;
//     }

//     // Prepare availability data for Redux
//     const availabilityData = {
//       days: availability,
//       serviceRadius: serviceRadius,
//       updatedAt: new Date().toISOString(),
//     };

//     // Save to Redux
//     dispatch(updateAvailability(availabilityData));

//     // Check if returning to review
//     const params = new URLSearchParams(window.location.search);
//     if (
//       params.get("fromReview") === "true" ||
//       params.get("fromEdit") === "true"
//     ) {
//       router.back();
//     } else {
//       router.push("/(provider-onboarding)/reviewsubmit");
//     }
//   };

//   const currentTimeValue = currentPicker
//     ? availability[activeTab][currentPicker.slot][currentPicker.field]
//     : "09:00 AM";

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             style={styles.backButton}
//           >
//             <ChevronLeft color="#fff" size={24} />
//           </TouchableOpacity>
//           <View style={styles.stepBadge}>
//             <Text style={styles.stepText}>Step 7 of 7</Text>
//           </View>
//           <View style={styles.headerContent}>
//             <View style={styles.iconCircle}>
//               <Calendar color={getProgressColor()} size={28} />
//             </View>
//             <Text style={styles.headerTitle}>Set Your Availability</Text>
//             <Text style={styles.headerSubtitle}>
//               Choose your working days and time slots
//             </Text>
//           </View>
//         </View>

//         <View style={styles.cardOverlap}>
//           {/* PROGRESS BAR */}
//           <View style={styles.progressContainer}>
//             <View
//               style={[
//                 styles.progressBar,
//                 { width: "100%", backgroundColor: getProgressColor() },
//               ]}
//             />
//           </View>

//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 40 }}
//           >
//             <Text style={styles.sectionTitle}>Available Days</Text>

//             {/* HORIZONTAL DAYS TAB */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.dayScroll}
//             >
//               {daysList.map((day) => {
//                 const isActive = activeTab === day;
//                 const dayData = availability[day];
//                 const hasData =
//                   dayData.morning.active ||
//                   dayData.afternoon.active ||
//                   dayData.evening.active;

//                 return (
//                   <TouchableOpacity
//                     key={day}
//                     onPress={() => setActiveTab(day)}
//                     style={[
//                       styles.dayTab,
//                       isActive && {
//                         borderColor: getProgressColor(),
//                         backgroundColor: "#F0FDF4",
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.dayTabText,
//                         isActive && {
//                           color: getProgressColor(),
//                           fontWeight: "700",
//                         },
//                       ]}
//                     >
//                       {day}
//                     </Text>
//                     {hasData && (
//                       <View style={styles.dotIndicator}>
//                         <CheckCircle2 size={10} color={getProgressColor()} />
//                       </View>
//                     )}
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             {/* TIME SLOTS SECTION */}
//             <View style={styles.timeHeaderRow}>
//               <Text style={styles.sectionTitle}>
//                 Time Slots for {activeTab}
//               </Text>
//               {daysList.indexOf(activeTab) > 0 && (
//                 <TouchableOpacity onPress={copyPreviousDay}>
//                   <Text
//                     style={[styles.copyText, { color: getProgressColor() }]}
//                   >
//                     + Same as previous
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>

//             {["morning", "afternoon", "evening"].map((slotKey) => (
//               <View
//                 key={slotKey}
//                 style={[
//                   styles.slotCard,
//                   availability[activeTab][slotKey].active && {
//                     borderColor: getProgressColor(),
//                     backgroundColor: "#F9FAFB",
//                     borderWidth: 2,
//                   },
//                 ]}
//               >
//                 <View style={{ flex: 1 }}>
//                   <View style={styles.slotHeader}>
//                     <Text style={styles.slotLabel}>
//                       {slotKey.charAt(0).toUpperCase() + slotKey.slice(1)}
//                     </Text>
//                     {availability[activeTab][slotKey].active && (
//                       <View
//                         style={[
//                           styles.activeBadge,
//                           { backgroundColor: getProgressColor() },
//                         ]}
//                       >
//                         <Text style={styles.activeBadgeText}>Active</Text>
//                       </View>
//                     )}
//                   </View>

//                   <View style={styles.timeRangeBox}>
//                     <TimeSelector
//                       label="From"
//                       value={availability[activeTab][slotKey].from}
//                       onPress={() => openTimePicker(slotKey, "from")}
//                       color={getProgressColor()}
//                     />
//                     <View style={styles.timeSeparator}>
//                       <Text style={styles.timeSeparatorText}>→</Text>
//                     </View>
//                     <TimeSelector
//                       label="To"
//                       value={availability[activeTab][slotKey].to}
//                       onPress={() => openTimePicker(slotKey, "to")}
//                       color={getProgressColor()}
//                     />
//                   </View>
//                 </View>
//                 <Switch
//                   value={availability[activeTab][slotKey].active}
//                   onValueChange={() => toggleSlot(slotKey)}
//                   trackColor={{ false: "#D1D5DB", true: getProgressColor() }}
//                 />
//               </View>
//             ))}

//             {/* SERVICE RADIUS */}
//             <View style={styles.radiusCard}>
//               <View style={styles.radiusHeader}>
//                 <Text style={styles.sectionTitle}>Service Radius</Text>
//                 <View
//                   style={[
//                     styles.radiusBadge,
//                     { backgroundColor: getProgressColor() },
//                   ]}
//                 >
//                   <Text style={styles.radiusBadgeText}>{serviceRadius} km</Text>
//                 </View>
//               </View>
//               <Text style={styles.radiusSub}>
//                 Maximum distance you will travel
//               </Text>
//               <Slider
//                 style={{ width: "100%", height: 40 }}
//                 minimumValue={5}
//                 maximumValue={50}
//                 step={5}
//                 value={serviceRadius}
//                 onValueChange={setServiceRadius}
//                 minimumTrackTintColor={getProgressColor()}
//                 maximumTrackTintColor="#E5E7EB"
//               />
//               <View style={styles.radiusLabels}>
//                 <Text style={styles.limitLabel}>5 km</Text>
//                 <Text style={styles.limitLabel}>25 km</Text>
//                 <Text style={styles.limitLabel}>50 km</Text>
//               </View>
//               <View style={styles.radiusInfo}>
//                 <Info size={14} color={getProgressColor()} />
//                 <Text
//                   style={[styles.radiusInfoText, { color: getProgressColor() }]}
//                 >
//                   Travel charges may apply for distances over 5 km
//                 </Text>
//               </View>
//             </View>

//             {/* UPDATED SUMMARY BOX */}
//             <View
//               style={[
//                 styles.summaryBox,
//                 { backgroundColor: `${getProgressColor()}10` },
//               ]}
//             >
//               <Clock size={20} color={getProgressColor()} />
//               <View style={{ marginLeft: 12, flex: 1 }}>
//                 <Text
//                   style={[styles.summaryTitle, { color: getProgressColor() }]}
//                 >
//                   Availability Summary
//                 </Text>
//                 <View style={styles.summaryRow}>
//                   <Text
//                     style={[styles.summaryText, { color: getProgressColor() }]}
//                   >
//                     {summary.totalActiveDays} active day
//                     {summary.totalActiveDays !== 1 ? "s" : ""}
//                   </Text>
//                   <Text
//                     style={[styles.summaryDot, { color: getProgressColor() }]}
//                   >
//                     {" "}
//                     •{" "}
//                   </Text>
//                   <Text
//                     style={[styles.summaryText, { color: getProgressColor() }]}
//                   >
//                     {summary.totalDailyHours}h today
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* FLEXIBILITY TIP */}
//             <View style={styles.tipBox}>
//               <Lightbulb size={18} color="#3B82F6" />
//               <View style={{ flex: 1, marginLeft: 12 }}>
//                 <Text style={styles.tipTitle}> Flexibility Tip</Text>
//                 <Text style={styles.tipText}>
//                   You can modify your availability anytime from your dashboard
//                   More availability hours increase your booking chnaces.
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={handleContinue}
//               style={[
//                 styles.continueButton,
//                 { backgroundColor: getProgressColor() },
//               ]}
//             >
//               <Text style={styles.continueButtonText}>
//                 Complete Registration ✓
//               </Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>

//         {/* Time Picker Modal */}
//         <TimePickerModal
//           visible={timePickerVisible}
//           onClose={() => setTimePickerVisible(false)}
//           onSelect={updateTime}
//           currentTime={currentTimeValue}
//           title={`Select ${currentPicker?.field === "from" ? "Start" : "End"} Time`}
//         />
//       </View>
//     </ScrollView>
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
//   backButton: { position: "absolute", left: 20, top: 50, zIndex: 10 },
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
//     marginBottom: 12,
//   },
//   headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
//   headerSubtitle: {
//     color: "rgba(255,255,255,0.8)",
//     textAlign: "center",
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
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginBottom: 12,
//   },
//   dayScroll: { marginBottom: 20 },
//   dayTab: {
//     width: 45,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 8,
//     marginRight: 10,
//     position: "relative",
//   },
//   dotIndicator: { position: "absolute", top: 4, right: 4 },
//   dayTabText: { fontSize: 13, fontWeight: "600", color: "#4B5563" },
//   timeHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   copyText: { fontSize: 12, fontWeight: "600" },
//   slotCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     marginBottom: 12,
//   },
//   slotHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   slotLabel: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1F2937",
//     marginRight: 8,
//   },
//   activeBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   activeBadgeText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   timeRangeBox: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   timeSelector: {
//     flex: 1,
//   },
//   timeSelectorLabel: {
//     fontSize: 10,
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   timeSelectorValue: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F3F4F6",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: "transparent",
//   },
//   timeSelectorText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#1F2937",
//   },
//   timeSeparator: {
//     paddingHorizontal: 8,
//     justifyContent: "center",
//   },
//   timeSeparatorText: {
//     fontSize: 16,
//     color: "#9CA3AF",
//   },
//   radiusCard: {
//     padding: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     marginVertical: 10,
//   },
//   radiusHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   radiusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   radiusBadgeText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   radiusSub: { fontSize: 12, color: "#6B7280", marginBottom: 10 },
//   radiusLabels: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: -5,
//   },
//   limitLabel: { fontSize: 10, color: "#9CA3AF" },
//   radiusInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EFF6FF",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 15,
//   },
//   radiusInfoText: { fontSize: 11, marginLeft: 8 },
//   summaryBox: {
//     flexDirection: "row",
//     padding: 16,
//     borderRadius: 16,
//     marginTop: 20,
//   },
//   summaryRow: { flexDirection: "row", alignItems: "center" },
//   summaryTitle: { fontSize: 14, fontWeight: "700" },
//   summaryText: { fontSize: 12, marginTop: 2, opacity: 0.9 },
//   summaryDot: { fontSize: 12, marginTop: 2 },
//   tipBox: {
//     flexDirection: "row",
//     backgroundColor: "#EFF6FF",
//     padding: 16,
//     borderRadius: 16,
//     marginTop: 15,
//   },
//   tipTitle: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
//   tipText: { fontSize: 12, color: "#1E40AF", marginTop: 2 },
//   continueButton: {
//     padding: 16,
//     borderRadius: 15,
//     alignItems: "center",
//     marginTop: 25,
//     marginBottom: 20,
//   },
//   continueButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     minHeight: 400,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1F2937",
//   },
//   modalClose: {
//     fontSize: 20,
//     color: "#6B7280",
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   pickerColumn: {
//     flex: 1,
//     alignItems: "center",
//   },
//   pickerLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginBottom: 10,
//   },
//   pickerList: {
//     paddingVertical: 10,
//   },
//   pickerItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginVertical: 2,
//   },
//   pickerItemSelected: {
//     backgroundColor: "#0c0c0c",
//   },
//   pickerItemText: {
//     fontSize: 16,
//     color: "#1F2937",
//     textAlign: "center",
//   },
//   pickerItemTextSelected: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   confirmButton: {
//     backgroundColor: "#111111",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   confirmButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
import { useReligion } from "@/contexts/ReligionContext";
import { updateAvailability } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Info,
  Lightbulb,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Time options for picker
const HOURS = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0"),
);
const MINUTES = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
const PERIODS = ["AM", "PM"];

/**
 * UTILITY: Calculates hours between two time strings (e.g., "06:00 AM" to "12:00 PM")
 */
const calculateHours = (from: string, to: string): number => {
  try {
    const parseTime = (t: string) => {
      const [time, modifier] = t.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours + minutes / 60;
    };
    const start = parseTime(from);
    const end = parseTime(to);
    return end > start ? end - start : 0;
  } catch (e) {
    return 0;
  }
};

// Time Picker Modal Component
const TimePickerModal = ({
  visible,
  onClose,
  onSelect,
  currentTime,
  title,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (time: string) => void;
  currentTime: string;
  title: string;
}) => {
  const [selectedHour, setSelectedHour] = useState(() => {
    const match = currentTime.match(/(\d+):/);
    return match ? match[1].padStart(2, "0") : "09";
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    const match = currentTime.match(/:(\d+)/);
    return match ? match[1] : "00";
  });
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    return currentTime.includes("PM") ? "PM" : "AM";
  });

  const handleConfirm = () => {
    onSelect(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    onClose();
  };

  const renderPickerItem = (
    item: string,
    type: string,
    selected: string,
    onSelect: (val: string) => void,
  ) => (
    <TouchableOpacity
      style={[
        styles.pickerItem,
        selected === item && styles.pickerItemSelected,
      ]}
      onPress={() => onSelect(item)}
    >
      <Text
        style={[
          styles.pickerItemText,
          selected === item && styles.pickerItemTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            {/* Hours */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Hour</Text>
              <FlatList
                data={HOURS}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerList}
                renderItem={({ item }) =>
                  renderPickerItem(item, "hour", selectedHour, setSelectedHour)
                }
              />
            </View>

            {/* Minutes */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Min</Text>
              <FlatList
                data={MINUTES}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerList}
                renderItem={({ item }) =>
                  renderPickerItem(
                    item,
                    "minute",
                    selectedMinute,
                    setSelectedMinute,
                  )
                }
              />
            </View>

            {/* AM/PM */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Period</Text>
              <FlatList
                data={PERIODS}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerList}
                renderItem={({ item }) =>
                  renderPickerItem(
                    item,
                    "period",
                    selectedPeriod,
                    setSelectedPeriod,
                  )
                }
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm Time</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Time Selector Component
const TimeSelector = ({
  label,
  value,
  onPress,
  color,
}: {
  label: string;
  value: string;
  onPress: () => void;
  color: string;
}) => (
  <TouchableOpacity style={styles.timeSelector} onPress={onPress}>
    <Text style={styles.timeSelectorLabel}>{label}</Text>
    <View style={[styles.timeSelectorValue, { borderColor: color }]}>
      <Text style={styles.timeSelectorText}>{value}</Text>
      <ChevronDown size={16} color="#6B7280" />
    </View>
  </TouchableOpacity>
);

export default function AvailabilitySetup() {
  const router = useRouter();
  const { religion } = useReligion();
  const { primary } = useTheme();
  const dispatch = useDispatch();

  // Get saved availability from Redux
  const savedAvailability = useSelector(
    (state: RootState) => state.onboarding.availability,
  );

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [activeTab, setActiveTab] = useState("Mon");
  const [serviceRadius, setServiceRadius] = useState(
    savedAvailability?.serviceRadius || 15,
  );
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<{
    slot: string;
    field: "from" | "to";
  } | null>(null);

  // Initialize state with saved data or defaults
  const [availability, setAvailability] = useState(() => {
    // If we have saved data, use it
    if (savedAvailability?.days) {
      return savedAvailability.days;
    }

    // Otherwise use defaults
    return daysList.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          morning: { active: false, from: "09:00 AM", to: "12:00 PM" },
          afternoon: { active: false, from: "12:00 PM", to: "05:00 PM" },
          evening: { active: false, from: "05:00 PM", to: "09:00 PM" },
        },
      }),
      {},
    );
  });

  // Check if coming from review
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fromReview") === "true") {
      // Optional: Show message
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

  const toggleSlot = (slot: string) => {
    setAvailability((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [slot]: {
          ...prev[activeTab][slot],
          active: !prev[activeTab][slot].active,
        },
      },
    }));
  };

  const openTimePicker = (slot: string, field: "from" | "to") => {
    setCurrentPicker({ slot, field });
    setTimePickerVisible(true);
  };

  const updateTime = (time: string) => {
    if (!currentPicker) return;

    setAvailability((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [currentPicker.slot]: {
          ...prev[activeTab][currentPicker.slot],
          [currentPicker.field]: time,
        },
      },
    }));
    setTimePickerVisible(false);
  };

  const copyPreviousDay = () => {
    const currentIndex = daysList.indexOf(activeTab);
    if (currentIndex === 0) return;
    const prevDay = daysList[currentIndex - 1];
    setAvailability((prev) => ({
      ...prev,
      [activeTab]: JSON.parse(JSON.stringify(prev[prevDay])), // Deep copy
    }));
  };

  /**
   * Summary Feature: Calculate total active days and total hours per day
   */
  const summary = useMemo(() => {
    let totalActiveDays = 0;
    let totalDailyHours = 0;

    Object.keys(availability).forEach((day) => {
      const daySlots = availability[day];
      const isDayActive =
        daySlots.morning.active ||
        daySlots.afternoon.active ||
        daySlots.evening.active;

      if (isDayActive) {
        totalActiveDays++;
        if (day === activeTab) {
          if (daySlots.morning.active)
            totalDailyHours += calculateHours(
              daySlots.morning.from,
              daySlots.morning.to,
            );
          if (daySlots.afternoon.active)
            totalDailyHours += calculateHours(
              daySlots.afternoon.from,
              daySlots.afternoon.to,
            );
          if (daySlots.evening.active)
            totalDailyHours += calculateHours(
              daySlots.evening.from,
              daySlots.evening.to,
            );
        }
      }
    });

    return { totalActiveDays, totalDailyHours: totalDailyHours.toFixed(1) };
  }, [availability, activeTab]);

  const handleContinue = () => {
    if (summary.totalActiveDays === 0) {
      Alert.alert("Required", "Please set availability for at least one day.");
      return;
    }

    // Prepare availability data for Redux
    const availabilityData = {
      days: availability,
      serviceRadius: serviceRadius,
      updatedAt: new Date().toISOString(),
    };

    // Save to Redux
    dispatch(updateAvailability(availabilityData));

    // Check if returning to review
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("fromReview") === "true" ||
      params.get("fromEdit") === "true"
    ) {
      router.back();
    } else {
      router.push("/(provider-onboarding)/reviewsubmit");
    }
  };

  const currentTimeValue = currentPicker
    ? availability[activeTab][currentPicker.slot][currentPicker.field]
    : "09:00 AM";

  const [isListening, setIsListening] = useState(false);
  const [selectedVoiceLanguages, setSelectedVoiceLanguages] = useState<
    string[]
  >([]);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);

  // Language options with translations
  const voiceLanguages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Hindi", code: "hi-IN", flag: "🇮🇳" },
    { name: "Arabic", code: "ar", flag: "🇸🇦" },
    { name: "Urdu", code: "ur", flag: "🇵🇰" },
    { name: "Bengali", code: "bn-IN", flag: "🇧🇩" },
    { name: "Tamil", code: "ta-IN", flag: "🇮🇳" },
  ];

  // Message translations
  const voiceMessages = {
    English:
      "Please select your ID type, enter your ID number, upload your ID document and optionally take a selfie.",
    Hindi:
      "कृपया अपने आईडी का प्रकार चुनें, अपना आईडी नंबर दर्ज करें, अपना आईडी दस्तावेज़ अपलोड करें और वैकल्पिक रूप से सेल्फी लें।",
    Arabic:
      "يرجى تحديد نوع الهوية الخاص بك، وإدخال رقم هويتك، وتحميل مستند الهوية الخاص بك، والتقاط صورة شخصية اختيارية.",
    Urdu: "براہ کرم اپنی شناخت کی قسم منتخب کریں، اپنا شناختی نمبر درج کریں، اپنی شناختی دستاویز اپ لوڈ کریں اور اختیاری طور پر سیلفی لیں۔",
    Bengali:
      "অনুগ্রহ করে আপনার আইডির ধরন নির্বাচন করুন, আপনার আইডি নম্বর লিখুন, আপনার আইডি ডকুমেন্ট আপলোড করুন এবং ঐচ্ছিকভাবে একটি সেলফি তুলুন।",
    Tamil:
      "உங்கள் ஐடி வகையைத் தேர்ந்தெடுக்கவும், உங்கள் ஐடி எண்ணை உள்ளிடவும், உங்கள் ஐடி ஆவணத்தைப் பதிவேற்றவும், விருப்பப்படி செல்ஃபியை எடுக்கவும்.",
  };

  // Check available voices on component mount
  useEffect(() => {
    const checkVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);

      // Check if Hindi is available
      const hindiVoices = voices.filter((v) => v.language === "hi-IN");
      if (hindiVoices.length === 0) {
        console.log("Hindi voice not available on device");
      }
    };
    checkVoices();
  }, []);

  const startVoiceAssistant = async () => {
    if (selectedVoiceLanguages.length === 0) {
      Alert.alert(
        "Select Languages",
        "Please select at least one language for voice guidance",
        [
          { text: "OK" },
          {
            text: "Select English",
            onPress: () => setSelectedVoiceLanguages(["English"]),
          },
        ],
      );
      return;
    }

    setIsListening(true);

    const speakInLanguages = async () => {
      for (const langName of selectedVoiceLanguages) {
        const langConfig = voiceLanguages.find((l) => l.name === langName);
        const message =
          voiceMessages[langName as keyof typeof voiceMessages] ||
          voiceMessages.English;

        if (langConfig) {
          try {
            await Speech.speak(message, {
              language: langConfig.code,
              rate: 0.75,
              pitch: 1.0,
            });
          } catch (error) {
            console.log(`Error speaking in ${langName}:`, error);
            // Fallback to English
            await Speech.speak(voiceMessages.English, {
              language: "en",
              rate: 0.75,
            });
          }
        }
      }
      setIsListening(false);
    };

    speakInLanguages();
  };

  const toggleVoiceLanguage = (langName: string) => {
    if (selectedVoiceLanguages.includes(langName)) {
      setSelectedVoiceLanguages(
        selectedVoiceLanguages.filter((l) => l !== langName),
      );
    } else {
      setSelectedVoiceLanguages([...selectedVoiceLanguages, langName]);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[styles.header, { backgroundColor: getProgressColor() }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>Step 7 of 7</Text>
          </View>
          <View style={styles.headerContent}>
            <View style={styles.iconCircle}>
              <Calendar color={getProgressColor()} size={28} />
            </View>
            <Text style={styles.headerTitle}>Set Your Availability</Text>
            <Text style={styles.headerSubtitle}>
              Choose your working days and time slots
            </Text>
          </View>
        </View>

        <View style={styles.cardOverlap}>
          {/* PROGRESS BAR */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { width: "100%", backgroundColor: getProgressColor() },
              ]}
            />
          </View>
          {/* Voice Guidance Section */}
          <TouchableOpacity
            onPress={startVoiceAssistant}
            style={[
              styles.voiceBar,
              {
                borderColor: primary,
                backgroundColor: isListening ? `${primary}10` : "#F9FAFB",
              },
            ]}
          >
            <Ionicons
              name={isListening ? "mic" : "mic-outline"}
              size={22}
              color={isListening ? "red" : primary}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.voiceText,
                  { color: isListening ? "red" : "#4B5563" },
                ]}
              >
                {isListening ? "Assistant Speaking..." : "🎤 Voice Guidance"}
              </Text>
              {selectedVoiceLanguages.length > 0 && !isListening && (
                <Text style={styles.selectedLangsText}>
                  {selectedVoiceLanguages
                    .map((lang) => {
                      const langObj = voiceLanguages.find(
                        (l) => l.name === lang,
                      );
                      return `${langObj?.flag || "🌐"} ${lang}`;
                    })
                    .join(" • ")}
                </Text>
              )}
            </View>
            <Ionicons
              name="volume-high"
              size={18}
              color={isListening ? "red" : "#999"}
            />
          </TouchableOpacity>

          {/* Multiple Language Selection */}
          <View style={styles.languageSection}>
            <View style={styles.languageHeader}>
              <Ionicons name="language" size={18} color={primary} />
              <Text style={styles.languageTitle}>Select Voice Languages</Text>
            </View>
            <Text style={styles.languageSubLabel}>
              Choose languages for voice guidance (multiple allowed)
            </Text>

            <View style={styles.languageGrid}>
              {voiceLanguages.map((lang) => {
                const isSelected = selectedVoiceLanguages.includes(lang.name);
                return (
                  <TouchableOpacity
                    key={lang.name}
                    onPress={() => toggleVoiceLanguage(lang.name)}
                    style={[
                      styles.langItem,
                      isSelected && {
                        borderColor: primary,
                        backgroundColor: `${primary}08`,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && {
                          backgroundColor: primary,
                          borderColor: primary,
                        },
                      ]}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.langText}>
                      {lang.flag} {lang.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedVoiceLanguages.length > 0 && (
              <TouchableOpacity
                onPress={() => setSelectedVoiceLanguages([])}
                style={styles.clearButton}
              >
                <Text style={[styles.clearText, { color: primary }]}>
                  Clear all
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text style={styles.sectionTitle}>Available Days</Text>

            {/* HORIZONTAL DAYS TAB */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.dayScroll}
            >
              {daysList.map((day) => {
                const isActive = activeTab === day;
                const dayData = availability[day];
                const hasData =
                  dayData.morning.active ||
                  dayData.afternoon.active ||
                  dayData.evening.active;

                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => setActiveTab(day)}
                    style={[
                      styles.dayTab,
                      isActive && {
                        borderColor: getProgressColor(),
                        backgroundColor: "#F0FDF4",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayTabText,
                        isActive && {
                          color: getProgressColor(),
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {day}
                    </Text>
                    {hasData && (
                      <View style={styles.dotIndicator}>
                        <CheckCircle2 size={10} color={getProgressColor()} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* TIME SLOTS SECTION */}
            <View style={styles.timeHeaderRow}>
              <Text style={styles.sectionTitle}>
                Time Slots for {activeTab}
              </Text>
              {daysList.indexOf(activeTab) > 0 && (
                <TouchableOpacity onPress={copyPreviousDay}>
                  <Text
                    style={[styles.copyText, { color: getProgressColor() }]}
                  >
                    + Same as previous
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {["morning", "afternoon", "evening"].map((slotKey) => (
              <View
                key={slotKey}
                style={[
                  styles.slotCard,
                  availability[activeTab][slotKey].active && {
                    borderColor: getProgressColor(),
                    backgroundColor: "#F9FAFB",
                    borderWidth: 2,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.slotHeader}>
                    <Text style={styles.slotLabel}>
                      {slotKey.charAt(0).toUpperCase() + slotKey.slice(1)}
                    </Text>
                    {availability[activeTab][slotKey].active && (
                      <View
                        style={[
                          styles.activeBadge,
                          { backgroundColor: getProgressColor() },
                        ]}
                      >
                        <Text style={styles.activeBadgeText}>Active</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.timeRangeBox}>
                    <TimeSelector
                      label="From"
                      value={availability[activeTab][slotKey].from}
                      onPress={() => openTimePicker(slotKey, "from")}
                      color={getProgressColor()}
                    />
                    <View style={styles.timeSeparator}>
                      <Text style={styles.timeSeparatorText}>→</Text>
                    </View>
                    <TimeSelector
                      label="To"
                      value={availability[activeTab][slotKey].to}
                      onPress={() => openTimePicker(slotKey, "to")}
                      color={getProgressColor()}
                    />
                  </View>
                </View>
                <Switch
                  value={availability[activeTab][slotKey].active}
                  onValueChange={() => toggleSlot(slotKey)}
                  trackColor={{ false: "#D1D5DB", true: getProgressColor() }}
                />
              </View>
            ))}
            {/* SCHOLAR AVAILABILITY SLOTS */}
            {/* SCHOLAR AVAILABILITY SLOT */}
            <View style={styles.radiusCard}>
              <View style={styles.radiusHeader}>
                <Text style={styles.sectionTitle}>Scholar Availability</Text>
                <View
                  style={[
                    styles.radiusBadge,
                    { backgroundColor: getProgressColor() },
                  ]}
                >
                  <Clock size={14} color="#FFF" />
                </View>
              </View>

              <View style={[styles.inputPlaceholder, { marginTop: 15 }]}>
                <TextInput
                  style={[
                    styles.placeholderText,
                    { flex: 1, color: "#374151" },
                  ]}
                  placeholder="06:00 AM - 11:00 AM / 01:00 PM - 04:00 PM"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={[styles.radiusInfo, { marginTop: 15 }]}>
                <Info size={14} color={getProgressColor()} />
                <Text
                  style={[styles.radiusInfoText, { color: getProgressColor() }]}
                >
                  Enter your custom availability timing IN THIS FROMAT
                  06:00AM,11:100AM , 01:00PM-04:00PM
                </Text>
              </View>
            </View>
            {/* SERVICE RADIUS */}
            <View style={styles.radiusCard}>
              <View style={styles.radiusHeader}>
                <Text style={styles.sectionTitle}>Service Radius</Text>
                <View
                  style={[
                    styles.radiusBadge,
                    { backgroundColor: getProgressColor() },
                  ]}
                >
                  <Text style={styles.radiusBadgeText}>{serviceRadius} km</Text>
                </View>
              </View>
              <Text style={styles.radiusSub}>
                Maximum distance you will travel
              </Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={5}
                maximumValue={50}
                step={5}
                value={serviceRadius}
                onValueChange={setServiceRadius}
                minimumTrackTintColor={getProgressColor()}
                maximumTrackTintColor="#E5E7EB"
              />
              <View style={styles.radiusLabels}>
                <Text style={styles.limitLabel}>5 km</Text>
                <Text style={styles.limitLabel}>25 km</Text>
                <Text style={styles.limitLabel}>50 km</Text>
              </View>
              <View style={styles.radiusInfo}>
                <Info size={14} color={getProgressColor()} />
                <Text
                  style={[styles.radiusInfoText, { color: getProgressColor() }]}
                >
                  Travel charges may apply for distances over 5 km
                </Text>
              </View>
            </View>

            {/* UPDATED SUMMARY BOX */}
            <View
              style={[
                styles.summaryBox,
                { backgroundColor: `${getProgressColor()}10` },
              ]}
            >
              <Clock size={20} color={getProgressColor()} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text
                  style={[styles.summaryTitle, { color: getProgressColor() }]}
                >
                  Availability Summary
                </Text>
                <View style={styles.summaryRow}>
                  <Text
                    style={[styles.summaryText, { color: getProgressColor() }]}
                  >
                    {summary.totalActiveDays} active day
                    {summary.totalActiveDays !== 1 ? "s" : ""}
                  </Text>
                  <Text
                    style={[styles.summaryDot, { color: getProgressColor() }]}
                  >
                    {" "}
                    •{" "}
                  </Text>
                  <Text
                    style={[styles.summaryText, { color: getProgressColor() }]}
                  >
                    {summary.totalDailyHours}h today
                  </Text>
                </View>
              </View>
            </View>

            {/* FLEXIBILITY TIP */}
            <View style={styles.tipBox}>
              <Lightbulb size={18} color="#3B82F6" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.tipTitle}> Flexibility Tip</Text>
                <Text style={styles.tipText}>
                  You can modify your availability anytime from your dashboard
                  More availability hours increase your booking chnaces.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleContinue}
              style={[
                styles.continueButton,
                { backgroundColor: getProgressColor() },
              ]}
            >
              <Text style={styles.continueButtonText}>
                Complete Registration
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Time Picker Modal */}
        <TimePickerModal
          visible={timePickerVisible}
          onClose={() => setTimePickerVisible(false)}
          onSelect={updateTime}
          currentTime={currentTimeValue}
          title={`Select ${currentPicker?.field === "from" ? "Start" : "End"} Time`}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.helpButton, { backgroundColor: primary }]}
          onPress={() => router.push("/booking/help")}
        >
          <Ionicons name="information-circle-outline" size={18} color="white" />
          <View>
            <Text
              style={{
                fontSize: 8,
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Get Help
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 260,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  inputPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  backButton: { position: "absolute", left: 20, top: 50, zIndex: 10 },
  stepBadge: {
    position: "absolute",
    right: 20,
    top: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  stepText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  headerContent: { alignItems: "center", marginTop: 10 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 13,
  },
  cardOverlap: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -35,
    paddingHorizontal: 20,
  },
  helpButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginVertical: 20,
    overflow: "hidden",
  },
  progressBar: { height: "100%" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  dayScroll: { marginBottom: 20 },
  dayTab: {
    width: 45,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 10,
    position: "relative",
  },
  dotIndicator: { position: "absolute", top: 4, right: 4 },
  dayTabText: { fontSize: 13, fontWeight: "600", color: "#4B5563" },
  timeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  copyText: { fontSize: 12, fontWeight: "600" },
  slotCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  slotHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  slotLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginRight: 8,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  timeRangeBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeSelector: {
    flex: 1,
  },
  timeSelectorLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },
  timeSelectorValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  timeSelectorText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },
  timeSeparator: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  timeSeparatorText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  radiusCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 10,
  },
  radiusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  radiusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  radiusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  radiusSub: { fontSize: 12, color: "#6B7280", marginBottom: 10 },
  radiusLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
  },
  limitLabel: { fontSize: 10, color: "#9CA3AF" },
  radiusInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  radiusInfoText: { fontSize: 11, marginLeft: 8 },
  summaryBox: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  summaryRow: { flexDirection: "row", alignItems: "center" },
  summaryTitle: { fontSize: 14, fontWeight: "700" },
  summaryText: { fontSize: 12, marginTop: 2, opacity: 0.9 },
  summaryDot: { fontSize: 12, marginTop: 2 },
  tipBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
  },
  tipTitle: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
  tipText: { fontSize: 12, color: "#1E40AF", marginTop: 2 },
  continueButton: {
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  continueButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  modalClose: {
    fontSize: 20,
    color: "#6B7280",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 10,
  },
  pickerList: {
    paddingVertical: 10,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: "#0d0d0d",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
  },
  pickerItemTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#131314",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  voiceBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  voiceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4B5563",
  },
  selectedLangsText: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  languageSection: {
    marginTop: 5,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  languageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  languageTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  languageSubLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    minWidth: 100,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  langText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  clearButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
