import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import * as validation from "../lib/admin-validation.ts";
const nativeRequire = createRequire(import.meta.url);

const testDirectory = path.dirname(fileURLToPath(import.meta.url));

// Compile the actual handlers in isolation so no real email or reCAPTCHA calls run.
function setup(envOverrides = {}, respond = () => new Response("{}")) {
  const calls = [];
  const env = {
    RESEND_API_KEY: "test-key",
    MAIL_FROM: "website@example.com",
    MAIL_TO: "admin@example.com",
    ...envOverrides,
  };
  function load(relativePath) {
    const filename = path.join(testDirectory, "..", relativePath);
    const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;
    const compiledModule = { exports: {} };
    vm.runInNewContext(
      source,
      {
        module: compiledModule,
        exports: compiledModule.exports,
        require(name) {
          if (name === "next/server") return { NextResponse: Response };
          if (name === "node:crypto") return { createHash };
          if (name === "zod") return nativeRequire("zod");
          if (name === "next/headers")
            return { cookies: async () => ({ get: () => undefined }) };
          if (name === "@/models/Applicant")
            return {
              default: {
                findOne: async () => null,
                create: async () => ({ _id: "saved" }),
                updateOne: async () => ({}),
              },
            };
          if (name === "@/models/Career")
            return {
              default: {
                findOne: () => ({
                  lean: async () => ({
                    _id: "job",
                    title: "Care Worker",
                    location: "Test Office",
                    slug: "care-worker",
                  }),
                }),
              },
            };
          if (name === "@/models/Analytics")
            return { default: { create: async () => ({}) } };
          if (name === "@/lib/admin-validation") return validation;
          if (name === "@/lib/cv")
            return {
              storeCV: async () => ({
                public_id: "private-cv",
                secure_url:
                  "https://res.cloudinary.com/test/raw/authenticated/private-cv.pdf",
                name: "cv.pdf",
              }),
              deleteCV: async () => {},
            };
          if (name === "@/lib/api")
            return {
              rateLimit: async () => {},
              checkOrigin: () => {},
              HttpError: class HttpError extends Error {},
              apiError: (error) =>
                Response.json({ error: error.message }, { status: 400 }),
            };
          if (name === "@/app/lib/email") return load("app/lib/email.ts");
          if (name === "@/app/lib/recaptcha-server")
            return load("app/lib/recaptcha-server.ts");
          throw new Error(`Unexpected import: ${name}`);
        },
        process: { env },
        console: { error() {} },
        Buffer,
        File,
        Request,
        Response,
        URLSearchParams,
        AbortSignal,
        Uint8Array,
        fetch: async (url, options) => {
          calls.push({ url, options });
          return respond(url, options);
        },
      },
      { filename },
    );
    return compiledModule.exports;
  }
  return { calls, load };
}

const applicant = {
  fullName: "Sam <Applicant>",
  email: "sam@example.com",
  phone: "+44 123456789",
  role: "Care Worker",
  jobSlug: "care-worker",
  rightToWork: "Yes",
  address: "1 High Street",
  preferredPattern: "Weekends",
  message: "Hello\nRecruitment",
};

function applicationRequest(values = applicant, file) {
  const form = new FormData();
  for (const [name, value] of Object.entries(values)) form.set(name, value);
  if (file) form.set("cvFile", file);
  return new Request("http://localhost/api/careers/apply", {
    method: "POST",
    body: form,
  });
}

test("careers sends applicant details and a decodable CV through Resend", async () => {
  const { calls, load } = setup();
  const cv = new File(["sample resume"], "resume.pdf", {
    type: "application/pdf",
  });
  const response = await load("app/api/careers/apply/route.ts").POST(
    applicationRequest(applicant, cv),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const email = JSON.parse(calls[0].options.body);
  assert.equal(calls[0].options.headers.Authorization, "Bearer test-key");
  assert.equal(email.from, "Zento Careers <website@example.com>");
  assert.deepEqual(email.to, ["admin@example.com"]);
  assert.equal(email.reply_to, applicant.email);
  assert.equal(
    email.subject,
    "New Job Application: Care Worker (Test Office) - Sam <Applicant>",
  );
  assert.match(email.text, /Address \/ Postcode: 1 High Street/);
  assert.match(email.text, /Preferred Work Pattern: Weekends/);
  assert.match(email.html, /Sam &lt;Applicant&gt;/);
  assert.match(email.html, /1 High Street/);
  assert.match(email.html, /Weekends/);
  assert.equal(email.attachments[0].filename, "resume.pdf");
  assert.equal(
    Buffer.from(email.attachments[0].content, "base64").toString(),
    "sample resume",
  );
});

test("careers accepts JSON without a CV", async () => {
  const { calls, load } = setup();
  const response = await load("app/api/careers/apply/route.ts").POST(
    new Request("http://localhost/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicant),
    }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(calls[0].options.body).attachments, []);
});

test("careers never acknowledges an unsent application", async (t) => {
  for (const failure of [
    "missing configuration",
    "Resend rejection",
    "network failure",
  ]) {
    await t.test(failure, async () => {
      const { calls, load } = setup(
        failure === "missing configuration" ? { RESEND_API_KEY: "" } : {},
        () => {
          if (failure === "network failure")
            throw new Error("connection failed");
          return new Response("rejected", { status: 422 });
        },
      );
      const response = await load("app/api/careers/apply/route.ts").POST(
        applicationRequest(),
      );
      assert.equal(response.status, 500);
      assert.equal((await response.json()).success, false);
      if (failure === "missing configuration") assert.equal(calls.length, 0);
    });
  }
});

test("careers rejects missing fields, invalid email, and invalid CV uploads before sending", async (t) => {
  const invalidCases = [
    [{ ...applicant, role: "" }],
    [{ ...applicant, email: "invalid" }],
    [applicant, new File(["not a resume"], "script.exe")],
    [applicant, new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.pdf")],
  ];
  for (const [index, [values, file]] of invalidCases.entries()) {
    await t.test(`invalid submission ${index + 1}`, async () => {
      const { calls, load } = setup();
      const response = await load("app/api/careers/apply/route.ts").POST(
        applicationRequest(values, file),
      );
      assert.equal(response.status, 400);
      assert.equal((await response.json()).code, "validation");
      assert.equal(calls.length, 0);
    });
  }
});

test("careers requires reCAPTCHA when configured, including when the token is omitted", async () => {
  const { calls, load } = setup({ RECAPTCHA_SECRET_KEY: "secret" });
  const response = await load("app/api/careers/apply/route.ts").POST(
    applicationRequest(),
  );
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, "verification");
  assert.equal(calls.length, 0);
});

test("contact still verifies reCAPTCHA and sends through the shared helper", async () => {
  const { calls, load } = setup({ RECAPTCHA_SECRET_KEY: "secret" }, (url) => {
    if (url.includes("siteverify"))
      return Response.json({ success: true, score: 0.9 });
    return Response.json({ id: "test-email" });
  });
  const response = await load("app/api/contact/route.ts").POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...applicant,
        type: "Home Care",
        recaptchaToken: "test-token",
      }),
    }),
  );
  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  const email = JSON.parse(calls[1].options.body);
  assert.equal(email.from, "Zento Website <website@example.com>");
  assert.deepEqual(email.to, ["admin@example.com"]);
  assert.equal(email.reply_to, applicant.email);
  assert.equal(email.subject, "New Care Enquiry: Home Care");
  assert.match(email.html, /Sam &lt;Applicant&gt;/);
});
