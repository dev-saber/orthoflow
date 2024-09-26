import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const dataCaching = {};

const clearCache = () => {
  Object.keys(dataCaching).forEach((key) => delete dataCaching[key]);
};

const prefetchMedicalHistories = createAsyncThunk(
  "/medicalHistories/prefetch",
  async () => {
    let pageNumber = 2;
    while (true) {
      if (dataCaching[pageNumber]) {
        pageNumber++;
        continue;
      }
      const response = await api.get(`/medical-history?page=${pageNumber}`);
      if (response.data.medicalHistories.data.length == 0) break;
      dataCaching[pageNumber] = response.data;
      pageNumber++;
    }
  }
);

const getMedicalHistories = createAsyncThunk(
  "/medicalHistories",
  async (pageNumber) => {
    if (!pageNumber) pageNumber = 1;

    if (dataCaching[pageNumber]) {
      return dataCaching[pageNumber];
    }
    const response = await api.get(`/medical-history?page=${pageNumber}`);
    dataCaching[pageNumber] = response.data;
    return response.data;
  }
);

const updateMedicalHistory = createAsyncThunk(
  "/medicalHistories/update",
  async (data) => {
    const response = await api.patch(`/medical-history/${data.id}`, data);
    return response.data.data;
  }
);

const deleteMedicalHistory = createAsyncThunk(
  "/medicalHistories/delete",
  async (id) => {
    const response = await api.delete(`/medical-history/${id}`);
    return response.data.id;
  }
);

const createMedicalHistory = createAsyncThunk(
  "/medicalHistories/create",
  async (data) => {
    const response = await api.post("/medical-history", data);
    return response.data.data;
  }
);

export {
  getMedicalHistories,
  updateMedicalHistory,
  deleteMedicalHistory,
  createMedicalHistory,
  clearCache,
  dataCaching as medicalHistoriesCache,
  prefetchMedicalHistories,
};
