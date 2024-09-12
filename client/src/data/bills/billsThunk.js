import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const getBills = createAsyncThunk("/bills", async () => {
  const response = await api.get("/bills");
  return response.data;
});

const updateBill = createAsyncThunk("/bills/update", async (data) => {
  const response = await api.patch(`/bills/${data.id}`, data);
  return response.data;
});

const deleteBill = createAsyncThunk("/bills/delete", async (id) => {
  const response = await api.delete(`/bills/${id}`);
  return response.data;
});

export { getBills, updateBill, deleteBill };
