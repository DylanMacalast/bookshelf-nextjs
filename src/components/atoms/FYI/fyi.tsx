import React, { useState } from 'react';

interface FyiProps {
  message: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const Fyi: React.FC<FyiProps> = ({ message, show, setShow }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 m-4 p-2 bg-blue-500 text-white rounded shadow-lg max-w-sm">
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={() => setShow(false)} className="text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Fyi;
