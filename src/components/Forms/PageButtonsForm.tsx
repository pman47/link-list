"use client";

import { savePageButtons } from "@/actions/pageActions";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMobile,
  faPlus,
  faSave,
  faTrash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";

interface PageButtonsFormProps {
  page: PageType;
  user: Session["user"];
}

interface Button {
  key: string;
  label: string;
  icon: IconDefinition;
  placeholder: string;
}

const PageButtonsForm: FC<PageButtonsFormProps> = ({ page }) => {
  const pageSavedButtonKeys = Object.keys(page.buttons);
  const pageSavedButtonInfo = allButtons.filter((button) =>
    pageSavedButtonKeys.includes(button.key)
  );

  const [activeButton, setActiveButton] =
    useState<Button[]>(pageSavedButtonInfo);

  function addButtonToProfile(button: Button) {
    setActiveButton((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  function removeButton({ key: buttonKeyToRemove }: Button) {
    setActiveButton((prevButtons) =>
      prevButtons.filter((button) => button.key !== buttonKeyToRemove)
    );
  }

  const availableButtons = useMemo(() => {
    return allButtons.filter(
      (b1) => !activeButton.find((b2) => b1.key === b2.key)
    );
  }, [allButtons, activeButton]);

  async function saveButtons(formData: FormData) {
    const result = await savePageButtons(formData);
    if (result) {
      toast.success("Settings Saved.");
    }
  }

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        {activeButton.map((b) => (
          <div className="mb-4 flex items-center">
            <div className="w-40 flex p-2 gap-2 items-center text-gray-700">
              <FontAwesomeIcon icon={b.icon} className="h-4 w-4" />
              <span>{b.label} :</span>
            </div>
            <input
              type={"text"}
              style={{ marginBottom: 0 }}
              placeholder={b.placeholder}
              name={b.key}
              defaultValue={page.buttons[b.key]}
            />
            <button
              onClick={() => removeButton(b)}
              type="button"
              className="p-2 bg-gray-300 py-2 px-4 cursor-pointer hover:bg-red-300 duration-200"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        ))}
        {availableButtons.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
            {availableButtons.map((b) => (
              <button
                type="button"
                onClick={() => addButtonToProfile(b)}
                key={b.key}
                className="flex p-2 bg-gray-200 items-center flex-grow max-w-40 gap-2 justify-between"
              >
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={b.icon} className="h-4 w-4" />
                  <span>{b.label}</span>
                </div>
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
        <div className="mt-4 border-t pt-4">
          <div className="w-full max-w-xs mx-auto ">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;

const allButtons: Button[] = [
  {
    key: "email",
    label: "E-mail",
    icon: faEnvelope,
    placeholder: "demo@gmail.com",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: faMobile,
    placeholder: "+91 12345-67890",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/profile/...",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/...",
  },
  {
    key: "discord",
    label: "Discord",
    icon: faDiscord,
    placeholder: "https://discord.com/invite/...",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: faYoutube,
    placeholder: "https://youtube.com/channel/...",
  },
  {
    key: "github",
    label: "GitHub",
    icon: faGithub,
    placeholder: "https://github.com/username",
  },
  {
    key: "whatsapp",
    label: "Whatsapp",
    icon: faWhatsapp,
    placeholder: "+91 12345-67890",
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: faTelegram,
    placeholder: "https://telegram.me/username",
  },
];
