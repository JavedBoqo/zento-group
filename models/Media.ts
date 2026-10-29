import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const mediaSchema = new Schema(
  {
    public_id: { type: String, required: true, unique: true },
    secure_url: String,
    kind: { type: String, enum: ["image", "cv"], required: true },
    resource_type: { type: String, enum: ["image", "raw"], required: true },
    deliveryType: {
      type: String,
      enum: ["upload", "authenticated"],
      required: true,
    },
    state: {
      type: String,
      enum: ["uploading", "ready", "deleting", "deleted"],
      default: "uploading",
    },
    references: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);
mediaSchema.index({ secure_url: 1 });
mediaSchema.index({ state: 1, createdAt: 1 });

type MediaRecord = InferSchemaType<typeof mediaSchema>;
export default (models.Media as Model<MediaRecord>) ||
  model("Media", mediaSchema);
