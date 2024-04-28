'use client';
import React from 'react';
import ServerButton from '../ServerButton/ServerButton';
import { deleteBook } from '../../../actions/book';
import { IBookCard } from '../../../app/_helpers/interfaces';

interface BookCardProps {
  book: IBookCard;
  key: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, key }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 w-64 h-64">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-sm mb-2">{book.author}</p>
      <p className="text-xs mb-2">{book.isbn}</p>
      <p className="text-xs">{book.hardcover ? 'Hardcover' : 'Paperback'}</p>
      <ServerButton
        serverAction={async () => {
          if (book.id) {
            await deleteBook(book.id);
          }
        }}
        buttonText="Delete"
        bid={book.id ?? ''}
      />
    </div>
  );
};

export default BookCard;
