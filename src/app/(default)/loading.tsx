import Loader from "@/components/Loader";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
