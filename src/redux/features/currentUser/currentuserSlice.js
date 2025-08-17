import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: 1,
    name: "Current User",
    email: "user@example.com",
    type: "client", // or "freelancer"
    avatar: "👤",
    isOnline: true,
  },
  isLoading: false,
  error: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserType: (state, action) => {
      if (state.currentUser) {
        state.currentUser.type = action.payload;
      }
    },
    updateUserInfo: (state, action) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
        };
      }
    },
    setOnlineStatus: (state, action) => {
      if (state.currentUser) {
        state.currentUser.isOnline = action.payload;
      }
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentUser,
  updateUserType,
  updateUserInfo,
  setOnlineStatus,
  clearCurrentUser,
  setLoading,
  setError,
  clearError,
} = currentUserSlice.actions;

// Selector for getting current user
export const getCurrentUser = (state) => state.currentUser.currentUser;

export default currentUserSlice.reducer;
