import PageButtonsForm from "@/components/Forms/PageButtonsForm";
import PageSettingsForm from "@/components/Forms/PageSettingsForm";
import UsernameForm from "@/components/Forms/UsernameForm";
import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";

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
    return (
      <>
        <PageSettingsForm
          page={JSON.parse(JSON.stringify(page))}
          user={session.user}
        />
        <PageButtonsForm
          page={JSON.parse(JSON.stringify(page))}
          user={session.user}
        />
      </>
    );
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default Account;
