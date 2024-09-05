import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./appointmentsThunk";

const initialState = {
  appointments: [],
  patientSearch: "",
  originalAppointments: [], // used for filtering purposes
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.getAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload.appointments;
    });

    builder.addCase(operations.getAppointments.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.createAppointment.fulfilled, (state, action) => {
      state.appointments.push(action.payload);
    });

    builder.addCase(operations.createAppointment.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.updateAppointment.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.updateAppointment.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.deleteAppointment.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.deleteAppointment.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
  reducers: {
    setPatientSearch: (state, action) => {
      state.patientSearch = action.payload.toLowerCase();

      const originalAppointments = state.originalAppointments.length
        ? state.originalAppointments
        : state.appointments;

      if (state.patientSearch) {
        state.appointments = originalAppointments.filter((appointment) => {
          return (
            appointment.patient &&
            (appointment.patient.first_name
              .toLowerCase()
              .startsWith(state.patientSearch) ||
              appointment.patient.last_name
                .toLowerCase()
                .startsWith(state.patientSearch))
          );
        });
      } else {
        state.appointments = originalAppointments; // reset to original list
      }

      if (!state.originalAppointments.length) {
        state.originalAppointments = originalAppointments;
      }
    },
  },
});

export const { setPatientSearch } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
