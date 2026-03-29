import mongoose from "mongoose";

export type BookStatus = "AVAILABLE" | "BORROWED" | "NOT_AVAILABLE";

export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
}

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "BORROWED", "NOT_AVAILABLE"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);