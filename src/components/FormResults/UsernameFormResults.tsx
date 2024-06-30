import { FC } from "react";

interface UsernameFormResultsProps {}

const UsernameFormResults: FC<UsernameFormResultsProps> = ({}) => {
  return (
    <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
      Taken username
    </div>
  );
};

export default UsernameFormResults;
