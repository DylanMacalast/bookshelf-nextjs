import React from 'react';

const Input = ({ type = 'text', ...props }: { type?: string }) => {
  return <input type={type} {...props} className="input" />;
};

export default Input;
