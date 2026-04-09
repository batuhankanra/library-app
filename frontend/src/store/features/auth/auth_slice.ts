import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/axios";
import type { AuthState, LoginPayload, LoginResponse } from "./types";

export const login = createAsyncThunk<
  LoginResponse,            
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
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
  state.isLoading = false;
  state.user = action.payload.user;

  localStorage.setItem("token", action.payload.token);
})
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;