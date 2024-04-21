import { db } from './db';

const User = db.User;

export const userRepo = {
  getAll
};

async function getAll() {
  return await User.find();
}
