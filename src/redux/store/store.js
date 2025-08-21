import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Import your slices here
import chatSlice from "../features/chat/chatSlice";
import currentUserSlice from "../features/currentUser/currentuserSlice";
import userRoleSlice from "../features/role/userRole";

// Root reducer
const rootReducer = combineReducers({
  chat: chatSlice,
  currentUser: currentUserSlice,
  userRole: userRoleSlice,
  // project: projectSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chat", "currentUser", "userRole"], // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Export store types for use in components
export const getState = store.getState;
export const dispatch = store.dispatch;
