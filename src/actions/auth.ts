'use server';

import { revalidatePath } from 'next/cache';
import { IUser } from '../app/_helpers/interfaces';
import { userRepo } from '../app/_helpers/server/user-repo';

export async function signup(
  prevState: { message: string },
  formData: FormData
) {
  const userData: IUser = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    config: {},
    token: ''
  };

  try {
    const t = await userRepo.registerUser(userData);
    console.log('logged', t);
    revalidatePath('/');
    return { message: 'User registered successfully' };
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    console.log(errorMessage);

    return { message: errorMessage };
  }
}
