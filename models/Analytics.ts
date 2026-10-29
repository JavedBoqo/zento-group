import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const analyticsSchema = new Schema({
  event: {
    type: String,
    enum: ["page_view", "button_click", "job_application_submitted"],
    required: true,
  },
  button: String,
  page: { type: String, required: true },
  action: String,
  job: String,
  timestamp: { type: Date, default: Date.now, expires: 90 * 24 * 60 * 60 },
});
analyticsSchema.index({ timestamp: 1, event: 1 });
type AnalyticsRecord = InferSchemaType<typeof analyticsSchema>;
export default (models.Analytics as Model<AnalyticsRecord>) ||
  model("Analytics", analyticsSchema);
