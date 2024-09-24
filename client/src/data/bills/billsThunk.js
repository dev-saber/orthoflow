import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { prefetchPatients } from "../patients/patientsThunk";

const dataCaching = {};

const clearCache = () => {
  Object.keys(dataCaching).forEach((key) => delete dataCaching[key]);
};

const prefetchBills = createAsyncThunk("/bills/prefetch", async () => {
  let pageNumber = 2;
  while (true) {
    if (dataCaching[pageNumber]) {
      pageNumber++;
      continue;
    }
    const response = await api.get(`/bills?page=${pageNumber}`);
    if (response.data.bills.data.length == 0) break;
    dataCaching[pageNumber] = response.data;
    pageNumber++;
  }
});

const getBills = createAsyncThunk(
  "/bills",
  async (pageNumber, { dispatch }) => {
    if (!pageNumber) pageNumber = 1;

    if (dataCaching[pageNumber]) {
      return dataCaching[pageNumber];
    }
    const response = await api.get(`/bills?page=${pageNumber}`);
    await dispatch(prefetchPatients()); // prefetch patients data to have it ready for navigation
    dataCaching[pageNumber] = response.data;
    return response.data;
  }
);

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
  dataCaching as billsCache,
};
