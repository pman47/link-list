import DBConnect from "@/lib/dbConnect";
import { Event } from "@/models/Event";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqUrl = new URL(request.url);
  const queryParams = reqUrl.searchParams;
  const url = atob(queryParams.get("url") || "");
  const isAdmin = queryParams.get("isAdmin");
  const page = queryParams.get("page");

  if (isAdmin === "false") {
    await DBConnect();
    await Event.create({ type: "click", uri: url, page: page });
  }
  return Response.json(true);
}
