import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers, persistReducer } from "redux-persist";
import userSlice from "./user/userSlice";
import persistStore from "redux-persist/es/persistStore";

const commonConfig = {
  key: "shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "current", "token"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
