import JSONImport from "./JSONImport";
import {
  blogImportExample,
  BLOG_JSON_CONVERSION_PROMPT,
  IMPORT_MAX_BYTES,
} from "@/lib/blog-import-contract";

export default function BlogImport() {
  return (
    <JSONImport
      kind="blogs"
      prompt={BLOG_JSON_CONVERSION_PROMPT}
      example={blogImportExample}
      maxBytes={IMPORT_MAX_BYTES}
    />
  );
}
