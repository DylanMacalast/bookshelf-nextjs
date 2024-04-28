'use client';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { addBook } from '../../../../actions/book';
import Fyi from '../../../atoms/FYI/fyi';
import FormSubmit from '../../../atoms/FormSubmit/FormSubmit';

const initialState = {
  message: ''
};

export function BookForm() {
  const [state, formAction] = useFormState(addBook, initialState);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-500 my-4">
        Manage Books!
      </h1>
      <form action={formAction} className="flex flex-col space-y-2">
        <input
          type="text"
          id="isbn"
          name="isbn"
          className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
          placeholder="ISBN Number"
          required
        />
        <input
          type="text"
          id="title"
          name="title"
          className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          id="author"
          name="author"
          className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
          placeholder="Author"
          required
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="hardback" className="text-black-500 font-bold">
            Is Hardback?
          </label>
          <input
            type="checkbox"
            id="hardcover"
            name="hardcover"
            value="true"
            className="w-5 h-5 text-blue-500 rounded"
          />
        </div>
        <FormSubmit setShowPopup={setShowPopup} buttonText="Add Book" />
        {state.message != '' && (
          <Fyi
            message={state.message}
            show={showPopup}
            setShow={setShowPopup}
          />
        )}
      </form>
    </div>
  );
}
