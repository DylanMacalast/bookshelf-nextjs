import React from 'react';
import { verifySession } from './lib/dal';

const HomePage = async () => {
  const session = await verifySession();

  return (
    <div>HomePage are you logged in? {session?.isAuth ? 'true' : 'false'}</div>
  );
};

export default HomePage;
