import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const dataCaching = [];

const clearCache = () => {
  dataCaching.length = 0;
};

const prefetchBills = createAsyncThunk("/bills/prefetch", async () => {
  let pageNumber = 2;
  while (true) {
    if (dataCaching[pageNumber]) {
      pageNumber++;
      continue;
    }
    const response = await api.get(`/bills?page=${pageNumber}`);
    if (response.data.length == 0) break;
    dataCaching[pageNumber] = response.data;
    pageNumber++;
  }
});

const getBills = createAsyncThunk("/bills", async (pageNumber) => {
  if (!pageNumber) pageNumber = 1;

  if (dataCaching[pageNumber]) {
    return dataCaching[pageNumber];
  }
  const response = await api.get(`/bills?page=${pageNumber}`);
  dataCaching[pageNumber] = response.data;
  return dataCaching[pageNumber];
});

const updateBill = createAsyncThunk("/bills/update", async (data) => {
  const response = await api.patch(`/bills/${data.id}`, data);
  return response.data;
});

const deleteBill = createAsyncThunk("/bills/delete", async (id) => {
  const response = await api.delete(`/bills/${id}`);
  return response.data;
});

const createBill = createAsyncThunk("/bills/create", async (data) => {
  const response = await api.post("/bills", data);
  return response.data;
});

const billsStats = createAsyncThunk("/bills/stats", async () => {
  const response = await api.get("/dashboard/bills");
  return response.data;
});

export {
  getBills,
  updateBill,
  deleteBill,
  createBill,
  billsStats,
  prefetchBills,
  clearCache,
};
