import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";
import type { AuthState, LoginPayload } from "./types";
import  type { User } from "../../../types";

export const login = createAsyncThunk<
  User,            
  LoginPayload,    
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
  }
});

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;