import { ObjectId } from 'mongodb';
import { IShelf } from '../interfaces';
import { db } from './db';

const Shelf = db.Shelf;

export const shelfRepo = {
  getAll,
  getOne,
  getOnePublic,
  create,
  addBooksToShelf,
  makePublic,
  deleteShelf,
  getByUserId,
  updateShelf,
  getMyShelf,
  createOrUpdate
};

async function getAll() {
  return await Shelf.find<IShelf>();
}

async function getOne(id: string | ObjectId) {
  return await Shelf.findById<IShelf>({ _id: id });
}

async function getMyShelf(
  shelfId: string | ObjectId,
  userId: string | ObjectId
) {
  return await Shelf.findOne<IShelf>({ _id: shelfId, userId: userId });
}

// Function to get a shelf for a visitor to look at
async function getOnePublic(id: string) {
  return await Shelf.findOne<IShelf>({ _id: id, public: true });
}

async function create(shelfParam: IShelf) {
  const shelf = new Shelf(shelfParam);

  return await shelf.save();
}

async function createOrUpdate(shelfParam: IShelf) {
  if (shelfParam._id) {
    return await Shelf.findByIdAndUpdate(shelfParam._id, shelfParam, {
      new: true
    });
  }

  const shelf = new Shelf(shelfParam);
  return await shelf.save();
}

async function addBooksToShelf(shelfId: string, bookIds: string | ObjectId[]) {
  return await Shelf.updateOne(
    { _id: shelfId },
    { $push: { books: { $each: bookIds } } }
  );
}

async function makePublic(id: string | ObjectId) {
  return await Shelf.updateOne({ _id: id }, { public: true });
}

async function deleteShelf(id: string | ObjectId) {
  return await Shelf.deleteOne({ _id: id });
}

async function getByUserId(userID: string | ObjectId) {
  return await Shelf.find<IShelf>({ userID });
}

async function updateShelf(shelf: IShelf) {
  return await Shelf.updateOne({ _id: shelf._id }, shelf);
}
