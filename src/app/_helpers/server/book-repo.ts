import { db } from "./db";

const Book = db.Book;

export const bookRepo = {
  getAll,
};

async function getAll() {
  return await Book.find();
}
