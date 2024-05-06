import React, { ReactNode } from 'react';

const CustomError = ({
  errorCode,
  errorMessage,
  action
}: {
  errorCode: number;
  errorMessage: string;
  action?: ReactNode;
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-4xl font-bold">{errorCode}</h2>
      <p>{errorMessage}</p>
      {action && action}
    </div>
  );
};

export default CustomError;
