import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getPatients = createAsyncThunk("/patients", async () => {
  const response = await api.get("/patients");
  return response.data;
});

export { getPatients };
