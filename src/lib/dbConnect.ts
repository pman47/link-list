import mongoose from "mongoose";

export default async function DBConnect() {
  return mongoose.connect(process.env.MONGODB_URI!);
}
