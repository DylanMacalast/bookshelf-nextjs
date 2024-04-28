'use client';
import React from 'react';

interface IBook {
  id: string;
  title: string;
  // ... other book properties
}

interface IBookPickerCardProps {
  book: IBook;
  onClickAction: (bookId: string) => void;
  buttonText: string;
}

export const BookPikcerCard: React.FC<IBookPickerCardProps> = ({
  book,
  onClickAction,
  buttonText
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 w-64 h-64">
      <div key={book.id}>
        <p>{book.title}</p>
        <button onClick={() => onClickAction(book.id)}>{buttonText}</button>
      </div>
    </div>
  );
};
