import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authThunk";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(login.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default authSlice.reducer;
