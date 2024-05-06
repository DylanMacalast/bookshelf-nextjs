'use server';
import { redirect } from 'next/navigation';
import { ISessionUser, IShelf } from '../app/_helpers/interfaces';
import { shelfRepo } from '../app/_helpers/server/shelf-repo';
import { verifySession } from '../app/lib/dal';
import { bookRepo } from '../app/_helpers/server/book-repo';
import { revalidatePath } from 'next/cache';

export async function addShelf(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  // only logged in users can create a shelf
  const session = await verifySession();
  if (!session || session.userId == null || session.userId === '') {
    throw new Error('Invalid session');
  }

  if (formData == null) {
    return { message: 'Shelf is empty' };
  }

  const shelfId = formData.get('shelfId') as string;
  let shelf: IShelf;
  let redirectUser = false;
  let message = '';

  try {
    if (shelfId && shelfId !== 'new') {
      // fetch the shelf from DB to make sure the user deffo owns it before we update it
      const existingShelf = await shelfRepo.getMyShelf(shelfId, session.userId);

      if (existingShelf == null) {
        return { message: 'Shelf not found' };
      }

      shelf = {
        _id: existingShelf._id,
        title: formData.get('title') as string,
        public: formData.get('public') === 'true',
        description: formData.get('description') as string,
        config: existingShelf.config,
        userId: session.userId,
        books: existingShelf.books
      };

      await shelfRepo.updateShelf(shelf);
      message = 'Shelf updated successfully';
    } else {
      shelf = {
        title: formData.get('title') as string,
        config: {},
        books: [],
        public: formData.get('public') === 'true',
        userId: session.userId,
        description: formData.get('description') as string
      };

      shelf = await shelfRepo.create(shelf);
      redirectUser = true;
    }
  } catch (e) {
    console.error(e);
    return { message: 'Error Creating Shelf!' };
  }

  if (redirectUser) {
    redirect(`/shelf-management/${shelf._id}`);
  } else {
    revalidatePath(`/shelf-management/${shelf._id}`);
    return { message };
  }
}

// TODO: Update this to be for bookIds not just one bookId -> that way we can do bulk select & add in the client
export async function addBookToShelf(shelfId: string, bookId: string) {
  const user: ISessionUser = await verifySession();
  if (!user || user.userId == null || user.userId === '') {
    throw new Error('Invalid session');
  }

  const error = await shelfSecurityChecks(shelfId, bookId, user);
  if (error != '') {
    throw new Error(error);
  }

  try {
    await shelfRepo.addBooksToShelf(shelfId, [bookId]);
    return { message: 'Book added to shelf' };
  } catch (e) {
    console.error(e);
    return { message: 'Error adding book to shelf' };
  }
}

export async function removeBookFromShelf(shelfId: string, bookId: string) {
  const user = await verifySession();
  if (!user || user.userId == null || user.userId === '') {
    throw new Error('Invalid session');
  }

  const error = await shelfSecurityChecks(shelfId, bookId, user);
  if (error != '') {
    throw new Error(error);
  }

  try {
    await shelfRepo.removeBooksFromShelf(shelfId, [bookId]);
    return { message: 'Book added to shelf' };
  } catch (e) {
    console.error(e);
    return { message: 'Error adding book to shelf' };
  }
}

// #region helper
const shelfSecurityChecks = async (
  shelfId: string,
  bookId: string,
  user: ISessionUser
) => {
  // EXTREME SECURITY - NO FUCKING AROUND
  // REVIEW: this does add extra overhead to adding books to the shelf...
  // not sure if there is a better way to do this. I guess caching would help down the line
  // for now I think it's fine -> somethig that will deffo need looking at in the future!

  const shelf = await shelfRepo.getOne(shelfId);
  let error = '';

  if (!shelf) {
    error = 'No shelf found with the provided ID';
  }

  // Check if the user owns the shelf
  if (shelf?.userId.toString() !== user.userId) {
    error = 'You do not own this shelf';
  }

  // Fetch the book from the database
  const book = await bookRepo.getById(bookId);
  if (!book) {
    error = 'No book found with the provided ID';
  }

  // Check if the user owns the book
  if (book.userId.toString() !== user.userId) {
    error = 'You do not own this book';
  }

  return error;
};
// #endregion
