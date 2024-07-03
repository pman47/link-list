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
import SectionBox from "../layout/SectionBox";

interface PageSettingsFormProps {
  page: PageType;
  user: Session["user"];
}

const PageSettingsForm: FC<PageSettingsFormProps> = ({ page, user }) => {
  const [bgType, setBgType] = useState<string>(page.bgType);
  const [bgColor, setBgColor] = useState<string>(page.bgColor);

  async function saveBaseSettings(formData: FormData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved.");
    }
  }

  // function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target?.files?.[0];
  //   if (file) {
  //     const data = new FormData();
  //     data.set("file", file);

  //     fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((response) => response.json())
  //       .then((link) => {
  //         console.log("link ==>>", link);
  //       });
  //   }
  // }

  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-4 -m-4 min-h-[280px] flex justify-center items-center"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div>
              {/* <RadioTogglers
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
            /> */}
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
              {/* {bgType === "image" && (
              <div className="flex justify-center">
                <label className="bg-white shadow px-4 py-2 mt-2">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  Change Image
                </label>
              </div>
            )} */}
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
          <div className="p-0">
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
            <div className="w-full max-w-xs mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
};

export default PageSettingsForm;
