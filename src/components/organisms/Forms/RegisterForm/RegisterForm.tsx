'use client';

import { FormInput } from '../../../atoms/FormInput';
import { RegisterFormInputs } from './types';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();
  const defaultValues: RegisterFormInputs = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  };
  const methods = useForm({
    mode: 'onChange',
    shouldUnregister: false,
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    values: defaultValues,
    resetOptions: {
      keepDirtyValues: true
    }
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data?.password !== data?.confirm_password) {
      setPasswordError(true);
      return;
    }
    setLoading(true);
    const res = fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await res;
    if (response.status !== 200) {
      setPasswordError(false);
      setLoading(false);
    }
    setPasswordError(false);
    setLoading(false);
    router.push('/home');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="col-span-1">
            <FormInput
              type="text"
              label="Name"
              name="username"
              required
              requiredMessage="This field is required"
            />
          </div>

          <div className="col-span-1">
            <FormInput
              type="email"
              label="Email"
              name="email"
              required
              requiredMessage="This field is required"
            />
          </div>
          <div className="col-span-1">
            <FormInput
              type="password"
              label="Password"
              name="password"
              required
              requiredMessage="This field is required"
            />
          </div>
          <div className="col-span-1">
            <FormInput
              type="password"
              label="Confirm Password"
              name="confirm_password"
              required
              requiredMessage="This field is required"
            />
          </div>
        </div>
        <div className="col-span-2 my-1">
          {passwordError && (
            <span className="text-red-400 text-xs">
              Please make sure passwords match
            </span>
          )}
        </div>

        <button
          type="submit"
          className="rounded bg-blue-300 shadow p-2 text-white ml-auto"
        >
          {loading ? 'loading...' : 'Register'}
        </button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
