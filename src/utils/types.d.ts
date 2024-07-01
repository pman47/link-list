import { InferSchemaType } from "mongoose";
import { PageSchema } from "./path/to/your/schema/file";

declare global {
  type PageType = InferSchemaType<typeof PageSchema>;
}
