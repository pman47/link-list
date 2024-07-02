"use server";

import { authOptions } from "@/lib/auth";
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
    // const bgType = formData.get("bgType");
    const bgType = "color";
    const bgColor = formData.get("bgColor");
    await Page.updateOne(
      { owner: session?.user?.email! },
      {
        displayName,
        location,
        bio,
        bgType,
        bgColor,
      }
    );
    return true;
  }
  return false;
}
