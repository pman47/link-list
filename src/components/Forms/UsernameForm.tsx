"use client";
import grabUsername from "@/actions/grabUsername";
import { FC, useState } from "react";
import RightIcon from "../icons/RightIcon";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

interface UsernameFormProps {
  desiredUsername: string;
}

const UsernameForm: FC<UsernameFormProps> = ({ desiredUsername }) => {
  const [taken, setTaken] = useState(false);

  async function handleSubmit(formData: FormData) {
    const username = formData.get("username");
    const result = await grabUsername(formData);
    setTaken(result === false);
    if (result) {
      redirect("/account?created=" + username);
    }
  }

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className="block p-2 mx-auto border w-full mb-2 text-center"
          defaultValue={desiredUsername}
          type="text"
          placeholder="username"
        />
        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
            Taken username
          </div>
        )}
        <SubmitButton>
          <span>Claim your username</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
};

export default UsernameForm;
