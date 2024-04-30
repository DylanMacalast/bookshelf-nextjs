'use client';
import React from 'react';
import { BookPikcerCard } from '../../atoms/BookPickerCard/BookPickerCard';

interface IBook {
  id: string;
  title: string;
  // ... other book properties
}

interface IBookPickerProps {
  booksToAdd: IBook[];
  booksInShelf: IBook[];
}

export const BookPicker: React.FC<IBookPickerProps> = ({
  booksToAdd,
  booksInShelf
}) => {
  const onAddBook = async (bookId: string) => {
    console.log('Add book', bookId);
  };

  const onRemoveBook = (bookId: string) => {
    console.log('Remove book', bookId);
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <h2>Books to add</h2>
        <div>
          {booksToAdd.map((book) => (
            <BookPikcerCard
              book={book}
              onClickAction={onAddBook}
              buttonText="Add"
              key={book.id}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 border-l border-black border-solid p-2">
        <h2>Books in shelf</h2>
        <div>
          {booksInShelf.map((book) => (
            <BookPikcerCard
              book={book}
              onClickAction={onRemoveBook}
              buttonText="Remove"
              key={book.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
