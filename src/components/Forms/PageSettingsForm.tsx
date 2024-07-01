"use client";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import SubmitButton from "../buttons/SubmitButton";
import RadioTogglers from "../FormItems/RadioTogglers";
import { savePageSettings } from "@/actions/pageActions";

interface PageSettingsFormProps {
  page: PageType;
  user: Session["user"];
}

const PageSettingsForm: FC<PageSettingsFormProps> = ({ page, user }) => {
  async function saveBaseSettings(formData: FormData) {
    try {
      const result = await savePageSettings(formData);
      console.log({ result });
    } catch (error) {}
  }

  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
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
            src={user?.image!}
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="p-4">
          <label htmlFor="nameIn" className="inputLabel">
            Display name
          </label>
          <input
            type="text"
            id="nameIn"
            placeholder="Pablo Escobar"
            name="displayName"
            defaultValue={page.displayName}
          />
          <label htmlFor="locationIn" className="inputLabel">
            Location
          </label>
          <input
            type="text"
            id="locationIn"
            placeholder="Somewhere in my own peaceful world."
            name="location"
            defaultValue={page.location}
          />
          <label htmlFor="bioIn" className="inputLabel">
            Bio
          </label>
          <textarea
            id="bioIn"
            placeholder="Your bio goes here..."
            name="bio"
            defaultValue={page.bio}
          />
          <div className="max-w-[100px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
