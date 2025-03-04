import { EventSchema } from "@/models/Event";
import { PageSchema } from "@/models/Page";
import { InferSchemaType } from "mongoose";

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
