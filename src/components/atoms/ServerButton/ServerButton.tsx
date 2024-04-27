'use client';
// A button that will take in a server action and a button text. Typically used for delete buttons and like buttons
interface ServerButtonProps {
  serverAction: (id: string) => void;
  buttonText: string;
  bid: string;
}

function ServerButton({ serverAction, buttonText, bid }: ServerButtonProps) {
  const handleClick = () => {
    serverAction(bid);
  };

  return (
    <button
      className="bg-blue-400 rounded shadow text-white p-2"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

export default ServerButton;
