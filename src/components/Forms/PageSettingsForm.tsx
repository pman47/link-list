"use client";
import { savePageSettings } from "@/actions/pageActions";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import Image from "next/image";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import RadioTogglers from "../FormItems/RadioTogglers";

interface PageSettingsFormProps {
  page: PageType;
  user: Session["user"];
}

const PageSettingsForm: FC<PageSettingsFormProps> = ({ page, user }) => {
  const [bgType, setBgType] = useState<"color" | "image">(page.bgType);
  const [bgColor, setBgColor] = useState<string>(page.bgColor);

  async function saveBaseSettings(formData: FormData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved.");
    }
  }

  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div
          className="p-16 flex justify-center items-center"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <div>
            <RadioTogglers
              options={[
                {
                  value: "color",
                  icon: faPalette,
                  label: "Color",
                },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              defaultValue={bgType}
              onChange={(newBgType) => {
                setBgType(newBgType);
              }}
            />
            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex justify-center gap-2">
                  <span>Background color :</span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={(e) => setBgColor(e.target.value)}
                    defaultValue={bgColor}
                  />
                </div>
              </div>
            )}
          </div>
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
