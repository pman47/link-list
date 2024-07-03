"use client";

import { savePageButtons } from "@/actions/pageActions";
import {
  faGripLines,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";
import { allButtons } from "@/utils/allButtons";

interface PageButtonsFormProps {
  page: PageType;
  user: Session["user"];
}

const PageButtonsForm: FC<PageButtonsFormProps> = ({ page }) => {
  const pageSavedButtonKeys = Object.keys(page?.buttons || {});
  const pageSavedButtonInfo = pageSavedButtonKeys
    .map((buttonKey) => allButtons.find((button) => button.key === buttonKey))
    .filter((button): button is Button => button !== undefined);

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
        <ReactSortable
          handle={".handle"}
          list={activeButton as any}
          setList={setActiveButton as any}
        >
          {activeButton.map((b) => (
            <div className="mb-4 md:flex items-center" key={b.key}>
              <div className="w-52 flex p-2 gap-2 items-center text-gray-700">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="handle h-4 w-4 cursor-pointer text-gray-400"
                />
                <FontAwesomeIcon icon={b.icon} className="h-4 w-4" />
                <span>{b.label} :</span>
              </div>
              <div className="grow flex">
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
            </div>
          ))}
        </ReactSortable>
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
        <div className="mt-4 border-t pt-4 w-full">
          <SubmitButton className="mx-auto max-w-xs">
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
