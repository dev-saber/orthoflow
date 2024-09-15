import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./medicalsThunk";

const initialState = {
  medicalHistories: [],
  filteredMedics: [],
};

const medicalsSlice = createSlice({
  name: "medicalHistories",
  initialState,
  reducers: {
    filterMedics: (state, action) => {
      state.filteredMedics = state.medicalHistories.filter((medic) => {
        return medic.patient_id == action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      operations.getMedicalHistories.fulfilled,
      (state, action) => {
        state.medicalHistories = action.payload.data;
      }
    );

    builder.addCase(
      operations.getMedicalHistories.rejected,
      (state, action) => {
        console.log(action.error.message);
      }
    );
  },
});

export const { filterMedics } = medicalsSlice.actions;
export default medicalsSlice.reducer;
