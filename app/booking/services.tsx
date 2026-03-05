// import { useReligion } from "@/contexts/ReligionContext";
// import { updateServices } from "@/store/onboardingSlice";
// import { RootState } from "@/store/store";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// export default function MyServices() {
//   const dispatch = useDispatch();
//   const { religion } = useReligion();

//   /**
//    * UPDATED RELIGION THEME LOGIC
//    * Maps religion to a specific primary color
//    */
//   const themeColor = useMemo(() => {
//     const r = religion?.toLowerCase();
//     if (r === "islam") return "#0E9F6E"; // Emerald Green
//     if (r === "Hinduism" || r === "Hindu") return "#F59E0B"; // Orange
//     if (r === "christianity") return "#3B82F6"; // Blue
//     if (r === "sikhism") return "#EAB308"; // Gold/Yellow
//     return "#6366F1"; // Default Indigo fallback
//   }, [religion]);

//   const savedServices = useSelector(
//     (state: RootState) => (state as any).onboarding.services.services || [],
//   );
//   const [services, setServices] = useState(savedServices);

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => ["68%"], []);

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     duration: "",
//     price: "",
//   });

//   const stats = useMemo(() => {
//     const activeServices = services.filter((s: any) => s.isActive !== false);
//     const totalMinutes = activeServices.reduce((acc: number, s: any) => {
//       const val = parseInt(s.duration) || 0;
//       const isHour =
//         s.duration.toLowerCase().includes("hour") ||
//         s.duration.toLowerCase().includes("hr");
//       return acc + (isHour ? val * 60 : val);
//     }, 0);

//     return {
//       activeCount: activeServices.length,
//       avgDuration:
//         activeServices.length > 0
//           ? Math.round(totalMinutes / activeServices.length)
//           : 0,
//     };
//   }, [services]);

//   const toggleService = (index: number) => {
//     const updated = [...services];
//     updated[index] = { ...updated[index], isActive: !updated[index].isActive };
//     setServices(updated);
//     syncToRedux(updated);
//   };

//   const openEditSheet = (index: number) => {
//     const service = services[index];
//     setFormData({
//       name: service.name,
//       description: service.description || "",
//       duration: service.duration,
//       price: String(service.price),
//     });
//     setEditingIndex(index);
//     setIsEditMode(true);
//     bottomSheetModalRef.current?.present();
//   };

//   const openCreateSheet = () => {
//     setFormData({ name: "", description: "", duration: "", price: "" });
//     setIsEditMode(false);
//     setEditingIndex(null);
//     bottomSheetModalRef.current?.present();
//   };

//   const handleSave = () => {
//     if (!formData.name.trim() || !formData.price.trim()) {
//       Alert.alert("Required", "Service name and price are required.");
//       return;
//     }

//     let updatedList = [...services];

//     if (isEditMode && editingIndex !== null) {
//       updatedList[editingIndex] = {
//         ...updatedList[editingIndex],
//         ...formData,
//         price: formData.price,
//       };
//     } else {
//       const newItem = {
//         ...formData,
//         isActive: true,
//         bookings: 0,
//         id: Date.now().toString(),
//       };
//       updatedList.push(newItem);
//     }

//     setServices(updatedList);
//     syncToRedux(updatedList);
//     bottomSheetModalRef.current?.dismiss();
//   };

//   const syncToRedux = (newList: any[]) => {
//     dispatch(
//       updateServices({
//         services: newList,
//         updatedAt: new Date().toISOString(),
//       }),
//     );
//   };

