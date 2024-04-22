'use client';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useFormContext } from 'react-hook-form';

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
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type={type}
        className="bg-gray-100/50 rounded-md shadow p-2"
        {...register(name, {
          required: {
            value: required,
            message: requiredMessage
              ? requiredMessage
              : 'This field is required'
          }
        })}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span className="text-red-700 text-xs">{message}</span>
        )}
      />
    </div>
  );
};

export default FormInput;
