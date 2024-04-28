import { IShelf } from '../interfaces';
import { db } from './db';

const Shelf = db.Shelf;

export const shelfRepo = {
  getAll,
  getOne,
  getOnePublic,
  create,
  addBookToShelf,
  makePublic,
  deleteShelf,
  getByUserID,
  updateShelf
};

async function getAll() {
  return await Shelf.find<IShelf>();
}

async function getOne(id: string) {
  return await Shelf.findById<IShelf>({ _id: id });
}

// Function to get a shelf for a visitor to look at
async function getOnePublic(id: string) {
  return await Shelf.findOne<IShelf>({ _id: id, public: true });
}

async function create(shelfParam: IShelf) {
  const shelf = new Shelf(shelfParam);

  return await shelf.save();
}

async function addBookToShelf(shelfId: string, bookId: string) {
  return await Shelf.updateOne({ _id: shelfId }, { $push: { books: bookId } });
}

async function makePublic(id: string) {
  return await Shelf.updateOne({ _id: id }, { public: true });
}

async function deleteShelf(id: string) {
  return await Shelf.deleteOne({ _id: id });
}

async function getByUserID(userID: string) {
  return await Shelf.find<IShelf>({ userID });
}

async function updateShelf(shelf: IShelf) {
  return await Shelf.updateOne({ _id: shelf._id }, shelf);
}