//   return (
//     <BottomSheetModalProvider>
//       <View style={styles.container}>
//         <View style={[styles.header, { backgroundColor: themeColor }]}>
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               onPress={() => {
//                 /* router.back() */
//               }}
//               hitSlop={12}
//             >
//               <Ionicons name="chevron-back" size={28} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.screenTitle}>My Services</Text>
//           </View>

//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{stats.activeCount}</Text>
//               <Text style={styles.statLabel}>Active</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>{stats.avgDuration}m</Text>
//               <Text style={styles.statLabel}>Avg Time</Text>
//             </View>
//           </View>
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {services.map((service: any, index: number) => (
//             <View key={service.id || index} style={styles.serviceCard}>
//               <View style={styles.cardHeader}>
//                 <View style={styles.serviceInfo}>
//                   <Text style={styles.serviceName}>{service.name}</Text>
//                   <Text style={styles.serviceMeta}>
//                     {service.duration} • ₹{service.price}
//                   </Text>
//                 </View>
//                 <Switch
//                   value={service.isActive !== false}
//                   onValueChange={() => toggleService(index)}
//                   trackColor={{ false: "#D1D5DB", true: themeColor + "80" }}
//                   thumbColor={
//                     service.isActive !== false ? themeColor : "#f4f3f4"
//                   }
//                 />
//               </View>

//               {service.description ? (
//                 <Text style={styles.serviceDescription}>
//                   {service.description}
//                 </Text>
//               ) : null}

//               <View style={styles.cardFooter}>
//                 <Text style={[styles.bookingCount, { color: themeColor }]}>
//                   {service.bookings || 0} bookings
//                 </Text>
//                 <TouchableOpacity onPress={() => openEditSheet(index)}>
//                   <Text style={[styles.editButtonText, { color: themeColor }]}>
//                     Edit
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}

//           <TouchableOpacity
//             style={[
//               styles.addNewCard,
//               { borderColor: themeColor, backgroundColor: themeColor + "08" },
//             ]}
//             onPress={openCreateSheet}
//           >
//             <View
//               style={[
//                 styles.addIconCircle,
//                 { backgroundColor: themeColor + "15" },
//               ]}
//             >
//               <Ionicons name="add" size={32} color={themeColor} />
//             </View>
//             <Text style={[styles.addNewTitle, { color: themeColor }]}>
//               Add New Service
//             </Text>
//           </TouchableOpacity>

//           <View style={{ height: 100 }} />
//         </ScrollView>

//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={0}
//           snapPoints={snapPoints}
//           backgroundStyle={styles.sheetBackground}
//           handleIndicatorStyle={{ backgroundColor: themeColor + "40" }}
//         >
//           <BottomSheetView style={styles.sheetContent}>
//             <Text style={styles.sheetTitle}>
//               {isEditMode ? "Edit Service" : "Create Service"}
//             </Text>

//             <TextInput
//               style={[styles.input, { borderColor: "#E5E7EB" }]}
//               placeholder="Service Name *"
//               value={formData.name}
//               onChangeText={(t) => setFormData({ ...formData, name: t })}
//             />

//             <TextInput
//               style={[
//                 styles.input,
//                 styles.textArea,
//                 { borderColor: "#E5E7EB" },
//               ]}
//               placeholder="Description"
//               multiline
//               value={formData.description}
//               onChangeText={(t) => setFormData({ ...formData, description: t })}
//             />

//             <View style={styles.rowInputs}>
//               <TextInput
//                 style={[
//                   styles.input,
//                   styles.halfInput,
//                   { borderColor: "#E5E7EB" },
//                 ]}
//                 placeholder="Duration (e.g. 30m)"
//                 value={formData.duration}
//                 onChangeText={(t) => setFormData({ ...formData, duration: t })}
//               />
//               <TextInput
//                 style={[
//                   styles.input,
//                   styles.halfInput,
//                   { borderColor: "#E5E7EB" },
//                 ]}
//                 placeholder="Price (₹) *"
//                 keyboardType="numeric"
//                 value={formData.price}
//                 onChangeText={(t) => setFormData({ ...formData, price: t })}
//               />
//             </View>

//             <TouchableOpacity
//               style={[styles.primaryButton, { backgroundColor: themeColor }]}
//               onPress={handleSave}
//             >
//               <Text style={styles.primaryButtonText}>
//                 {isEditMode ? "Save Changes" : "Add Service"}
//               </Text>
//             </TouchableOpacity>
//           </BottomSheetView>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   );
// }
import { useReligion } from "@/contexts/ReligionContext";
import { updateServices } from "@/store/onboardingSlice";
import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MyServices() {
  const dispatch = useDispatch();
  const { religion } = useReligion();

  /**
   * UPDATED RELIGION THEME LOGIC
   * Maps religion to a specific primary color
   */
  const themeColor = useMemo(() => {
    const r = religion?.toLowerCase();
    if (r === "islam") return "#0E9F6E"; // Emerald Green
    if (r === "Hinduism" || r === "Hindu") return "#F59E0B"; // Orange
    if (r === "christianity") return "#3B82F6"; // Blue
    if (r === "sikhism") return "#EAB308"; // Gold/Yellow
    if (r === "buddhism") return "#8B5CF6"; // Purple
    if (r === "jainism") return "#10B981"; // Teal
    if (r === "judaism") return "#2563EB"; // Royal Blue
    return "#6366F1"; // Default Indigo fallback
  }, [religion]);

  /**
   * Get secondary/light theme color based on religion
   */
  const themeColorLight = useMemo(() => {
    const r = religion?.toLowerCase();
    if (r === "islam") return "#E8F5E9"; // Light Emerald Green
    if (r === "Hinduism" || r === "Hindu") return "#FEF3C7"; // Light Orange
    if (r === "christianity") return "#DBEAFE"; // Light Blue
    if (r === "sikhism") return "#FEF9C3"; // Light Gold/Yellow
    if (r === "buddhism") return "#F3E8FF"; // Light Purple
    if (r === "jainism") return "#D1FAE5"; // Light Teal
    if (r === "judaism") return "#DBEAFE"; // Light Royal Blue
    return "#EEF2FF"; // Default Indigo light fallback
  }, [religion]);

  /**
   * Get gradient colors or complementary colors based on religion
   */
  const themeGradientColors = useMemo(() => {
    const r = religion?.toLowerCase();
    if (r === "islam") return ["#0E9F6E", "#059669"]; // Emerald to Green
    if (r === "Hinduism" || r === "Hindu") return ["#F59E0B", "#D97706"]; // Orange to Amber
    if (r === "christianity") return ["#3B82F6", "#2563EB"]; // Blue to Royal Blue
    if (r === "sikhism") return ["#EAB308", "#CA8A04"]; // Gold to Yellow
    if (r === "buddhism") return ["#8B5CF6", "#7C3AED"]; // Purple to Violet
    if (r === "jainism") return ["#10B981", "#059669"]; // Teal to Emerald
    if (r === "judaism") return ["#2563EB", "#1D4ED8"]; // Royal Blue to Darker Blue
    return ["#6366F1", "#4F46E5"]; // Default Indigo gradient fallback
  }, [religion]);

  const savedServices = useSelector(
    (state: RootState) => (state as any).onboarding.services.services || [],
  );
  const [services, setServices] = useState(savedServices);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["68%"], []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
  });

  const stats = useMemo(() => {
    const activeServices = services.filter((s: any) => s.isActive !== false);
    const totalMinutes = activeServices.reduce((acc: number, s: any) => {
      const val = parseInt(s.duration) || 0;
      const isHour =
        s.duration.toLowerCase().includes("hour") ||
        s.duration.toLowerCase().includes("hr");
      return acc + (isHour ? val * 60 : val);
    }, 0);

    return {
      activeCount: activeServices.length,
      avgDuration:
        activeServices.length > 0
          ? Math.round(totalMinutes / activeServices.length)
          : 0,
    };
  }, [services]);

  const toggleService = (index: number) => {
    const updated = [...services];
    updated[index] = { ...updated[index], isActive: !updated[index].isActive };
    setServices(updated);
    syncToRedux(updated);
  };

  const openEditSheet = (index: number) => {
    const service = services[index];
    setFormData({
      name: service.name,
      description: service.description || "",
      duration: service.duration,
      price: String(service.price),
    });
    setEditingIndex(index);
    setIsEditMode(true);
    bottomSheetModalRef.current?.present();
  };

  const openCreateSheet = () => {
    setFormData({ name: "", description: "", duration: "", price: "" });
    setIsEditMode(false);
    setEditingIndex(null);
    bottomSheetModalRef.current?.present();
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.price.trim()) {
      Alert.alert("Required", "Service name and price are required.");
      return;
    }

    let updatedList = [...services];

    if (isEditMode && editingIndex !== null) {
      updatedList[editingIndex] = {
        ...updatedList[editingIndex],
        ...formData,
        price: formData.price,
      };
    } else {
      const newItem = {
        ...formData,
        isActive: true,
        bookings: 0,
        id: Date.now().toString(),
      };
      updatedList.push(newItem);
    }

    setServices(updatedList);
    syncToRedux(updatedList);
    bottomSheetModalRef.current?.dismiss();
  };

  const syncToRedux = (newList: any[]) => {
    dispatch(
      updateServices({
        services: newList,
        updatedAt: new Date().toISOString(),
      }),
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => {
                /* router.back() */
              }}
              hitSlop={12}
            >
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>My Services</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.activeCount}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.avgDuration}m</Text>
              <Text style={styles.statLabel}>Avg Time</Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {services.map((service: any, index: number) => (
            <View key={service.id || index} style={styles.serviceCard}>
              <View style={styles.cardHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>
                    {service.duration} • ₹{service.price}
                  </Text>
                </View>
                <Switch
                  value={service.isActive !== false}
                  onValueChange={() => toggleService(index)}
                  trackColor={{ false: "#D1D5DB", true: themeColor + "80" }}
                  thumbColor={
                    service.isActive !== false ? themeColor : "#f4f3f4"
                  }
                />
              </View>

              {service.description ? (
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              ) : null}

              <View style={styles.cardFooter}>
                <Text style={[styles.bookingCount, { color: themeColor }]}>
                  {service.bookings || 0} bookings
                </Text>
                <TouchableOpacity onPress={() => openEditSheet(index)}>
                  <Text style={[styles.editButtonText, { color: themeColor }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.addNewCard,
              { borderColor: themeColor, backgroundColor: themeColorLight },
            ]}
            onPress={openCreateSheet}
          >
            <View
              style={[
                styles.addIconCircle,
                { backgroundColor: themeColor + "15" },
              ]}
            >
              <Ionicons name="add" size={32} color={themeColor} />
            </View>
            <Text style={[styles.addNewTitle, { color: themeColor }]}>
              Add New Service
            </Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={{ backgroundColor: themeColor + "40" }}
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>
              {isEditMode ? "Edit Service" : "Create Service"}
            </Text>

            <TextInput
              style={[styles.input, { borderColor: "#E5E7EB" }]}
              placeholder="Service Name *"
              value={formData.name}
              onChangeText={(t) => setFormData({ ...formData, name: t })}
            />

            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { borderColor: "#E5E7EB" },
              ]}
              placeholder="Description"
              multiline
              value={formData.description}
              onChangeText={(t) => setFormData({ ...formData, description: t })}
            />

            <View style={styles.rowInputs}>
              <TextInput
                style={[
                  styles.input,
                  styles.halfInput,
                  { borderColor: "#E5E7EB" },
                ]}
                placeholder="Duration (e.g. 30m)"
                value={formData.duration}
                onChangeText={(t) => setFormData({ ...formData, duration: t })}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.halfInput,
                  { borderColor: "#E5E7EB" },
                ]}
                placeholder="Price (₹) *"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(t) => setFormData({ ...formData, price: t })}
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: themeColor }]}
              onPress={handleSave}
            >
              <Text style={styles.primaryButtonText}>
                {isEditMode ? "Save Changes" : "Add Service"}
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

// Note: You'll need to add these styles to your existing StyleSheet
// Add these to your existing styles object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 8,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  serviceMeta: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
    paddingRight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  bookingCount: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  addNewCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    marginTop: 8,
    marginBottom: 16,
  },
  addIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  addNewTitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  sheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 20,
  },
  sheetContent: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
    color: "#1F2937",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  halfInput: {
    flex: 0.48,
    marginBottom: 0,
  },
  primaryButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
