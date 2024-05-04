'use client';
import React from 'react';
import { IShelfCard } from '../../../app/_helpers/interfaces';
import Link from 'next/link';

interface ShelfCardProps {
  shelf: IShelfCard;
  key: string;
}

const BookCard: React.FC<ShelfCardProps> = ({ shelf, key }) => {
  return (
    <Link href={`/shelf-management/${shelf.id}`}>
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 w-64 h-64">
        <h2 className="text-xl font-bold mb-2">{shelf.title}</h2>
        <p className="text-sm mb-2">{shelf.description}</p>
        <p className="text-xs mb-2">Book Count: {shelf.bookCount}</p>
      </div>
    </Link>
  );
};

export default BookCard;
