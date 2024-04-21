import { db } from "./db";

const UserBookShelf = db.UserBookShelf;

export const ubsRepo = {
  getAll,
};

async function getAll() {
  return await UserBookShelf.find();
}
