import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScholarProfile {
  name: string;
  email: string;
  phone: string;
  religion: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  languages: string[];
  scholarType: string;
}

interface ScholarState {
  profile: ScholarProfile | null;
  isLoggedIn: boolean;
}

const initialState: ScholarState = {
  profile: null,
  isLoggedIn: false,
};

const scholarSlice = createSlice({
  name: "scholar",
  initialState,
  reducers: {
    setScholarProfile: (state, action: PayloadAction<ScholarProfile>) => {
      state.profile = action.payload;
      state.isLoggedIn = true;
    },

    logoutScholar: (state) => {
      state.profile = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setScholarProfile, logoutScholar } = scholarSlice.actions;

export default scholarSlice.reducer;
