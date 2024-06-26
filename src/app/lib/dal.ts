import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { cache } from 'react';
import { ObjectId } from 'mongodb';

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: <string | ObjectId>session.userId };
});
