import { IUser } from '../interfaces';
import { db } from './db';

const User = db.User;

export const userRepo = {
  getAll,
  registerUser,
  findUserByUsername,
  findUserById
};

async function getAll() {
  return await User.find();
}

// TODO: What user functions will we need in the app?

async function registerUser(userParam: IUser) {
  const user = new User(userParam);
  return await User.create(user);
}

async function loginUser(username: string, password: string) {
  // create a token for the user to be returned

  User.updateOne({ username }, { token: 'token' });
}

async function findUserByUsername(username: string) {
  return await User.findOne({ username });
}

async function findUserById(id: string) {
  return await User.findById(id);
}
