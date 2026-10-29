import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const careerSchema = new Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: String,
    region: String,
    salary: String,
    salaryMin: Number,
    salaryMax: Number,
    contractTypes: [String],
    office: String,
    phone: String,
    phoneHref: String,
    email: String,
    image: String,
    referralBonus: String,
    highlights: [String],
    overview: String,
    responsibilities: [String],
    whatWeOffer: [String],
    requirements: [String],
    isOpen: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);
type CareerRecord = InferSchemaType<typeof careerSchema>;
export default (models.Career as Model<CareerRecord>) ||
  model("Career", careerSchema);
