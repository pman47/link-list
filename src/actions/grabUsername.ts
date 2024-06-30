"use server";

import { Page } from "@/models/Page";
import mongoose from "mongoose";
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

  const pageDoc = await Page.create({ uri: username });
  return JSON.parse(JSON.stringify(pageDoc));
}
