import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";
import type { Book } from "../book/book_slice";


// 🔹 STATE
interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  isLoading: false,
  error: null,
};



//
// 🔥 BORROW (DOĞRU URL)
//
export const borrowBook = createAsyncThunk<
  Book,
  string,
  { rejectValue: string }
>("book/borrowBook", async (bookId, thunkAPI) => {
  try {
    const res = await api.post(`/borrow/${bookId}`);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kitap ödünç alınamadı");
  }
});

export const returnBook = createAsyncThunk<
  Book,
  string,
  { rejectValue: string }
>("book/returnBook", async (bookId, thunkAPI) => {
  try {
    const res = await api.post(`/borrow/${bookId}/return`);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Kitap iade edilemedi");
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (b) => b._id === action.payload._id
        );

        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (b) => b._id === action.payload._id
        );

        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;