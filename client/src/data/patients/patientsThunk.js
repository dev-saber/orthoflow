import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const dataCaching = [];

const getPatients = createAsyncThunk("/patients", async (pageNumber) => {
  if (!pageNumber) pageNumber = 1;

  if (dataCaching[pageNumber]) {
    return dataCaching[pageNumber];
  }
  const response = await api.get(`/patients?page=${pageNumber}`);
  dataCaching[pageNumber] = response.data;
  return dataCaching[pageNumber];
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
