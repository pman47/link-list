"use server";

import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData: FormData) {
  await DBConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const dataToUpdate: { [key: string]: any } = {};

    const dataKeys = ["displayName", "location", "bio", "bgType", "bgColor"];

    dataKeys.forEach((key) => {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    });

    dataToUpdate.bgType = "color";
    await Page.updateOne({ owner: session?.user?.email! }, dataToUpdate);

    if (formData.has("avatar")) {
      const avatarLink = formData.get("avatar");
      await User.findByIdAndUpdate(
        {
          email: session?.user?.email!,
        },
        {
          image: avatarLink,
        }
      );
    }

    return true;
  }
  return false;
}
