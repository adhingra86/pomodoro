import { ReactElement } from "react";

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
  backgroundColor?: string;
};

export const Button = ({
  buttonText,
  onClick,
  backgroundColor,
}: ButtonProps): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`${
        backgroundColor || "bg-gray-500"
      }  text-white py-2 px-7 rounded-lg`}
    >
      {buttonText}
    </button>
  );
};
