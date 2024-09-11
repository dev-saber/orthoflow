import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./authThunk";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.register.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(operations.login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    });

    builder.addCase(operations.login.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.register.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.userInfo.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(operations.userInfo.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.updateUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(operations.updateUserInfo.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default authSlice.reducer;
