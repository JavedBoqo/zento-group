import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { z } from "zod";
import { careerInput } from "../lib/admin-validation";
import {
  careerImportExample,
  CAREER_JSON_CONVERSION_PROMPT,
  CAREER_IMPORT_MAX_BYTES,
  normalizeImportedCareer,
  parseCareerImport,
} from "../lib/career-import-contract";
import JSONImport from "../components/admin/JSONImport";

test("career imports accept single/bulk wrappers and use the existing schema with closed defaults", () => {
  for (const wrapper of [
    careerImportExample,
    [careerImportExample],
    { jobs: [careerImportExample] },
    { careers: [careerImportExample] },
  ]) {
    const rows = parseCareerImport(JSON.stringify(wrapper));
    assert.equal(rows.length, 1);
    assert.ok(careerInput.safeParse(normalizeImportedCareer(rows[0])).success);
  }
  assert.equal(
    normalizeImportedCareer({ ...careerImportExample, isOpen: true }).isOpen,
    false,
  );
  assert.equal(normalizeImportedCareer(careerImportExample, true).isOpen, true);
  assert.equal(
    parseCareerImport(
      JSON.stringify([
        careerImportExample,
        {
          ...careerImportExample,
          id: "second-position",
          slug: "second-position",
        },
      ]),
    ).length,
    2,
  );
  for (const source of [
    "invalid",
    "null",
    "[]",
    '{"jobs":{}}',
    JSON.stringify(Array(21).fill(careerImportExample)),
    " ".repeat(CAREER_IMPORT_MAX_BYTES + 1),
  ])
    assert.throws(() => parseCareerImport(source));
  for (const changes of [
    { salaryMin: 10, salaryMax: 1 },
    { email: "invalid" },
    { phoneHref: "javascript:alert(1)" },
    { image: "http://example.test/image.jpg" },
    { title: "" },
    { slug: "Wrong Slug" },
    { unknownField: "not saved" },
  ])
    assert.throws(() =>
      normalizeImportedCareer({ ...careerImportExample, ...changes }),
    );
});

test("fixed career prompt includes the real contract, a valid example and the shared non-editable UI", () => {
  const prompt = CAREER_JSON_CONVERSION_PROMPT;
  const schema = JSON.parse(
    prompt
      .split("ACTUAL APPLICATION JSON SCHEMA:\n")[1]
      .split("\n\nCOMPLETE VALID EXAMPLE POSITION")[0],
  );
  assert.deepEqual(
    schema,
    z.toJSONSchema(careerInput.strict(), {
      io: "input",
      unrepresentable: "any",
      reused: "ref",
    }),
  );
  const example = JSON.parse(
    prompt.split(
      "COMPLETE VALID EXAMPLE POSITION (structure only; replace its job terms with the supplied content):\n",
    )[1],
  );
  assert.ok(careerInput.strict().safeParse(example).success);
  assert.equal(example.isOpen, false);
  const html = renderToStaticMarkup(
    createElement(JSONImport, {
      kind: "careers",
      prompt,
      example: careerImportExample,
      maxBytes: CAREER_IMPORT_MAX_BYTES,
    }),
  );
  assert.ok(html.includes("Import positions"));
  assert.ok(html.includes('href="/admin/careers"'));
  assert.ok(html.includes("Position JSON"));
  assert.ok(html.includes("Copy Prompt"));
  assert.ok(html.includes("Open positions immediately"));
  assert.match(html, /<pre[^>]*aria-label="JSON conversion prompt"/);
  assert.ok(!/<details[^>]*\bopen=/.test(html));
  assert.equal((html.match(/<textarea\b/g) || []).length, 1);
});
