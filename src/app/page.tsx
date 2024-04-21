import React from 'react'
import { Button } from '../components/atoms/Button'
import clientPromise from '../../lib/mongodb'

const page = async () => {
  const connection = await clientPromise

  console.log(connection)

  return (
    <div>
      <Button />
      <h1>HI THERE</h1>
      <h1>AUTO RELOADING WORKSSSSS </h1>
    </div>
  );
};

export default page;
