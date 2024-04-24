import { RegisterFormInputs } from '../../../components/organisms/Forms/RegisterForm/types';
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

async function registerUser(user: RegisterFormInputs) {
  return await User.create(user);
}
