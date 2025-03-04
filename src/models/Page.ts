import { InferSchemaType, model, models, Schema } from "mongoose";

export const PageSchema = new Schema(
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
    displayName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    bgType: {
      type: String,
      default: "color",
    },
    bgColor: {
      type: String,
      default: "black",
    },
    buttons: {
      type: Object,
      default: {},
    },
    links: {
      type: Object,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

type Page = InferSchemaType<typeof PageSchema>;
export const Page = models?.Page || model<Page>("Page", PageSchema);
