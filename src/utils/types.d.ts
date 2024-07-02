import { InferSchemaType } from "mongoose";
import { PageSchema } from "./path/to/your/schema/file";

declare global {
  type PageType = InferSchemaType<typeof PageSchema>;

  interface Link {
    key: string;
    title: string;
    subtitle: string;
    url: string;
  }
}
