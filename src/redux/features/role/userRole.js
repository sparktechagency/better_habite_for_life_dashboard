import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "admin",
  isLoading: false,
  error: null,
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    getUserRole: (state) => {
      return state.role;
    },
  },
});

export const { setUserRole, getUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
