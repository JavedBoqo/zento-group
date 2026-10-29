import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const schema = new Schema(
  {
    fullName: { type: String, required: true, maxlength: 200 },
    role: { type: String, maxlength: 200, default: "" },
    photo: new Schema({ src: String, alt: String }, { _id: false }),
    biography: { type: String, maxlength: 2000, default: "" },
    qualifications: [String],
    active: { type: Boolean, default: true },
    clinicalReviewer: { type: Boolean, default: false },
  },
  { timestamps: true },
);
type Record = InferSchemaType<typeof schema>;
export default (models.Author as Model<Record>) || model("Author", schema);
