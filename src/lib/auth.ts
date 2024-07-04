import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET!,
};
