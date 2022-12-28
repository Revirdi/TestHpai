import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: 0,
  name: "",
  roles: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user_id = initialState.user_id;
      state.name = initialState.name;
      state.roles = initialState.roles;
      state.accessToken = initialState.accessToken;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
