import { IBook } from '../interfaces';
import { db } from './db';

const Book = db.Book;

export const bookRepo = {
  getAll,
  getById,
  create,
  deleteBook,
  getByUserID
};

async function getAll() {
  return await Book.find<IBook[]>();
}

async function getById(bookId: number) {
  return await Book.findOne({ bookId });
}

async function create(bookParam: IBook) {
  const book = new Book(bookParam);

  return await book.save();
}

async function deleteBook(id: string) {
  return await Book.deleteOne({ _id: id });
}

async function getByUserID(userID: number) {
  return await Book.find<IBook[]>({ userID });
}
