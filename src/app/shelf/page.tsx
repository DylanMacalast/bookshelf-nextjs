'use client';
import React from 'react';
import { IShelf } from '../_helpers/interfaces';
import { addShelf, updateShelf } from '../../actions/shelf';

const dummyShelf: IShelf = {
  userId: '112121212939392939293923', // dummy user id for now
  title: 'My First Shelf',
  description: 'This is my first shelf!',
  config: {
    color: 'blue',
    background: 'white'
  },
  books: [],
  public: true
};

const dummyShelf2: IShelf = {
  _id: '662cc49404b645ee8792ebab', // set to the insert shelf id
  userId: '112121212939392939293923', // dummy user id for now
  title: 'My First Shelf UPDATED',
  description: 'This is my first shelf!',
  config: {
    color: 'blue',
    background: 'white'
  },
  books: [],
  public: true
};

const page = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await addShelf(dummyShelf);
        }}
      >
        Add Shelf
      </button>

      <button
        onClick={async () => {
          await updateShelf(dummyShelf2);
        }}
      >
        Update Shelf
      </button>
    </div>
  );
};

export default page;
