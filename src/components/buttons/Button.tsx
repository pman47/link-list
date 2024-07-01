import { cn } from "@/utils/cn";
import { FC } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  size = "medium",
  isLoading = false,
  children,
  ...rest
}) => {
  const baseStyles =
    "rounded-lg cursor-pointer select-none transition-all duration-150 bg-blue-500 border-blue-400 text-white";

  const sizeStyles = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-5 text-lg",
  };
  const shadowColors = "[box-shadow:0_5px_0_0_#1b6ff8]";
  const activeShadowColors = "active:[box-shadow:0_0px_0_0_#1b6ff8]";

  const activeStyles = "active:translate-y-1 active:border-b-[0px]";
  const defaultBorder = "border-b-[1px]";

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        activeStyles,
        shadowColors,
        activeShadowColors,
        defaultBorder,
        className
      )}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
