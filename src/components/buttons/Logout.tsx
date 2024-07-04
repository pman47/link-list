"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import Loader from "../Loader";

interface LogoutButtonProps {
  className?: string;
  iconLeft?: boolean;
  iconClasses?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({
  className = "flex gap-2 items-center border p-2 px-4 shadow rounded",
  iconLeft = false,
  iconClasses = "",
}) => {
  const [processing, setProcessing] = useState<boolean>(false);

  const handleLogOut = () => {
    setProcessing(true);
    signOut().finally(() => {
      setProcessing(false);
    });
  };

  return (
    <button onClick={handleLogOut} className={className} disabled={processing}>
      {processing ? (
        <Loader
          showText={false}
          divCSS={"w-full items-center justify-center"}
          svgCSS={"h-6 w-6"}
        />
      ) : (
        <>
          {iconLeft && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={iconClasses}
            />
          )}
          <span>Logout</span>
          {!iconLeft && (
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={iconClasses}
            />
          )}
        </>
      )}
    </button>
  );
};

export default LogoutButton;
