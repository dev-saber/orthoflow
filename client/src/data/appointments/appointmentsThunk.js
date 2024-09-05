import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAppointments = createAsyncThunk("/appointments", async () => {
  const response = await api.get("/appointments");
  return response.data;
});

const createAppointment = createAsyncThunk("/appointments/create", async (data) => {
  const response = await api.post("/appointments", data);
  return response.data;
});

const updateAppointment = createAsyncThunk("/appointments/update", async (data) => {
  const response = await api.patch(`/appointments/${data.id}`, data);
  return response.data;
});

const deleteAppointment = createAsyncThunk("/appointments/delete", async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
});

export {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
