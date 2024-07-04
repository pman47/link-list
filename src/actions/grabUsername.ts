"use server";

import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/dbConnect";
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";

export default async function grabUsername(formData: FormData) {
  const username = formData.get("username");

  await DBConnect();
  const existingPageDoc = await Page.findOne({
    uri: username,
  });

  if (existingPageDoc) {
    return false;
  }

  const session = await getServerSession(authOptions);

  const pageDoc = await Page.create({
    uri: username,
    owner: session?.user?.email,
    displayName: session?.user?.name,
  });
  return JSON.parse(JSON.stringify(pageDoc));
}
