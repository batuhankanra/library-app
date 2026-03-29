import { Request, Response } from "express";
import * as bookService from "../services/book_service";

export const create = async (req: Request, res: Response) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const books = await bookService.getBooks();
  res.json(books);
};

export const getOne = async (req: Request, res: Response) => {
    const id =req.params.id as string
    if (!id) {
        res.status(400).json({"msg":"bad request"})
    }
    const book = await bookService.getBookById(id);

  res.json(book);
};

export const update = async (req: Request, res: Response) => {
    const id =req.params.id as string
    if (!id) {
        res.status(400).json({"msg":"bad request"})
    }
  const book = await bookService.updateBook(id, req.body);
  res.json(book);
};

export const remove = async (req: Request, res: Response) => {
    const id =req.params.id as string
    if (!id) {
        res.status(400).json({"msg":"bad request"})
    }
  await bookService.deleteBook(id);
  res.json({ message: "Kitap silindi" });
};