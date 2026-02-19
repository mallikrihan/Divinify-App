import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import onboardingReducer from "./onboardingSlice";

const persistConfig = {
  key: "onboarding",
  storage: AsyncStorage,
  whitelist: [
    "personalDetails",
    "religiousDetails",
    "verification",
    "certification",
    "services",
    "payment",
    "availability",
  ],
};

const persistedReducer = persistReducer(persistConfig, onboardingReducer);

export const store = configureStore({
  reducer: {
    onboarding: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
