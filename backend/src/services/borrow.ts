import { Book } from "../models/book";
import { Borrow } from "../models/borrow";
import { User } from "../models/user";

export const borrowBook = async (bookId: string, userId: string) => {
  const book = await Book.findById(bookId);

  if (!book) throw new Error("Kitap bulunamadı");
  if (book.status !== "AVAILABLE") throw new Error("Kitap alınamaz");

  book.status = "BORROWED";
  await book.save();

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14)

  const borrow = await Borrow.create({
    bookId,
    userId,
    borrowDate: new Date(),
    dueDate,
  });

  return borrow;
};

export const returnBook = async (bookId: string, userId: string) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Kitap bulunamadı");

  const borrow = await Borrow.findOne({
    bookId,
    userId,
    returnDate: null,
  });

  if (!borrow) {
    throw new Error("Bu kitap kullanıcıda değil");
  }

  const now = new Date();

  let penaltyPointsToAdd = 0;
  let debtToAdd = 0;

  if (now > borrow.dueDate) {
    const diffTime = now.getTime() - borrow.dueDate.getTime();
    const daysLate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    penaltyPointsToAdd = daysLate * 5;
    debtToAdd = Math.floor(penaltyPointsToAdd / 10) * 10;
  }

  book.status = "AVAILABLE";
  await book.save();

  borrow.returnDate = now;
  await borrow.save();
  
  await User.findByIdAndUpdate(userId, {
    $inc: {
      penaltyPoints: penaltyPointsToAdd,
      debt: debtToAdd,
    },
  });

  return {
    borrow,
    penaltyPointsAdded: penaltyPointsToAdd,
    debtAdded: debtToAdd,
  };
};