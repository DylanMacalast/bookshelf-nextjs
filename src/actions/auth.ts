'use server';

import { revalidatePath } from 'next/cache';
import { IUser } from '../app/_helpers/interfaces';
import { userRepo } from '../app/_helpers/server/user-repo';
import { redirect } from 'next/navigation';
import bcryptjs from 'bcryptjs';
import { createSession, deleteSession } from '../app/lib/session';

export async function signup(
  prevState: { message: string },
  formData: FormData
) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(
    formData.get('password') as string,
    salt
  );
  const userData: IUser = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: hashedPassword,
    config: {},
    token: ''
  };

  try {
    await userRepo.registerUser(userData);

    revalidatePath('/');
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';

    return { message: errorMessage };
  }

  redirect('/login');
}

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const user = await userRepo.findUserByUsername(username);

    if (!user) {
      return { message: 'User not found' };
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return { message: 'Invalid password' };
    }

    await createSession(user._id);
    redirect('/book');
  } catch (error) {}
}

export async function logout() {
  deleteSession();
  redirect('/');
}
