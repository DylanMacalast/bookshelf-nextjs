'use server';
import { IBook } from '../app/_helpers/interfaces';
import { bookRepo } from '../app/_helpers/server/book-repo';

export async function addBook(book: IBook) {
  bookRepo.create(book);
}
