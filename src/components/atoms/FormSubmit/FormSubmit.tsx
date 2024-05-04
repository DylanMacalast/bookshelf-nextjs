'use client';
import { useFormStatus } from 'react-dom';

interface FormSubmitProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
}

function FormSubmit({ setShowPopup, buttonText }: FormSubmitProps) {
  const { pending } = useFormStatus();
  const handleClick = () => {
    setShowPopup(true);
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
