import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../api/auth";

const loginUser = createAsyncThunk(
  "auth/login", // action name shown in redux devtools
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);

      localStorage.setItem("authToken", response.data?.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const registerUser = createAsyncThunk(
  "auth/register", // action name shown in redux devtools
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export { loginUser, registerUser };
