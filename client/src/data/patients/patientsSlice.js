import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./patientsThunk";

const initialState = {
  patients: [],
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.getPatients.fulfilled, (state, action) => {
      state.patients = action.payload.patients;
    });

    builder.addCase(operations.getPatients.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default patientsSlice.reducer;