import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true, select: false },
  sessionVersion: { type: Number, default: 0 },
});
type AdminRecord = InferSchemaType<typeof adminSchema>;
export default (models.Admin as Model<AdminRecord>) ||
  model("Admin", adminSchema);
