import { authOptions } from "@/lib/auth";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import LogoutButton from "./buttons/Logout";

interface HeaderProps {}

const Header: FC<HeaderProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl mx-auto flex justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-blue-700">
            <FontAwesomeIcon icon={faLink} className="text-blue-500" />
            <span className="font-bold">LinkList</span>
          </Link>
          <nav className="flex  items-center gap-4 text-slate-500 text-sm">
            {/* <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link> */}
          </nav>
        </div>

        <nav className="flex gap-4 text-sm text-slate-500 items-center">
          {!!session && (
            <>
              <Link href={"/account"}>Hello, {session?.user?.name}</Link>
              <LogoutButton className="flex gap-2 items-center border p-2 px-4 rounded-full" />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign in</Link>
              <Link href={"/login"}>Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
