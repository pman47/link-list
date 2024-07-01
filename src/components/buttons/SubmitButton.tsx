import { FC } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-blue-500 disabled:bg-blue-200 text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center rounded-md"
      type="submit"
      disabled={pending}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
