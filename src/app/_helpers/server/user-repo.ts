import { RegisterFormInputs } from '../../../components/organisms/Forms/RegisterForm/types';
import { IUser } from '../interfaces';
import { db } from './db';

const User = db.User;

export const userRepo = {
  getAll,
  registerUser
};

async function getAll() {
  return await User.find();
}

// TODO: What user functions will we need in the app?

async function registerUser(userParam: IUser) {
  const user = new User(userParam);
  return await User.create(user);
}
