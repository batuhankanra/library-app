import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// 🔹 TYPES
interface User {
  _id: string;
  name: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: any;
}

// 🔹 INITIAL STATE
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};


// 🔥 LOGIN
export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data || "Login failed"
    );
  }
});


// 🔥 GET ME (token kontrol)
export const getMe = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/getMe", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Unauthorized");
  }
});


// 🔹 SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      // 🔥 TOKEN SİL
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;

        // 🔥 TOKEN KAYDET
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login error";
      })


      // 🔄 GET ME
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getMe.fulfilled, (state, action:any) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })

      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;

        // 🔥 TOKEN GEÇERSİZ → SİL
        localStorage.removeItem("token");
      });
  },
});



export const { logout } = authSlice.actions;


export default authSlice.reducer;