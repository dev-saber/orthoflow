import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth/authSlice";
import sidebarReducers from "./sidebarSlice";
import appointmentsReducers from "./appointments/appointmentsSlice";
import patientsReducers from "./patients/patientsSlice";
import stockReducers from "./stock/stockSlice";
import billsReducers from "./bills/billsSlice";
import medicalsReducers from "./medicalHistories/medicalsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    sidebar: sidebarReducers,
    appointments: appointmentsReducers,
    patients: patientsReducers,
    stock: stockReducers,
    bills: billsReducers,
    medicals: medicalsReducers,
  },
});
