import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./appointmentsThunk";

const initialState = {
  appointments: [],
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
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      state.appointments[index] = action.payload;
    });

    builder.addCase(operations.updateAppointment.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.deleteAppointment.fulfilled, (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload.id
      );
    });

    builder.addCase(operations.deleteAppointment.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default appointmentsSlice.reducer;
