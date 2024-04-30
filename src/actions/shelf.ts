'use server';
import { redirect } from 'next/navigation';
import { IShelf } from '../app/_helpers/interfaces';
import { shelfRepo } from '../app/_helpers/server/shelf-repo';
import { verifySession } from '../app/lib/dal';

export async function addShelf(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  // only logged in users can create a shelf
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    return { message: 'Unknown Session' };
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
    return { message };
  }
}

export async function updateShelf(shelf: IShelf) {
  shelfRepo.updateShelf(shelf);
}
