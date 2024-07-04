import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/dbConnect";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { allButtons } from "@/utils/allButtons";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserPageProps {
  params: {
    uri: string;
  };
}

function buttonLink(key: string, value: string) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  if (key === "whatsapp") {
    return `https://wa.me/${value}`;
  }
  return value;
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const uri = params.uri;

  await DBConnect();
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  const isAdmin = session?.user?.email === page?.owner;

  if (!isAdmin) {
    await Event.create({
      uri: uri,
      type: "view",
    });
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-36 bg-cover bg-center"
        style={{
          backgroundColor: page.bgColor,
        }}
      ></div>
      <div className="aspect-square h-36 w-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user?.image || "/default-profile-pic.jpg"}
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
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
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
      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map((link: Link) => (
          <Link
            target="_blank"
            href={link.url}
            className="bg-indigo-800 p-2 flex"
            key={link.key}
            ping={
              "/api/click?url=" +
              btoa(link.url) +
              "&isAdmin=" +
              isAdmin +
              "&page=" +
              page.uri
            }
          >
            <div className="bg-blue-700 p-1 relative -left-4 flex items-center justify-center w-16 h-16">
              <FontAwesomeIcon icon={faLink} className="w-6 h-6" />
            </div>
            <div className="flex-1 flex-row items-center justify-center">
              <h3>{link.title}</h3>
              <h3 className="text-white/50">{link.subtitle}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
