import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.username = initialState.username;
      state.role = initialState.role;
    },
  },
});

// action creator
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
