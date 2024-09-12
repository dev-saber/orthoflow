import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const getBills = createAsyncThunk("/bills", async () => {
  const response = await api.get("/bills");
  console.log(response.data);
  return response.data;
});

export { getBills };
