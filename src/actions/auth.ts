'use server';

import { userRepo } from '../app/_helpers/server/user-repo';

export async function signup(data: FormData) {
  const userData = {
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password')
  };

  try {
    await userRepo.registerUser(userData);
  } catch (error) {
    console.error(error);
    return {
      message: 'Please check your credentials and try again'
    };
  }
  return true;
}
