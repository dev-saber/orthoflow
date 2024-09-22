import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./patientsThunk";

const initialState = {
  patients: [],
  search: "",
  fullData: [], // used for filtering purposes
  patientIDSearch: {}
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

    builder.addCase(operations.addPatient.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.addPatient.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.updatePatient.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.updatePatient.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.deletePatient.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.deletePatient.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },

  reducers: {
    search: (state, action) => {
      state.search = action.payload.toLowerCase();

      const fullData = state.fullData.length ? state.fullData : state.patients;

      if (state.search) {
        state.patients = fullData.filter((patient) => {
          return (
            patient &&
            (patient.first_name.toLowerCase().startsWith(state.search) ||
              patient.last_name.toLowerCase().startsWith(state.search))
          );
        });
      } else {
        state.patients = fullData;
      }

      if (!state.fullData.length) {
        state.fullData = fullData;
      }
    },
    getPatient: (state, action) => {
      state.patientIDSearch = state.patients.find((user) => {
        return user.id == action.payload;
      });
    },
  },
});

export const { search, getPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
