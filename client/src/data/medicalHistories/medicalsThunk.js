import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const getMedicalHistories = createAsyncThunk("/medicalHistories", async () => {
  const response = await api.get("/medical-history");
  return response.data;
});

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

export { getMedicalHistories, updateMedicalHistory, deleteMedicalHistory };
