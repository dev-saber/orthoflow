import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./stockThunk";

const initialState = {
  stock: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.getStock.fulfilled, (state, action) => {
      state.stock = action.payload.data;
    });

    builder.addCase(operations.getStock.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

export default stockSlice.reducer;
