import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import sidebarReducers from "./sidebarSlice";
import appointmentsReducers from "./appointments/appointmentsSlice";
import patientsReducers from "./patients/patientsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    sidebar: sidebarReducers,
    appointments: appointmentsReducers,
    patients: patientsReducers,
  },
});
