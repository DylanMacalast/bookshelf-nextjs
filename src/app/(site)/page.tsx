import React from 'react';
import { Button } from '../../components/atoms/Button';
import { RegisterForm } from '../../components/organisms/Forms/RegisterForm';

const page = async () => {
  return (
    <div>
      <Button />
      <RegisterForm />
    </div>
  );
};

export default page;