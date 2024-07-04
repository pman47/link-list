"use client";

import { DefaultSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, SyntheticEvent, useState } from "react";

interface HeroFormProps {
  user: DefaultSession["user"];
}

const HeroForm: FC<HeroFormProps> = ({ user }) => {
  const router = useRouter();
  const [processing, setProcessing] = useState<boolean>(false);

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
        setProcessing(true);
        await signIn("google", {
          redirect: true,
          callbackUrl: "/account?desiredUsername=" + username,
        }).finally(() => {
          setProcessing(false);
        });
      }
    }
  };

  return (
    <form
      action=""
      className="inline-flex items-center shadow-lg shadow-gray-700/20 bg-white"
      onSubmit={handleSubmit}
    >
      <span className="bg-white p-4 pr-0">linklist.to/</span>
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        style={{
          backgroundColor: "white",
          marginBottom: 0,
          paddingLeft: 0,
        }}
        className="outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-4 px-6 whitespace-nowrap disabled:bg-blue-300"
        disabled={processing}
      >
        Join for free
      </button>
    </form>
  );
};

export default HeroForm;
