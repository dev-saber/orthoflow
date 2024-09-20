import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./billsThunk";

const initialState = {
  bills: [],
  patientSearch: "",
  fullData: [],
  stats: {},
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.getBills.fulfilled, (state, action) => {
      state.bills = action.payload.bills;
    });

    builder.addCase(operations.getBills.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.updateBill.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.updateBill.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.deleteBill.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.deleteBill.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.createBill.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(operations.createBill.rejected, (state, action) => {
      console.log(action.error.message);
    });

    builder.addCase(operations.billsStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });

    builder.addCase(operations.billsStats.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },

  reducers: {
    searchPatient: (state, action) => {
      state.patientSearch = action.payload.toLowerCase();

      const fullData = state.fullData.length ? state.fullData : state.bills;

      if (state.patientSearch) {
        state.bills = fullData.filter((bill) => {
          return (
            bill.patient &&
            (bill.patient.first_name
              .toLowerCase()
              .startsWith(state.patientSearch) ||
              bill.patient.last_name
                .toLowerCase()
                .startsWith(state.patientSearch))
          );
        });
      } else {
        state.bills = fullData;
      }

      if (!state.fullData.length) {
        state.fullData = fullData;
      }
    },
  },
});

export const { searchPatient } = billsSlice.actions;
export default billsSlice.reducer;
