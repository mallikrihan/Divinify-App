// import React, { createContext, useContext, useState } from "react";
// import { ReligionType } from "@/constants/religions";

// type ReligionContextType = {
//   religion: ReligionType | null;
//   setReligion: (religion: ReligionType) => void;
// };

// const ReligionContext = createContext<ReligionContextType | undefined>(
//   undefined
// );

// export const ReligionProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [religion, setReligion] = useState<ReligionType | null>(null);

//   return (
//     <ReligionContext.Provider value={{ religion, setReligion }}>
//       {children}
//     </ReligionContext.Provider>
//   );
// };

// export const useReligion = () => {
//   const context = useContext(ReligionContext);
//   if (!context) {
//     throw new Error("useReligion must be used within ReligionProvider");
//   }
//   return context;
// };

import { createContext, useContext, useState } from "react";

export type Religion = "islam" | "hinduism" | "christianity";

const ReligionContext = createContext<{
  religion: Religion;
  setReligion: (r: Religion) => void;
} | null>(null);

export const ReligionProvider = ({ children }: any) => {
  const [religion, setReligion] = useState<Religion>("islam");
  return (
    <ReligionContext.Provider value={{ religion, setReligion }}>
      {children}
    </ReligionContext.Provider>
  );
};

export const useReligion = () => {
  const ctx = useContext(ReligionContext);
  if (!ctx) throw new Error("ReligionProvider missing");
  return ctx;
};
