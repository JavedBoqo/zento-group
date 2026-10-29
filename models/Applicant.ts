import "server-only";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const applicantSchema = new Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Career",
      required: true,
      index: true,
    },
    jobSlug: String,
    role: String,
    fullName: String,
    email: String,
    phone: String,
    location: String,
    address: String,
    preferredPattern: String,
    rightToWork: String,
    drivingLicence: String,
    careExperience: String,
    message: String,
    cvId: Schema.Types.ObjectId,
    cvPublicId: String,
    cvSecureUrl: String,
    cvName: String,
    status: {
      type: String,
      enum: ["New", "Reviewing", "Shortlisted", "Rejected", "Hired"],
      default: "New",
      index: true,
    },
    submissionKey: { type: String, unique: true },
    notificationSent: { type: Boolean, default: false },
  },
  { timestamps: true },
);
type ApplicantRecord = InferSchemaType<typeof applicantSchema>;
export default (models.Applicant as Model<ApplicantRecord>) ||
  model("Applicant", applicantSchema);
