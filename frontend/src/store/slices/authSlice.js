import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: 0,
  name: "",
  roles: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.user_id = initialState.user_id;
      state.name = initialState.name;
      state.roles = initialState.roles;
    },
  },
});

// action creator
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
