'use server';
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

  try {
    // TODO: Can we make this also update, if an ID existssss?
    const shelf: IShelf = {
      title: formData.get('title') as string,
      config: {},
      books: [],
      public: formData.get('public') === 'true',
      userId: session.userId,
      description: formData.get('description') as string
    };

    shelfRepo.create(shelf);
    return { message: 'Shelf added successfully' };
  } catch (e) {
    return { message: 'Something went wrong' };
  }
  // shelfRepo.create(shelf);
}

export async function updateShelf(shelf: IShelf) {
  shelfRepo.updateShelf(shelf);
}
