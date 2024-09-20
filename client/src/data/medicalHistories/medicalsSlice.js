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
      state.filteredMedics = state.medicalHistories
        .filter((medic) => {
          return medic.id == action.payload;
        })
        .flatMap((medic) => medic.medical_histories); // flatMap is used to prevent nested arrays
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

    builder.addCase(
      operations.updateMedicalHistory.fulfilled,
      (state, action) => {
        const updatedMedicalHistory = action.payload;
        const index = state.filteredMedics.findIndex(
          (medic) => medic.id == updatedMedicalHistory.id
        );
        if (index !== -1) {
          state.filteredMedics[index] = updatedMedicalHistory;
        }
      }
    );

    builder.addCase(
      operations.updateMedicalHistory.rejected,
      (state, action) => {
        console.log(action.error.message);
      }
    );

    builder.addCase(
      operations.deleteMedicalHistory.fulfilled,
      (state, action) => {
        const deletedMedicalHistory = action.payload;
        state.filteredMedics = state.filteredMedics.filter(
          (medic) => medic.id != deletedMedicalHistory.id
        );
      }
    );

    builder.addCase(
      operations.deleteMedicalHistory.rejected,
      (state, action) => {
        console.log(action.error.message);
      }
    );
  },
});

export const { filterMedics } = medicalsSlice.actions;
export default medicalsSlice.reducer;
