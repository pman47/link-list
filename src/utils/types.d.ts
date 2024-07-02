import { InferSchemaType } from "mongoose";
import { PageSchema } from "./path/to/your/schema/file";
import { EventSchema } from "@/models/Event";

declare global {
  type PageType = InferSchemaType<typeof PageSchema>;
  type Event = InferSchemaType<typeof EventSchema>;

  interface Link {
    key: string;
    title: string;
    subtitle: string;
    url: string;
  }

  interface Button {
    key: string;
    label: string;
    icon: IconDefinition;
    placeholder: string;
  }
}
