import Link from "next/link";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl mx-auto flex justify-between px-6">
        <div className="flex gap-6">
          <Link href={"/"}>LinkList</Link>
          <nav className="flex  items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <nav className="flex gap-2 text-sm text-slate-500">
          <Link href={"/login"}>Sign in</Link>
          <Link href={"/login"}>Create Account</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
