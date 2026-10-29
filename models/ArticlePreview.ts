import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";
import { blogInput } from "@/lib/admin-validation";

const schema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    adminId: { type: String, required: true, unique: true },
    article: {
      type: Schema.Types.Mixed,
      required: true,
      validate: (value: unknown) => blogInput.safeParse(value).success,
    },
    expiresAt: { type: Date, required: true, expires: 0 },
  },
  { timestamps: true },
);
type Record = InferSchemaType<typeof schema>;
export default (models.ArticlePreview as Model<Record>) ||
  model("ArticlePreview", schema);
