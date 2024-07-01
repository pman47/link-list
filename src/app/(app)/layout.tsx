import LogoutButton from "@/components/buttons/Logout";
import {
  faArrowLeft,
  faFileLines,
  faLineChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen">
          <aside className="bg-white w-48 p-4 shadow">
            <div className="rounded-full overflow-hidden w-24 aspect-square mx-auto relative">
              <Image src={session?.user?.image!} alt="avatar" fill />
            </div>
            <div className="text-center">
              <nav className="inline-flex flex-col mt-8 gap-6 text-gray-700">
                <Link className="flex gap-4 items-center" href={"/account"}>
                  <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faFileLines}
                    className="w-6 h-6"
                  />
                  <span>My Page</span>
                </Link>
                <Link className="flex gap-4 items-center" href={"/analytics"}>
                  <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faLineChart}
                    className="w-6 h-6"
                  />
                  <span>Analytics</span>
                </Link>
                <LogoutButton
                  className="flex gap-4 items-center text-gray-700"
                  iconLeft={true}
                  iconClasses={"w-6 h-6"}
                />
                <div className="h-[1px] bg-gray-300" />
                <Link className="flex gap-2 items-center text-xs" href={"/"}>
                  <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faArrowLeft}
                    className="w-3 h-3"
                  />
                  <span>Back to website</span>
                </Link>
              </nav>
            </div>
          </aside>
          <div className="grow">
            <div className="bg-white m-4 p-5 shadow">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
