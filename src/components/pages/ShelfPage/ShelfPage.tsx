'use client';
import React from 'react';
import { IShelf } from '../../../app/_helpers/interfaces';

const ShelfPage = ({
  shelf,
  isOwner = false
}: {
  shelf: IShelf;
  isOwner: boolean;
}) => {
  console.log(shelf);

  return (
    <div className="flex flex-col justify-center items-center my-5">
      {isOwner && <h3>You are the owener</h3>}
      <h2 className="text-4xl font-semibold">{shelf?.title}</h2>
      <p>{shelf?.description}</p>
    </div>
  );
};

export default ShelfPage;
