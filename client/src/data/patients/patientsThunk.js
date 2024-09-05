import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getPatients = createAsyncThunk("/patients", async () => {
  const response = await api.get("/patients");
  return response.data;
});

const addPatient = createAsyncThunk("/patients/create", async (patient) => {
  const response = await api.post("/patients", patient);
  return response.data;
});

export { getPatients, addPatient };
