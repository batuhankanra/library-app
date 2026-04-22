import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// 🔹 TYPE
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
}

// 🔹 STATE
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

// 🔥 GET USERS
export const getUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/getUsers", async (_, thunkAPI) => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kullanıcılar alınamadı");
  }
});

// 🔥 DELETE USER
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/deleteUser", async (id, thunkAPI) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Kullanıcı silinemedi");
  }
});

// 🔥 UPDATE ROLE
export const updateUserRole = createAsyncThunk<
  User,
  { id: string; role: string },
  { rejectValue: string }
>("user/updateUserRole", async ({ id, role }, thunkAPI) => {
  try {
    const res = await api.put(`/users/${id}`, { role });
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Rol güncellenemedi");
  }
});

// 🔹 SLICE
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Hata";
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      })

      // UPDATE ROLE
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;