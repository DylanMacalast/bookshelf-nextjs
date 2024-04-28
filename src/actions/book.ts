'use server';
import { revalidatePath } from 'next/cache';
import { IBook } from '../app/_helpers/interfaces';
import { bookRepo } from '../app/_helpers/server/book-repo';
import { ObjectId } from 'mongodb';
import { verifySession } from '../app/lib/dal';

export async function addBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    return { message: 'Unknown Session' };
  }

  if (formData != null) {
    try {
      const book: IBook = {
        title: formData.get('title') as string,
        userId: session.userId,
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
  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }

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
