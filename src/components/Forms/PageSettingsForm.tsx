import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import RadioTogglers from "../FormItems/RadioTogglers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

interface PageSettingsFormProps {
  page: PageType;
}

const PageSettingsForm: FC<PageSettingsFormProps> = async ({ page }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="-m-4">
      <form action="">
        <div className="bg-gray-300 p-16 h-32 flex justify-center items-center">
          <RadioTogglers
            options={[
              {
                value: "color",
                icon: faPalette,
                label: "Color",
              },
              { value: "image", icon: faImage, label: "Image" },
            ]}
          />
        </div>
        <div className="flex justify-center -mb-12">
          <Image
            className="rounded-full relative -top-8 border-white border-4 shadow shadow-black/50"
            src={session?.user?.image!}
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="p-4">
          <label htmlFor="nameIn" className="inputLabel">
            Display name
          </label>
          <input type="text" id="nameIn" placeholder="Pablo Escobar" />
          <label htmlFor="locationIn" className="inputLabel">
            Location
          </label>
          <input
            type="text"
            id="locationIn"
            placeholder="Somewhere in my own peaceful world."
          />
          <label htmlFor="bioIn" className="inputLabel">
            Bio
          </label>
          <textarea name="" id="bioIn" placeholder="Your bio goes here..." />
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
