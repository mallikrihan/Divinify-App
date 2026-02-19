// // import React, { createContext, useContext, useState } from "react";

// // type OnboardingData = {
// //   personalDetails?: { name: string; email: string; phone: string };
// //   religiousAffiliation?: {
// //     scholarType: string;
// //     specialization: string;
// //     community: string;
// //   };
// //   verification?: { idType: string; selfieImage: any; certificateFile: any };
// //   services?: string[];
// //   availability?: {
// //     schedule: any;
// //     serviceRadius: number;
// //     totalActiveDays: number;
// //   };
// //   payment?: {
// //     bankName: string;
// //     accountNumber: string;
// //     ifsc: string;
// //     accountType: string;
// //     panNumber: string;
// //   };
// // };

// // type OnboardingContextType = {
// //   data: OnboardingData;
// //   updateData: (step: keyof OnboardingData, value: any) => void;
// //   resetData: () => void;
// // };

// // const OnboardingContext = createContext<OnboardingContextType | undefined>(
// //   undefined,
// // );

// // export function OnboardingProvider({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [data, setData] = useState<OnboardingData>({});

// //   const updateData = (step: keyof OnboardingData, value: any) => {
// //     setData((prev) => ({ ...prev, [step]: value }));
// //   };

// //   const resetData = () => setData({});

// //   return (
// //     <OnboardingContext.Provider value={{ data, updateData, resetData }}>
// //       {children}
// //     </OnboardingContext.Provider>
// //   );
// // }

// // export function useOnboarding() {
// //   const context = useContext(OnboardingContext);
// //   if (!context) {
// //     throw new Error("useOnboarding must be used within an OnboardingProvider");
// //   }
// //   return context;
// // }

// // const OnboardingContext = createContext<any>(null);

// // export const OnboardingProvider = ({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) => {
// //   const [formData, setFormData] = useState({
// //     personalInfo: {}, // Step 1 & 2
// //     serviceCategory: "", // Step 3
// //     businessDetails: {}, // Step 4
// //     documents: [], // Step 5
// //     pricing: {}, // Step 6
// //     availability: {}, // Step 7
// //   });

// //   const updateData = (step: string, data: any) => {
// //     setFormData((prev) => ({ ...prev, [step]: data }));
// //   };

// //   return (
// //     <OnboardingContext.Provider value={{ formData, updateData }}>
// //       {children}
// //     </OnboardingContext.Provider>
// //   );
// // };

// // export const useOnboarding = () => useContext(OnboardingContext);
// import React, { createContext, useContext, useState } from "react";

// // Define the structure for all 7 steps
// type OnboardingData = {
//   personalDetails: any; // Steps 1 & 2
//   religiousDetails: any; // Step 3 (Scholar/Community)
//   businessDetails: any; // Step 4
//   documents: any[]; // Step 5
//   pricing: any; // Step 6
//   availability: {
//     // Step 7
//     schedule: any;
//     serviceRadius: number;
//     totalActiveDays: number;
//   };
// };

// type OnboardingContextType = {
//   formData: OnboardingData;
//   updateData: (step: keyof OnboardingData, value: any) => void;
//   resetData: () => void;
// };

// const OnboardingContext = createContext<OnboardingContextType | undefined>(
//   undefined,
// );

// export function OnboardingProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [formData, setFormData] = useState<OnboardingData>({
//     personalDetails: {},
//     religiousDetails: {},
//     businessDetails: {},
//     documents: [],
//     pricing: {},
//     availability: { schedule: {}, serviceRadius: 15, totalActiveDays: 0 },
//   });

//   const updateData = (step: keyof OnboardingData, value: any) => {
//     setFormData((prev) => ({ ...prev, [step]: value }));
//   };

//   const resetData = () =>
//     setFormData({
//       personalDetails: {},
//       religiousDetails: {},
//       businessDetails: {},
//       documents: [],
//       pricing: {},
//       availability: { schedule: {}, serviceRadius: 15, totalActiveDays: 0 },
//     });

//   return (
//     <OnboardingContext.Provider value={{ formData, updateData, resetData }}>
//       {children}
//     </OnboardingContext.Provider>
//   );
// }

// export function useOnboarding() {
//   const context = useContext(OnboardingContext);
//   if (!context) {
//     throw new Error("useOnboarding must be used within an OnboardingProvider");
//   }
//   return context;
// }
// import React, { createContext, useContext, useState } from "react";

// type OnboardingData = {
//   personalDetails: any;
//   religiousDetails: any;
//   businessDetails: any;
//   documents: any[];
//   pricing: any;
//   availability: {
//     schedule: any;
//     serviceRadius: number;
//     totalActiveDays: number;
//   };
// };

// type OnboardingContextType = {
//   formData: OnboardingData;
//   updateData: (step: keyof OnboardingData, value: any) => void;
//   resetData: () => void;
// };

// const OnboardingContext = createContext<OnboardingContextType | undefined>(
//   undefined,
// );

// export function OnboardingProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [formData, setFormData] = useState<OnboardingData>({
//     personalDetails: {},
//     religiousDetails: {},
//     businessDetails: {},
//     documents: [],
//     pricing: {},
//     availability: { schedule: {}, serviceRadius: 15, totalActiveDays: 0 },
//   });

//   const updateData = (step: keyof OnboardingData, value: any) => {
//     setFormData((prev) => ({ ...prev, [step]: value }));
//   };

//   const resetData = () =>
//     setFormData({
//       personalDetails: {},
//       religiousDetails: {},
//       businessDetails: {},
//       documents: [],
//       pricing: {},
//       availability: { schedule: {}, serviceRadius: 15, totalActiveDays: 0 },
//     });

//   return (
//     <OnboardingContext.Provider value={{ formData, updateData, resetData }}>
//       {children}
//     </OnboardingContext.Provider>
//   );
// }

// export function useOnboarding() {
//   const context = useContext(OnboardingContext);
//   if (!context) {
//     throw new Error("useOnboarding must be used within an OnboardingProvider");
//   }
//   return context;
// }
import React, { createContext, useContext, useState } from "react";

type OnboardingData = {
  personalDetails: { name: string; email: string; phone: string };
  religiousDetails: {
    scholarType: string;
    specializations: string[];
    community: string;
  };
  verification: { idType: string; selfieStatus: string; certStatus: string };
  services: { name: string; price: string; duration: string }[];
  availability: {
    workingDays: string;
    workingHours: string;
    serviceRadius: number;
  };
  payment: {
    bankName: string;
    accountNo: string;
    ifsc: string;
    type: string;
    pan: string;
  };
};

type OnboardingContextType = {
  formData: OnboardingData;
  updateData: (step: keyof OnboardingData, value: any) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<any>({
    personalDetails: {},
    religiousDetails: {},
    verification: {
      idType: "Aadhaar Card",
      selfieStatus: "Completed",
      certStatus: "Uploaded",
    },
    services: [],
    availability: { workingDays: "", workingHours: "", serviceRadius: 15 },
    payment: {},
  });

  const updateData = (step: keyof OnboardingData, value: any) => {
    setFormData((prev: any) => ({ ...prev, [step]: value }));
  };

  return (
    <OnboardingContext.Provider value={{ formData, updateData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext)!;
