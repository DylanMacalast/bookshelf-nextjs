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

async function registerUser(user: RegisterFormInputs) {
  return await User.create(user);
}
