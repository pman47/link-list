"use client";
import { cn } from "@/utils/cn";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faLineChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import LogoutButton from "../buttons/Logout";

interface AppSideBarProps {}

const AppSideBar: FC<AppSideBarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="inline-flex flex-col mt-8 gap-2 text-gray-500">
      <Link
        className={cn("flex gap-4 items-center p-2", {
          "text-blue-500": pathname === "/account",
        })}
        href={"/account"}
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="w-6 h-6"
        />
        <span>My Page</span>
      </Link>
      <Link
        className={cn("flex gap-4 items-center p-2", {
          "text-blue-500": pathname === "/analytics",
        })}
        href={"/analytics"}
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faLineChart}
          className="w-6 h-6"
        />
        <span>Analytics</span>
      </Link>
      <LogoutButton
        className="flex gap-4 items-center p-2  text-gray-500"
        iconLeft={true}
        iconClasses={"w-6 h-6"}
      />
      <div className="h-[1px] bg-gray-300" />
      <Link className="flex gap-2 items-center  text-xs" href={"/"}>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faArrowLeft}
          className="w-3 h-3"
        />
        <span>Back to website</span>
      </Link>
    </nav>
  );
};

export default AppSideBar;
