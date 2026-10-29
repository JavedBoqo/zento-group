import { requireAdminPage } from "@/lib/auth";
import JSONImport from "@/components/admin/JSONImport";
import {
  careerImportExample,
  CAREER_JSON_CONVERSION_PROMPT,
  CAREER_IMPORT_MAX_BYTES,
} from "@/lib/career-import-contract";

export default async function ImportCareersPage() {
  await requireAdminPage();
  return (
    <JSONImport
      kind="careers"
      prompt={CAREER_JSON_CONVERSION_PROMPT}
      example={careerImportExample}
      maxBytes={CAREER_IMPORT_MAX_BYTES}
    />
  );
}
