"use client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";

interface LoginWithGoogleProps {}

const LoginWithGoogle: FC<LoginWithGoogleProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    return await signIn("google", {
      redirect: true,
      callbackUrl: "/account",
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center disabled:bg-gray-200 disabled:blur-[1px]"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-6" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
