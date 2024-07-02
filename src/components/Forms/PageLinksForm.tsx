"use client";
import { savePageLinks } from "@/actions/pageActions";
import {
  faGripLines,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";

interface PageLinksFormProps {
  page: PageType;
  user: Session["user"];
}

const PageLinksForm: FC<PageLinksFormProps> = ({ page }) => {
  const [links, setLinks] = useState<Link[]>(page?.links || []);

  async function save() {
    const result = await savePageLinks(links);
    if (result) {
      toast.success("Saved!");
    }
  }

  function addNewLink() {
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        key: Date.now().toString(),
        title: "",
        subtitle: "",
        url: "",
      },
    ]);
  }

  function handleLinkChange(
    key: string,
    prop: keyof Link,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setLinks((prev) =>
      prev.map((link) => {
        if (link.key === key) {
          link[prop] = ev.target.value;
        }
        return link;
      })
    );
  }

  function removeLink(key: string) {
    setLinks((prev) => prev.filter((link) => link.key !== key));
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
          onClick={addNewLink}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="h-4 w-4 bg-blue-500 text-white p-1 rounded-full aspect-square"
          />
          <span>Add new</span>
        </button>
        <ReactSortable
          handle={".handle"}
          list={links as any}
          setList={setLinks as any}
        >
          {links.map((link) => (
            <div
              className="mt-4 flex gap-6 items-center border-[1px] p-4 rounded-md"
              key={link.key}
            >
              <div className="handle">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="text-gray-500 mr-2 cursor-ns-resize"
                />
              </div>
              <div className="grow">
                <label htmlFor="" className="inputLabel">
                  Title:
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="title"
                  onChange={(ev) => handleLinkChange(link.key, "title", ev)}
                  value={link.title}
                />
                <label htmlFor="" className="inputLabel">
                  Sub title:
                </label>
                <input
                  type="text"
                  placeholder="subtitle (optional)"
                  onChange={(ev) => handleLinkChange(link.key, "subtitle", ev)}
                  value={link.subtitle}
                />
                <label htmlFor="" className="inputLabel">
                  Url:
                </label>
                <input
                  type="text"
                  placeholder="url"
                  onChange={(ev) => handleLinkChange(link.key, "url", ev)}
                  value={link.url}
                />
                <button
                  type="button"
                  className="bg-red-100 p-2 h-full flex gap-2 items-center ml-auto rounded border border-red-200"
                  onClick={() => removeLink(link.key)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-black h-4 w-4"
                  />
                  <span>Remove this link</span>
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="mx-auto max-w-xs">
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
