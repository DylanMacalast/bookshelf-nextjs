import { db } from "./db";

const Shelf = db.Shelf;

export const shelfRepo = {
  getAll,
};

async function getAll() {
  return await Shelf.find();
}
