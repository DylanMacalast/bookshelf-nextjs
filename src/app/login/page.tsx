import React from 'react';
import { LoginForm } from '../../components/organisms/Forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="m-3">
      <div className="w-3/4 mx-auto bg-gray-100/50 p-5">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
