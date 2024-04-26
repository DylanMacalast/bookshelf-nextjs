'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { addBook } from '../../../../actions/book';

const initialState = {
  message: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add Book
    </button>
  );
}

export function BookForm() {
  const [state, formAction] = useFormState(addBook, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="book">ISBN</label>
      {/* <input type="text" id="isbn" name="isbn" required />
      <input type="text" id="title" name="title" required />
      <input type="text" id="author" name="author" required />
      <input type="checkbox" id="hardback" name="hardback" required /> */}
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
