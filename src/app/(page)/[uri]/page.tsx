import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { allButtons } from "@/utils/allButtons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserPageProps {
  params: {
    uri: string;
  };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const uri = params.uri;

  await DBConnect();
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  return (
    <div className="bg-blue-950 text-white">
      <div
        className="h-36 bg-cover bg-center"
        style={{
          backgroundColor: page.bgColor,
        }}
      ></div>
      <div className="aspect-square h-36 w-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user?.image!}
          alt="avatar"
          width={128}
          height={128}
        />
      </div>
      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md gap-2 flex items-center justify-center text-white/70">
        <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
        <span>{page.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center mt-2">
        <h2>{page.bio}</h2>
      </div>
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            href={page.buttons[buttonKey]}
            className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center"
            key={buttonKey}
          >
            <FontAwesomeIcon
              icon={allButtons.find((button) => button.key === buttonKey)?.icon}
              className="w-6 h-6"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
