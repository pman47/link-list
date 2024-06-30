import { InferSchemaType, model, models, Schema } from "mongoose";

const PageSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
      min: 1,
      unique: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type Page = InferSchemaType<typeof PageSchema>;
export const Page = models?.Page || model<Page>("Page", PageSchema);
