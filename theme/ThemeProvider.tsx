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
import { RELIGIONS } from "@/constants/religions";
import React, { createContext, useContext, useMemo } from "react";
import { View } from "react-native";
import { useReligion } from "../contexts/ReligionContext";

type Theme = {
  primary: string;
  background: string;
};

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { religion } = useReligion();

  const theme = useMemo(() => {
    return {
      primary: RELIGIONS[religion].color,
      background: RELIGIONS[religion].background ?? "#fff",
    };
  }, [religion]); // 🔑 REQUIRED

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
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};
