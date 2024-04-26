'use client';
import React from 'react';

const FormInput = ({
  name,
  required,
  requiredMessage,
  label,
  type
}: {
  name: string;
  required: boolean;
  requiredMessage?: string;
  label?: string;
  type: 'text' | 'email' | 'password';
}) => {
  return <div className="flex flex-col gap-3"></div>;
};

export default FormInput;
