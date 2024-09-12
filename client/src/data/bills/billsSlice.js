import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./billsThunk";

const initialState = {
  bills: [],
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
  },
});

export default billsSlice.reducer;
