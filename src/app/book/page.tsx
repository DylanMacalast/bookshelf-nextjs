'use client';
import React from 'react';
import { IBook } from '../_helpers/interfaces';
import { addBook } from '../../actions/book';

const dummyBook: IBook = {
  title: 'The Great Gatsby',
  userId: '112121212939392939293923', // dummy user id for now
  author: 'F. Scott Fitzgerald',
  isbn: '9780743273565',
  hardcover: true
};

const page = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await addBook(dummyBook);
        }}
      >
        Add Book
      </button>
    </div>
  );
};

export default page;
