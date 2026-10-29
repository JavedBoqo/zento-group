import "server-only";
import { articleContentSchema } from "@/lib/article-content";
import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const image = new Schema({ src: String, alt: String }, { _id: false });
const section = new Schema(
  {
    heading: String,
    type: {
      type: String,
      enum: ["signs", "text", "text_with_list", "cta_section"],
    },
    image,
    body: { type: [String], default: undefined },
    intro: String,
    list: { type: [String], default: undefined },
    outro: String,
    items: {
      type: [
        new Schema(
          { number: Number, title: String, body: String, icon: image },
          { _id: false },
        ),
      ],
      default: undefined,
    },
  },
  { _id: false },
);
const blogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    excerpt: String,
    canonicalUrl: String,
    authorId: String,
    reviewerId: String,
    verificationStatus: {
      type: String,
      enum: ["unverified", "verified"],
      default: "unverified",
    },
    reviewedAt: Date,
    verifiedBy: String,
    draftSlugEditable: { type: Boolean, default: false },
    content: {
      type: Schema.Types.Mixed,
      default: undefined,
      validate: {
        validator: (value: unknown) =>
          value === undefined || articleContentSchema.safeParse(value).success,
        message: "Invalid versioned article content",
      },
    },
    editorSource: { type: String, maxlength: 200000 },
    featured: Boolean,
    seoTitle: String,
    metaDescription: String,
    heroImage: image,
    intro: [String],
    sections: [section],
    faqs: [new Schema({ question: String, answer: String }, { _id: false })],
    closingCta: new Schema(
      { heading: String, body: String, image },
      { _id: false },
    ),
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true },
);
type BlogRecord = InferSchemaType<typeof blogSchema>;
export default (models.Blog as Model<BlogRecord>) || model("Blog", blogSchema);
