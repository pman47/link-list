import PageButtonsForm from "@/components/Forms/PageButtonsForm";
import PageLinksForm from "@/components/Forms/PageLinksForm";
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
  if (session?.user?.email) {
    const page = await Page.findOne({ owner: session.user.email });

    const leanPage = JSON.parse(JSON.stringify(page));

    if (page) {
      return (
        <>
          <PageSettingsForm page={leanPage} user={session.user} />
          <PageButtonsForm page={leanPage} user={session.user} />
          <PageLinksForm page={leanPage} user={session.user} />
        </>
      );
    }
  }

  return (
    <div className="flex items-center justify-center h-96">
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default Account;
