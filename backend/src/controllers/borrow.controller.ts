import { Response } from "express";
import * as borrowService from "../services/borrow";

export const borrow = async (req: any, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId; 

    const result = await borrowService.borrowBook(bookId, userId);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const returnBook = async (req: any, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const result = await borrowService.returnBook(bookId, userId);

    res.status(200).json({
      message: "Kitap iade edildi",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};