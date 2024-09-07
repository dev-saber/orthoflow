import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getStock = createAsyncThunk("/stock", async () => {
  const response = await api.get("/stock");
  return response.data;
});

export { getStock };
