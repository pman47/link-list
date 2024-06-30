"use client";

import { DefaultSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FC, SyntheticEvent } from "react";

interface HeroFormProps {
  user: DefaultSession["user"];
}

const HeroForm: FC<HeroFormProps> = ({ user }) => {
  const router = useRouter();

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        await signIn("google", {
          callbackUrl: "/account?desiredUsername=" + username,
        });
      }
    }
  };

  return (
    <form
      action=""
      className="inline-flex items-center shadow-lg shadow-gray-700/20"
      onSubmit={handleSubmit}
    >
      <span className="bg-white p-4 pr-0">linklist.to/</span>
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        className="py-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-4 px-6">
        Join for free
      </button>
    </form>
  );
};

export default HeroForm;
