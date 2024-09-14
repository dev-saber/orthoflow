import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const getMedicalHistories = createAsyncThunk("/medicalHistories", async () => {
  const response = await api.get("/medical-history");
  return response.data;
});

export { getMedicalHistories };
