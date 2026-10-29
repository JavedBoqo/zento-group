import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  blogInput,
  careerInput,
  applicantInput,
  analyticsInput,
} from "../lib/admin-validation.ts";
const blogs = JSON.parse(
  fs.readFileSync(new URL("../mock/blogs.json", import.meta.url)),
);
const jobs = JSON.parse(
  fs.readFileSync(new URL("../mock/jobs.json", import.meta.url)),
);

test("all existing blogs and careers validate without changing their public fields", () => {
  for (const blog of blogs) {
    const parsed = blogInput.parse({ ...blog, status: "published" });
    for (const key of Object.keys(blog))
      assert.deepEqual(
        JSON.parse(JSON.stringify(parsed[key])),
        blog[key],
        `${blog.slug}: ${key}`,
      );
  }
  for (const job of jobs) {
    const parsed = careerInput.parse(job);
    for (const key of Object.keys(job))
      assert.deepEqual(JSON.parse(JSON.stringify(parsed[key])), job[key]);
  }
});

test("content validation rejects unsafe paths, invalid slugs and invalid salary ranges", () => {
  assert.equal(
    blogInput.safeParse({ ...blogs[0], slug: "../admin" }).success,
    false,
  );
  assert.equal(
    blogInput.safeParse({
      ...blogs[0],
      heroImage: { src: "javascript:alert(1)", alt: "" },
    }).success,
    false,
  );
  assert.equal(
    blogInput.safeParse({
      ...blogs[0],
      heroImage: { src: "//untrusted.test/pic", alt: "" },
    }).success,
    false,
  );
  assert.equal(
    careerInput.safeParse({ ...jobs[0], salaryMax: -1 }).success,
    false,
  );
});

test("validation strips administrator fields and requires a job for applications", () => {
  const parsed = blogInput.parse({
    ...blogs[0],
    passwordHash: "untrusted",
    createdAt: "untrusted",
  });
  assert.equal(parsed.passwordHash, undefined);
  assert.equal(parsed.createdAt, undefined);
  assert.equal(
    applicantInput.safeParse({
      fullName: "Test",
      email: "person@example.com",
      phone: "123",
      role: "Care Worker",
      rightToWork: "Yes",
    }).success,
    false,
  );
});

test("analytics requires consent, rejects PII, query strings and forged conversions", () => {
  const valid = {
    event: "button_click",
    button: "Get Quote",
    action: "quote_request",
    page: "/home-care",
    consent: true,
  };
  assert.equal(analyticsInput.safeParse(valid).success, true);
  for (const extra of [
    { consent: false },
    { email: "person@example.com" },
    { page: "/contact?email=private" },
    { event: "job_application_submitted" },
    { action: "arbitrary" },
    { button: "Personal message" },
  ]) {
    assert.equal(
      analyticsInput.safeParse({ ...valid, ...extra }).success,
      false,
    );
  }
});
