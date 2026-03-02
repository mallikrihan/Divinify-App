// import React from "react";
// import { View } from "react-native";
// import { useReligion } from "../contexts/ReligionContext";
// import { RELIGIONS } from "@/constants/religions";

// export const ThemeProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { religion } = useReligion();

//   const backgroundColor = religion
//     ? RELIGIONS[religion].color
//     : "#000"; // default before selection

//   return (
//     <View style={{ flex: 1, backgroundColor }}>
//       {children}
//     </View>
//   );
// };
// import { RELIGIONS } from "@/constants/religions";
// import React, { createContext, useContext, useMemo } from "react";
// import { View } from "react-native";
// import { useReligion } from "../contexts/ReligionContext";

// type Theme = {
//   primary: string;
//   background: string;
// };

// const ThemeContext = createContext<Theme | null>(null);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const { religion } = useReligion();

//   const theme = useMemo(() => {
//     return {
//       primary: RELIGIONS[religion].color,
//       background: RELIGIONS[religion].background ?? "#fff",
//     };
//   }, [religion]); // 🔑 REQUIRED

//   return (
//     <ThemeContext.Provider value={theme}>
//       <View style={{ flex: 1, backgroundColor: theme.background }}>
//         {children}
//       </View>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
//   return ctx;
// };
import { RELIGIONS } from "@/constants/religions";
import React, { createContext, useContext, useMemo } from "react";
import { View } from "react-native";
import { useReligion } from "../contexts/ReligionContext";

export type Theme = {
  primary: string;
  background: string;
  label: string;
};

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { religion } = useReligion();

  const theme = useMemo(() => {
    // Handle case when religion is null or undefined
    if (!religion) {
      return {
        primary: "#6366F1",
        background: "#F9FAFB",
        label: "Scholar",
      };
    }

    // Get the religion data, default to islam if not found
    const religionData = RELIGIONS[religion] || RELIGIONS.islam;

    return {
      primary: religionData.color,
      background: religionData.background,
      label: religionData.label,
    };
  }, [religion]);

  return (
    <ThemeContext.Provider value={theme}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
