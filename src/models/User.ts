import { InferSchemaType, model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: String,
});

type User = InferSchemaType<typeof UserSchema>;
export const User = models?.User || model<User>("User", UserSchema);
