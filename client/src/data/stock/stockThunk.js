import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getStock = createAsyncThunk("/stock", async () => {
  const response = await api.get("/stock");
  return response.data;
});

const updateStock = createAsyncThunk("/stock/update", async (data) => {
  const response = await api.patch(`/stock/${data.id}`, data);
  return response.data;
});

export { getStock, updateStock };
