'use client';
import React, { useState } from 'react';
import { BookPikcerCard } from '../../atoms/BookPickerCard/BookPickerCard';
import { addBookToShelf, removeBookFromShelf } from '../../../actions/shelf';

interface IBook {
  id: string;
  title: string;
  // ... other book properties
}

interface IBookPickerProps {
  initialBooksToAdd: IBook[];
  initialBooksInShelf: IBook[];
  shelfId: string;
}

export const BookPicker: React.FC<IBookPickerProps> = ({
  initialBooksToAdd,
  initialBooksInShelf,
  shelfId
}) => {
  const [booksToAdd, setBooksToAdd] = useState(initialBooksToAdd);
  const [booksInShelf, setBooksInShelf] = useState(initialBooksInShelf);

  console.log(initialBooksToAdd);
  const onAddBook = async (book: IBook) => {
    setBooksToAdd(booksToAdd.filter((b) => b.id !== book.id));
    setBooksInShelf([...booksInShelf, book]);
    await addBookToShelf(shelfId, book.id);
  };

  const onRemoveBook = async (book: IBook) => {
    setBooksInShelf(booksInShelf.filter((b) => b.id !== book.id));
    setBooksToAdd([...booksToAdd, book]);
    await removeBookFromShelf(shelfId, book.id);
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
