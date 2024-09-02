import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const register = createAsyncThunk("/register", async (data) => {
  const response = await api.post("/register", data);
  return response.data;
});

const login = createAsyncThunk("/login", async (data) => {
  const response = await api.post("/login", data);
  return response.data;
});

export { login, register };
