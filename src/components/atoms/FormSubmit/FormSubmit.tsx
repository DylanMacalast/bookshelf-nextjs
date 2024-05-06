'use client';
import { useFormStatus } from 'react-dom';

interface FormSubmitProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  doStuff: () => void;
}

function FormSubmit({ setShowPopup, doStuff, buttonText }: FormSubmitProps) {
  const { pending } = useFormStatus();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    doStuff();

    setShowPopup(true);
    e.currentTarget.form?.requestSubmit();
  };

  return (
    <button
      type="submit"
      className="bg-blue-400 rounded shadow text-white p-2"
      disabled={pending}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

export default FormSubmit;
