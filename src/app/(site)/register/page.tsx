import React from 'react';
import { RegisterForm } from '../../../components/organisms/Forms/RegisterForm';

const page = () => {
  return (
    <div>
      <h1>Register</h1>
      <div className="w-3/4 mx-auto bg-gray-100/50 p-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
