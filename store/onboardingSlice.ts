import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  customPrice?: boolean;
}

// Add these new interfaces for the enhanced data structures
export interface ServiceDetails {
  services: {
    name: string;
    description: string;
    duration: string;
    price: number;
    customizedPricing?: boolean;
    travelCharges?: number;
    additionalNotes?: string;
    category?: string;
  }[];
  travelAllowed?: boolean;
  onlineAllowed?: boolean;
  updatedAt?: string;
}

export interface PaymentDetails {
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  accountType: string;
  termsAccepted: boolean;
  verified?: boolean;
  updatedAt?: string;
}

export interface Availability {
  days: {
    [key: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
      customSlots?: { start: string; end: string }[];
    };
  };
  serviceRadius: number;
}

export interface OnboardingState {
  currentStep: number;
  isSubmitting: boolean;
  lastSaved: string | null;

  createaccount: {
    community: string;
  };

  personalDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
    community: string;
    city: string;
    state: string;
    zip: string;
  };

  religiousDetails: {
    scholarType: string;
    specialization: string;
    languages: string[];
    yearsOfExperience: string;
  };

  verification: {
    idType: "passport" | "nationalId" | "drivingLicense" | null;
    idNumber: string;
    documentImage: string | null;
    selfieImage: string | null;
    verificationStatus: "pending" | "verified" | "rejected";
  };

  certification: {
    certificates: {
      id: string;
      name: string;
      file: string;
      issueDate: string;
      expiryDate?: string;
    }[];
    referenceType: string;
    institutionName: string;
    referencePerson: string;
    referencePhone: string;
    referenceEmail: string;
    referenceLetter: string | null;
  };

  services: Service[] | ServiceDetails | null; // Allow both types for backward compatibility

  payment: PaymentDetails | null; // Changed to match PaymentDetails interface

  availability: Availability;

  termsAccepted: boolean;
  submissionId?: string;
}

const initialState: OnboardingState = {
  currentStep: 1,
  isSubmitting: false,
  lastSaved: null,

  createaccount: {
    community: "",
  },

  personalDetails: {
    name: "",
    phone: "",
    email: "",
    address: "",
    community: "",
    city: "",
    state: "",
    zip: "",
  },

  religiousDetails: {
    scholarType: "",
    specialization: "",
    languages: [],
    yearsOfExperience: "",
  },

  verification: {
    idType: null,
    idNumber: "",
    documentImage: null,
    selfieImage: null,
    verificationStatus: "pending",
  },

  certification: {
    certificates: [],
    referenceType: "",
    institutionName: "",
    referencePerson: "",
    referencePhone: "",
    referenceEmail: "",
    referenceLetter: null,
  },

  services: [], // Initialize as empty array

  payment: null, // Initialize as null to match PaymentDetails | null

  availability: {
    days: {
      Mon: { morning: false, afternoon: false, evening: false },
      Tue: { morning: false, afternoon: false, evening: false },
      Wed: { morning: false, afternoon: false, evening: false },
      Thu: { morning: false, afternoon: false, evening: false },
      Fri: { morning: false, afternoon: false, evening: false },
      Sat: { morning: false, afternoon: false, evening: false },
      Sun: { morning: false, afternoon: false, evening: false },
    },
    serviceRadius: 10,
  },

  termsAccepted: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    updatePersonalDetails: (
      state,
      action: PayloadAction<Partial<OnboardingState["personalDetails"]>>,
    ) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },

    updateReligiousDetails: (
      state,
      action: PayloadAction<Partial<OnboardingState["religiousDetails"]>>,
    ) => {
      state.religiousDetails = { ...state.religiousDetails, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },

    updateVerification: (
      state,
      action: PayloadAction<Partial<OnboardingState["verification"]>>,
    ) => {
      state.verification = { ...state.verification, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },

    addCertificate: (
      state,
      action: PayloadAction<
        OnboardingState["certification"]["certificates"][0]
      >,
    ) => {
      state.certification.certificates.push(action.payload);
      state.lastSaved = new Date().toISOString();
    },

    removeCertificate: (state, action: PayloadAction<string>) => {
      state.certification.certificates =
        state.certification.certificates.filter(
          (cert) => cert.id !== action.payload,
        );
      state.lastSaved = new Date().toISOString();
    },

    updateCertification: (
      state,
      action: PayloadAction<Partial<OnboardingState["certification"]>>,
    ) => {
      state.certification = { ...state.certification, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },

    // Update services with enhanced ServiceDetails type
    updateServices: (
      state,
      action: PayloadAction<Service[] | ServiceDetails>,
    ) => {
      state.services = action.payload;
      state.lastSaved = new Date().toISOString();
    },

    addService: (state, action: PayloadAction<Service>) => {
      // Only allow adding to array type
      if (Array.isArray(state.services)) {
        state.services.push(action.payload);
      } else {
        // Convert to array if it's not already
        state.services = [action.payload];
      }
      state.lastSaved = new Date().toISOString();
    },

    removeService: (state, action: PayloadAction<string>) => {
      // Only allow removal from array type
      if (Array.isArray(state.services)) {
        state.services = state.services.filter((s) => s.id !== action.payload);
      }
      state.lastSaved = new Date().toISOString();
    },

    updateService: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Service> }>,
    ) => {
      // Only allow update on array type
      if (Array.isArray(state.services)) {
        const index = state.services.findIndex(
          (s) => s.id === action.payload.id,
        );
        if (index !== -1) {
          state.services[index] = {
            ...state.services[index],
            ...action.payload.updates,
          };
        }
      }
      state.lastSaved = new Date().toISOString();
    },

    // Update payment with enhanced PaymentDetails type
    updatePayment: (state, action: PayloadAction<PaymentDetails>) => {
      state.payment = action.payload;
      state.lastSaved = new Date().toISOString();
    },

    updateAvailability: (
      state,
      action: PayloadAction<Partial<OnboardingState["availability"]>>,
    ) => {
      state.availability = { ...state.availability, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },

    updateDayAvailability: (
      state,
      action: PayloadAction<{
        day: string;
        slots: Partial<OnboardingState["availability"]["days"][string]>;
      }>,
    ) => {
      if (state.availability.days[action.payload.day]) {
        state.availability.days[action.payload.day] = {
          ...state.availability.days[action.payload.day],
          ...action.payload.slots,
        };
      }
      state.lastSaved = new Date().toISOString();
    },

    setTermsAccepted: (state, action: PayloadAction<boolean>) => {
      state.termsAccepted = action.payload;
    },

    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },

    resetOnboarding: () => initialState,

    loadDraft: (state, action: PayloadAction<OnboardingState>) => {
      return action.payload;
    },

    // Add new action for createaccount if needed
    updateCreateAccount: (
      state,
      action: PayloadAction<Partial<{ community: string }>>,
    ) => {
      state.createaccount = { ...state.createaccount, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalDetails,
  updateReligiousDetails,
  updateVerification,
  addCertificate,
  removeCertificate,
  updateCertification,
  updateServices,
  addService,
  removeService,
  updateService,
  updatePayment,
  updateAvailability,
  updateDayAvailability,
  setTermsAccepted,
  setIsSubmitting,
  resetOnboarding,
  loadDraft,
  updateCreateAccount,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
