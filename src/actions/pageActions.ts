"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData: FormData) {
  await DBConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const displayName = formData.get("displayName");
    const location = formData.get("location");
    const bio = formData.get("bio");
    await Page.updateOne(
      { owner: session?.user?.email! },
      {
        displayName,
        location,
        bio,
      }
    );
    return true;
  }
  return false;
}
