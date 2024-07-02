import { FC } from "react";

interface SectionBoxProps extends React.ComponentProps<"div"> {}

const SectionBox: FC<SectionBoxProps> = ({ children }) => {
  return <div className="bg-white m-8 p-4 shadow">{children}</div>;
};

export default SectionBox;
