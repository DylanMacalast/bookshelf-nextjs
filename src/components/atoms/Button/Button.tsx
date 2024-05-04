'use client';
const Button = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={clickHandler}
    >
      Click me
    </button>
  );
};

export default Button;
