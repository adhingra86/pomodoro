import { ReactElement } from "react";

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
};

export const Button = ({ buttonText, onClick }: ButtonProps): ReactElement => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-700 text-white py-2 px-7 rounded-lg"
    >
      {buttonText}
    </button>
  );
};
