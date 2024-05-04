'use client';
import React from 'react';

const page = () => {
  return (
    <div>
      <button
        onClick={async () => {
          // await addShelf(dummyShelf);
        }}
      >
        Add Shelf
      </button>

      <button
        onClick={async () => {
          // await updateShelf(dummyShelf2);
        }}
      >
        Update Shelf
      </button>
    </div>
  );
};

export default page;
