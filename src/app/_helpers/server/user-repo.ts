import { db } from './db';

const User = db.User;

export const userRepo = {
  getAll
};

async function getAll() {
  return await User.find();
}

// TODO: What user functions will we need in the app?
