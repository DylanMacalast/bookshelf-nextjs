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
            placeholder="Username"
            type="text"
            name="username"
            className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="p-2 bg-white rounded focus:shadow focus:border-none  outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-400 rounded shadow text-white p-2"
          >
            {pending ? 'Loading...' : 'Register'}
          </button>
        </div>
        <span className="text-red-400 text-xs">{state?.message}</span>
      </form>
    </div>
  );
};

export default RegisterForm;
