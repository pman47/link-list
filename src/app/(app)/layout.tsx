import AppSideBar from "@/components/layout/AppSideBar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Lato } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import "../globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={lato.className}>
        <main className="flex min-h-screen">
          <aside className="bg-white w-48 p-4 shadow">
            <div className="rounded-full overflow-hidden w-24 aspect-square mx-auto relative">
              <Image src={session?.user?.image!} alt="avatar" fill />
            </div>
            <div className="text-center">
              <AppSideBar />
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
