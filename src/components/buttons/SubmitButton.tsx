import { FC } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import { cn } from "@/utils/cn";

interface SubmitButtonProps extends React.ComponentProps<"button"> {}

const SubmitButton: FC<SubmitButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(
        "bg-blue-500 disabled:bg-blue-200 text-white disabled:text-gray-400 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center rounded-md",
        className
      )}
      type="submit"
      disabled={pending}
      {...rest}
    >
      {pending ? <span>Saving...</span> : children}
    </Button>
  );
};

export default SubmitButton;
