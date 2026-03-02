// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider } from "react-redux";

// import { OnboardingProvider } from "@/contexts/OnboardingContext";
// import { store } from "@/store";
// import { ReligionProvider } from "../contexts/ReligionContext";
// import { UserProvider } from "../contexts/Usercontext";
// import { ThemeProvider } from "../theme/ThemeProvider";

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <UserProvider>
//           <ReligionProvider>
//             <ThemeProvider>
//               <OnboardingProvider>
//                 <Provider store={store}>
//                   <Stack screenOptions={{ headerShown: false }} />
//                 </Provider>
//               </OnboardingProvider>
//             </ThemeProvider>
//           </ReligionProvider>
//         </UserProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ReligionProvider } from "../contexts/ReligionContext";
import { UserProvider } from "../contexts/Usercontext";
import { ThemeProvider } from "../theme/ThemeProvider"; // ✅ Correct path - pointing to theme folder

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <UserProvider>
            <ReligionProvider>
              <ThemeProvider>
                <OnboardingProvider>
                  <Provider store={store}>
                    <Stack screenOptions={{ headerShown: false }} />
                  </Provider>
                </OnboardingProvider>
              </ThemeProvider>
            </ReligionProvider>
          </UserProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
