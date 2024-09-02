import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import sidebarReducers from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    sidebar: sidebarReducers,
  },
});
