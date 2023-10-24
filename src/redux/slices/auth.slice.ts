import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResponseAuthType = {
  isAuthenticated: boolean;
};

const initialState: ResponseAuthType = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoginSuccess: (state: ResponseAuthType) => {
      state.isAuthenticated = true;
    },
    setLogoutSuccess: (state: ResponseAuthType) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setLoginSuccess, setLogoutSuccess } = authSlice.actions;

export default authSlice.reducer;
