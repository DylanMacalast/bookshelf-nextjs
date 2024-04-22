'use client';
import { log } from 'console';
import { userRepo } from '../../../../app/_helpers/server/user-repo';
import { FormInput } from '../../../atoms/FormInput';
import { RegisterFormInputs } from './types';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

const RegisterForm = () => {
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
    const res = fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(await res);
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
        <button type="submit">Register</button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
