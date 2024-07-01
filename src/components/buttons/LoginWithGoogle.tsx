"use client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { FC } from "react";

interface LoginWithGoogleProps {}

const LoginWithGoogle: FC<LoginWithGoogleProps> = ({}) => {
  return (
    <button
      onClick={() =>
        signIn("google", {
          redirect: true,
          callbackUrl: "/account",
        })
      }
      className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-6" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
