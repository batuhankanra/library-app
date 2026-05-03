import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// 🔹 TYPES
export interface Borrow {
  _id: string;

  userId: {
    name: string;
    email: string;
  };

  bookId: {
    _id: string;
    title: string;
    author: string;
    image: string;
    status: string;
  };

  borrowDate: string;
  dueDate: string;
  returnDate: string | null;

  isLate: boolean;
}

// 🔹 STATE
interface BorrowState {
  borrows: Borrow[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BorrowState = {
  borrows: [],
  isLoading: false,
  error: null,
};

//
// 🔥 GET BORROWS
//
export const getBorrows = createAsyncThunk<
  Borrow[],
  void,
  { rejectValue: string }
>("borrow/getBorrows", async (_, thunkAPI) => {
  try {
    const res = await api.get("/borrow");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue(
      "Ödünç kayıtları alınamadı"
    );
  }
});

//
// 🔥 BORROW BOOK
//
export const borrowBook = createAsyncThunk<
  Borrow,
  { bookId: string; email: string | undefined },
  { rejectValue: string }
>(
  "borrow/borrowBook",
  async ({ bookId, email }, thunkAPI) => {
    try {
      const res = await api.post("/borrow", {
        bookId,
        email,
      });

      return res.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Kitap ödünç alınamadı"
      );
    }
  }
);

//
// 🔥 RETURN BOOK
//
export const returnBook = createAsyncThunk<
  Borrow,
  { bookId: string; email: string | undefined },
  { rejectValue: string }
>("borrow/returnBook", async ({bookId,email}, thunkAPI) => {
  try {
    const res = await api.post(
      "/borrow/return",
      {
        bookId,
        email
      }
    );

    return res.data;
  } catch {
    return thunkAPI.rejectWithValue(
      "Kitap iade edilemedi"
    );
  }
});

//
// 🔹 SLICE
//
const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 GET
      .addCase(getBorrows.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        getBorrows.fulfilled,
        (state, action: PayloadAction<Borrow[]>) => {
          state.isLoading = false;
          state.borrows = action.payload;
        }
      )

      .addCase(getBorrows.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Bir hata oluştu";
      })

      // 🔥 BORROW
      .addCase(
        borrowBook.fulfilled,
        (state, action: PayloadAction<Borrow>) => {
          state.borrows.unshift(action.payload);
        }
      )

      // 🔥 RETURN
      .addCase(
        returnBook.fulfilled,
        (state, action: PayloadAction<Borrow>) => {
          const index = state.borrows.findIndex(
            (b) => b._id === action.payload._id
          );

          if (index !== -1) {
            state.borrows[index] = action.payload;
          }
        }
      );
  },
});

export default borrowSlice.reducer;