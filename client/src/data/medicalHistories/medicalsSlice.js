import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./medicalsThunk";

const initialState = {
  medicalHistories: [],
};

const medicalsSlice = createSlice({
  name: "medicalHistories",
  initialState,
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

export default medicalsSlice.reducer;
