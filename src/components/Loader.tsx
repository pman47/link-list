import { cn } from "@/utils/cn";
import { FC } from "react";

interface LoaderProps {
  divCSS?: string;
  svgCSS?: string;
  textCSS?: string;
  showText?: boolean;
  text?: string;
}

const Loader: FC<LoaderProps> = ({
  divCSS,
  svgCSS,
  textCSS,
  showText = true,
  text = "Loading...",
}) => {
  return (
    <div
      aria-label={text}
      role="status"
      className={cn("flex items-center space-x-2", divCSS)}
    >
      <svg
        className={cn("h-16 w-16 animate-spin stroke-gray-500", svgCSS)}
        viewBox="0 0 256 256"
      >
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
      {showText && (
        <span className={cn("text-4xl font-medium text-gray-500", textCSS)}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loader;
