import { ObjectId } from 'mongodb';
import { IBook } from '../interfaces';
import { db } from './db';

const Book = db.Book;

export const bookRepo = {
  getAll,
  getById,
  create,
  deleteBook,
  getByUserId
};

async function getAll() {
  return await Book.find<IBook>();
}

async function getById(id: string) {
  return await Book.findOne({ _id: id });
}

async function create(bookParam: IBook) {
  const book = new Book(bookParam);
  return await book.save();
}

async function deleteBook(id: string | ObjectId) {
  return await Book.deleteOne({ _id: id });
}

async function getByUserId(userId: string) {
  return await Book.find<IBook>({ userId });
}
