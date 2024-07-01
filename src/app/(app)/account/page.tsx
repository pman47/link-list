import PageSettingsForm from "@/components/Forms/PageSettingsForm";
import UsernameForm from "@/components/Forms/UsernameForm";
import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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

  await DBConnect();
  const page = await Page.findOne({ owner: session.user?.email });

  if (page) {
    return <PageSettingsForm page={page} />;
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default Account;
