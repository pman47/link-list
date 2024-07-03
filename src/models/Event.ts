import { InferSchemaType, model, models, Schema } from "mongoose";

export const EventSchema = new Schema(
  {
    type: String, // click or view
    page: String, // for ex "pman47"
    uri: String, // /pman47 | https://
  },
  { timestamps: true }
);

type Event = InferSchemaType<typeof EventSchema>;
export const Event = models?.Event || model<Event>("Event", EventSchema);
