'use client';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Fyi from '../../../atoms/FYI/fyi';
import FormSubmit from '../../../atoms/FormSubmit/FormSubmit';
import { addShelf } from '../../../../actions/shelf';

const initialState = {
  message: ''
};

interface ShelfFormProps {
  shelf?: {
    id?: string;
    title?: string;
    description?: string;
    public?: boolean;
  };
}

export function ShelfForm({ shelf = {} }: ShelfFormProps) {
  const [state, formAction] = useFormState(addShelf, initialState);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-500 my-4">
        {shelf?.id ? 'Edit Shelf' : 'Create Shelf'}
      </h1>
      {shelf && !isEditing && (
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          EDIT DETAILS
        </button>
      )}
      {shelf && isEditing && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditing(false)}
        >
          CANCEL
        </button>
      )}
      <form action={formAction} className="flex flex-col space-y-2">
        <input
          type="hidden"
          id="shelfId"
          name="shelfId"
          value={shelf?.id || 'new'}
        />
        <input
          type="text"
          id="title"
          name="title"
          className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
          placeholder="Shelf Title"
          defaultValue={shelf?.title || ''}
          required
          disabled={shelf && !isEditing}
        />
        <input
          type="text"
          id="description"
          name="description"
          className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
          placeholder="Shelf Description"
          defaultValue={shelf?.description || ''}
          required
          disabled={shelf && !isEditing}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="hardback" className="text-black-500 font-bold">
            Is This a Public Shelf?
          </label>
          <input
            type="checkbox"
            id="public"
            name="public"
            value="true"
            className="w-5 h-5 text-blue-500 rounded"
            defaultChecked={shelf?.public || false}
            disabled={shelf && !isEditing}
          />
        </div>
        {(shelf == null || isEditing) && (
          <FormSubmit
            setShowPopup={setShowPopup}
            doStuff={() => setIsEditing(false)}
            buttonText={shelf == null ? 'Save Shelf' : 'Update Shelf Details'}
          />
        )}
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
