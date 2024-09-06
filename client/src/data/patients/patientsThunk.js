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

const updatePatient = createAsyncThunk("/patients/update", async (patient) => {
  const response = await api.patch(`/patients/${patient.id}`, patient);
  return response.data;
});

const deletePatient = createAsyncThunk("/patients/delete", async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
});

export { getPatients, addPatient, updatePatient, deletePatient };
