import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./stockThunk";

const initialState = {
  data: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.getStock.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });

    builder.addCase(operations.getStock.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default stockSlice.reducer;
