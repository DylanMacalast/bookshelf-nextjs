import React from 'react';
import { LoginForm } from '../../components/organisms/Forms/LoginForm';
import { UNLoginIcon } from '../../components/atoms/Icons';

const LoginPage = () => {
  return (
    <div className="m-3 flex  items-center py-20">
      <div className="grid grid-cols-2   border shadow rounded w-full">
        <div className="lg:col-span-1 col-span-2 flex justify-center items-center p-3 rounded-l-md">
          <UNLoginIcon className="lg:w-[332px] lg:h-[404px] h-[200px]" />
        </div>
        <div className="lg:col-span-1 col-span-2 flex justify-center items-center bg-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
