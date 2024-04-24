'use server';
import { IShelf } from '../app/_helpers/interfaces';
import { shelfRepo } from '../app/_helpers/server/shelf-repo';

export async function addShelf(shelf: IShelf) {
  shelfRepo.create(shelf);
}

export async function updateShelf(shelf: IShelf) {
  shelfRepo.updateShelf(shelf);
}
