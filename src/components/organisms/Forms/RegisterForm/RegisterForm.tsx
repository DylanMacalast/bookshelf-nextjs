'use client';

import { useRouter } from 'next/navigation';
import { signup } from '../../../../actions/auth';
import { useFormState, useFormStatus } from 'react-dom';

const RegisterForm = () => {
  const inState = {
    message: ''
  };
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signup, inState);
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl text-center my-2 font-semibold">Register</h1>
      <form action={formAction}>
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            name="username"
            className="p-2 bg-white rounded"
            required
          />
          <input
            type="email"
            name="email"
            className="p-2 bg-white rounded"
            required
          />
          <input
            type="password"
            name="password"
            className="p-2 bg-white rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-400 rounded shadow text-white p-2"
          >
            Submit
          </button>
        </div>

        {state?.message}
      </form>
    </div>
  );
};

export default RegisterForm;
