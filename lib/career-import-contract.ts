import { z } from "zod";
import { careerInput } from "./admin-validation";
import jobs from "@/mock/jobs.json";

export const CAREER_IMPORT_MAX_BYTES = 1000000;
export const CAREER_IMPORT_MAX_ITEMS = 20;

export function parseCareerImport(source: string): unknown[] {
  if (new TextEncoder().encode(source).length > CAREER_IMPORT_MAX_BYTES)
    throw new Error("Use a JSON file smaller than 1 MB.");
  let data: unknown;
  try {
    data = JSON.parse(source);
  } catch {
    throw new Error(
      "Invalid JSON. Check commas, quotation marks and brackets; remove Markdown code fences.",
    );
  }
  const items = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? "jobs" in data || "careers" in data
        ? Object.keys(data).length === 1
          ? ((data as { jobs?: unknown; careers?: unknown }).jobs ??
            (data as { careers?: unknown }).careers)
          : null
        : [data]
      : null;
  if (
    !Array.isArray(items) ||
    !items.length ||
    items.length > CAREER_IMPORT_MAX_ITEMS
  )
    throw new Error(
      'Provide one position, an array, {"jobs":[...]} or {"careers":[...]}, with 1–20 positions.',
    );
  return items;
}

export function normalizeImportedCareer(value: unknown, open = false) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Each position must be a JSON object.");
  if (JSON.stringify(value).length > 200000)
    throw new Error("This position exceeds the 200,000 character limit.");
  return careerInput.strict().parse({ ...value, isOpen: open });
}

export const careerImportExample = careerInput
  .strict()
  .parse({ ...jobs[0], isOpen: false });
const careerSchema = z.toJSONSchema(careerInput.strict(), {
  io: "input",
  unrepresentable: "any",
  reused: "ref",
});
export const CAREER_JSON_CONVERSION_PROMPT = `Convert the existing job descriptions I supply separately into valid Zento career import JSON. Wait for the administrator's content. This is conversion, not permission to invent vacancies, employment conditions or benefits.

Return ONLY valid JSON: no Markdown fences, commentary, comments, trailing commas, unsupported properties or JSON encoded inside a string. For one position return a single object. For multiple positions return {"jobs":[...]}. Preserve the supplied meaning, requirements, responsibilities, locations, pay, contract terms and benefits. Do not invent salary figures, qualifications, sponsorship promises, bonuses, office locations, image URLs or recruitment claims. Do not copy the example's job terms into other jobs.

Use the exact existing career schema below. Each required array defines mandatory fields; other fields are optional. Include all required fields even when some descriptive values are empty. Job id is an internal stable string, not MongoDB _id; derive it from the slug if none was supplied. Slugs must be unique, lowercase and hyphenated, and at most 180 characters. id, title, location, region, salary, office, phone, referralBonus and each contractTypes value must be at most 300 characters. title and location must be nonempty; wait for them if missing. Keep an existing id/slug unchanged when converting revisions. Do not include _id, timestamps, author fields, blog content, sections or FAQs.

salary is display text. salaryMin and salaryMax are nonnegative JSON numbers, with salaryMax >= salaryMin. If pay is not supplied, use salary:"", salaryMin:0 and salaryMax:0; do not infer pay, hours or hourly/annual conversions. Preserve explicitly supplied numeric pay values without changing their units.
contractTypes, highlights, responsibilities, whatWeOffer and requirements must be arrays of plain strings, not objects, HTML, Markdown lists or a single joined string. Preserve item order. Use [] for an absent list. overview is a plain string; each overview/list item is limited to 20,000 characters and each list to 100 items. Use empty strings for absent optional descriptive content, not null or invented claims. region, office, image and referralBonus can be empty strings.
email must be a valid email address. phoneHref must be a tel: URL containing only +, digits, spaces, parentheses or hyphens after tel:. Use source contact details; when no recruitment contact is supplied, the known general Zento contact in the example may be used as a contact default only. That default does not establish the vacancy's location or office. image must be an existing local path beginning with one slash, an HTTPS URL supplied by the administrator, or an empty string. Never fabricate an image reference.

Set isOpen:false. Imported positions stay closed until the administrator chooses to open them. The import is create-only and never silently replaces existing positions. Use unique IDs and slugs for each position in a bulk file. Maximum ${CAREER_IMPORT_MAX_ITEMS} positions, 1 MB total and 200,000 characters per position.

MANDATORY SILENT SELF-CHECK: parse the output as JSON; compare every key, required field, type, format, length and array shape with the schema; check distinct IDs/slugs; check salary range; check email, phoneHref and image destinations; confirm isOpen is false; compare against the source for omissions or invented claims. Then return only the final JSON. Do not claim to have run Zento's backend validator.

ACTUAL APPLICATION JSON SCHEMA:
${JSON.stringify(careerSchema, null, 2)}

COMPLETE VALID EXAMPLE POSITION (structure only; replace its job terms with the supplied content):
${JSON.stringify(careerImportExample, null, 2)}`;
