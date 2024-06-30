"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function grabUsername(formData: FormData) {
  const username = formData.get("username");
  mongoose.connect(process.env.MONGODB_URI!);

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
  });
  return JSON.parse(JSON.stringify(pageDoc));
}
