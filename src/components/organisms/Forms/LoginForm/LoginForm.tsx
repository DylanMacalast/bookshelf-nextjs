'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../../../../actions/auth';
import Link from 'next/link';

const LoginForm = () => {
  const inState = {
    message: ''
  };
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(login, inState);

  const router = useRouter();

  return (
    <div className="max-w-md w-full">
      <h1 className="text-3xl text-center my-2 font-semibold">Login</h1>
      <form action={formAction} className="mt-5">
        <div className="grid grid-cols-1 gap-3">
          <input
            placeholder="Username"
            type="text"
            name="username"
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
          <div>
            <Link href="#">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="bg-blue-400 rounded shadow text-white p-2 "
          >
            {pending ? 'Loading...' : 'Login'}
          </button>
          <div>
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500 font-bold">
              Register
            </Link>
          </div>
        </div>
        <span className="text-red-400 text-xs">{state?.message}</span>
      </form>
    </div>
  );
};

export default LoginForm;
