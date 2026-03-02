// import { configureStore } from "@reduxjs/toolkit";
// import onboardingReducer from "./onboardingSlice";

// export const store = configureStore({
//   reducer: {
//     onboarding: onboardingReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboardingSlice";
import scholarReducer from "./scholarSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    scholar: scholarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
