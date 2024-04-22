'use client';
import React from 'react';
import { IBook } from '../_helpers/interfaces';
import { addBook } from '../../actions/book';

const dummyBook: IBook = {
  bookId: -1,
  title: 'The Great Gatsby',
  userID: 0,
  author: 'F. Scott Fitzgerald',
  isbn: '9780743273565',
  hardcover: true
};

const page = async () => {
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
