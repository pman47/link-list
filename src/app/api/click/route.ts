import DBConnect from "@/lib/dbConnect";
import { Event } from "@/models/Event";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqUrl = new URL(request.url);
  const queryParams = reqUrl.searchParams;
  const url = queryParams.get("url");
  const isAdmin = queryParams.get("isAdmin");

  if (isAdmin === "false") {
    await DBConnect();
    await Event.create({ type: "click", uri: url });
  }
  return Response.json(true);
}
