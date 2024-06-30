import UsernameForm from "@/components/Forms/UsernameForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";

interface AccountProps {
  searchParams: {
    desiredUsername: string;
  };
}

const Account: FC<AccountProps> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams.desiredUsername;

  if (!session) {
    redirect("/");
  }

  const page = await Page.findOne({ owner: session.user?.email });

  if (page) {
    return <div className="">Your page is: /{page.uri}</div>;
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default Account;
