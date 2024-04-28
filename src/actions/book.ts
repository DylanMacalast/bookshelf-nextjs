'use server';
import { revalidatePath } from 'next/cache';
import { IBook } from '../app/_helpers/interfaces';
import { bookRepo } from '../app/_helpers/server/book-repo';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export async function addBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  if (formData != null) {
    try {
      const book: IBook = {
        title: formData.get('title') as string,
        userId: new mongoose.Types.ObjectId().toString(),
        author: formData.get('author') as string,
        isbn: formData.get('isbn') as string,
        hardcover: formData.get('hardcover') === 'true'
      };

      await bookRepo.create(book);
      revalidatePath('/book');
      return { message: 'Book added successfully' };
    } catch (e) {
      return { message: 'Something went wrong' };
    }
  } else {
    return { message: 'Book is empty' };
  }
}

export async function deleteBook(bookId: string | ObjectId) {
  if (bookId == null) {
    return;
  }
  try {
    await bookRepo.deleteBook(bookId);
  } catch (e) {
    console.error('Error deleting book', e);
    return;
  }

  revalidatePath('/book');
}
