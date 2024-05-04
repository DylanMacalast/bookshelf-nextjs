'use client';
import React, { useState } from 'react';
import { BookPikcerCard } from '../../atoms/BookPickerCard/BookPickerCard';

interface IBook {
  id: string;
  title: string;
  // ... other book properties
}

interface IBookPickerProps {
  initialBooksToAdd: IBook[];
  initialBooksInShelf: IBook[];
}

export const BookPicker: React.FC<IBookPickerProps> = ({
  initialBooksToAdd,
  initialBooksInShelf
}) => {
  const [booksToAdd, setBooksToAdd] = useState(initialBooksToAdd);
  const [booksInShelf, setBooksInShelf] = useState(initialBooksInShelf);

  const onAddBook = async (book: IBook) => {
    setBooksToAdd(booksToAdd.filter((b) => b.id !== book.id));
    setBooksInShelf([...booksInShelf, book]);
  };

  const onRemoveBook = (book: IBook) => {
    setBooksInShelf(booksInShelf.filter((b) => b.id !== book.id));
    setBooksToAdd([...booksToAdd, book]);
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <h2>Books to add</h2>
        {booksToAdd.map((book) => (
          <BookPikcerCard
            book={book}
            onClickAction={() => onAddBook(book)}
            buttonText="Add"
            key={book.id}
          />
        ))}
      </div>
      <div className="w-1/2 border-l border-black border-solid p-2">
        <h2>Books in shelf</h2>
        {booksInShelf.map((book) => (
          <BookPikcerCard
            book={book}
            onClickAction={() => onRemoveBook(book)}
            buttonText="Remove"
            key={book.id}
          />
        ))}
      </div>
    </div>
  );
};
