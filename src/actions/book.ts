'use server';
import { revalidatePath } from 'next/cache';
import { IBook } from '../app/_helpers/interfaces';
import { bookRepo } from '../app/_helpers/server/book-repo';

export async function addBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  if (formData != null) {
    try {
      const book = {
        title: formData.get('title') as string,
        userId: formData.get('userId') as string,
        author: formData.get('author') as string,
        isbn: formData.get('isbn') as string,
        hardcover: formData.get('hardcover') === 'true'
      };

      bookRepo.create(book);
      revalidatePath('/');
      return { message: 'Book added successfully' };
    } catch (e) {
      return { message: 'Something went wrong' };
    }
  } else {
    return { message: 'Book is empty' };
  }
}
