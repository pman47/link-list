import { FC } from "react";
import SectionBox from "../layout/SectionBox";
import { Session } from "next-auth";

interface PageButtonsFormProps {
  page: PageType;
  user: Session["user"];
}

const PageButtonsForm: FC<PageButtonsFormProps> = ({}) => {
  return <SectionBox>Buttons here</SectionBox>;
};

export default PageButtonsForm;
