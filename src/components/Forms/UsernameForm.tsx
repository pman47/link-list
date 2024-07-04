"use client";
import grabUsername from "@/actions/grabUsername";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import RightIcon from "../icons/RightIcon";

interface UsernameFormProps {
  desiredUsername: string;
}

const UsernameForm: FC<UsernameFormProps> = ({ desiredUsername }) => {
  const router = useRouter();
  const [taken, setTaken] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await grabUsername(formData);
    setTaken(result === false);
    if (result) {
      router.refresh();
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
