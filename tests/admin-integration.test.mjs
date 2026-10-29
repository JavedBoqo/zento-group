import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tsconfigPath = path.join(root, "tsconfig.json");
const blogs = JSON.parse(fs.readFileSync(path.join(root, "mock/blogs.json")));
const jobs = JSON.parse(fs.readFileSync(path.join(root, "mock/jobs.json")));

async function unusedPort() {
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  return port;
}

async function runScript(script, env) {
  const child = spawn(
    process.execPath,
    ["--conditions=react-server", "--import", "tsx", script],
    { cwd: root, env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
  );
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const [code] = await once(child, "exit");
  assert.equal(code, 0, output);
}

test(
  "admin, public content, applications, CVs and consent work together",
  { timeout: 420000 },
  async (t) => {
    const originalTSConfig = fs.readFileSync(tsconfigPath, "utf8");
    const mongo = await MongoMemoryServer.create();
    const port = await unusedPort();
    const base = `http://localhost:${port}`;
    const password = "Integration-test-password-2026";
    const env = {
      ...process.env,
      MONGODB_URI: mongo.getUri("zento_admin_test"),
      APP_URL: base,
      SESSION_SECRET: "isolated-test-secret-with-at-least-32-characters",
      CONTENT_SOURCE: "mongodb",
      ADMIN_NAME: "Test Admin",
      ADMIN_EMAIL: "test@example.com",
      ADMIN_PASSWORD: password,
      RECAPTCHA_SECRET_KEY: "",
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "",
      RESEND_API_KEY: "test-only",
      MAIL_FROM: "test@example.com",
      MAIL_TO: "test@example.com",
      CLOUDINARY_CLOUD_NAME: "test-cloud",
      CLOUDINARY_API_KEY: "test-key",
      CLOUDINARY_API_SECRET: "test-secret",
      TRUST_PROXY: "false",
      NEXT_TEST_DIST_DIR: ".next/admin-test",
      NODE_OPTIONS: `--require "${path.join(root, "tests/mock-email.cjs").replaceAll("\\", "/")}"`,
    };
    const client = new mongoose.mongo.MongoClient(env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    let server;
    let serverOutput = "";
    let cookie = "";
    const request = (url, options = {}, authenticated = true) =>
      fetch(base + url, {
        ...options,
        redirect: "manual",
        headers: {
          origin: base,
          ...(authenticated && cookie ? { cookie } : {}),
          ...options.headers,
        },
      });
    const json = (url, method, body, authenticated = true) =>
      request(
        url,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
        authenticated,
      );
    try {
      await runScript("scripts/create-admin.ts", env);
      await runScript("scripts/create-admin.ts", env);
      assert.equal(await db.collection("admins").countDocuments(), 1);
      await runScript("scripts/migrate-content.ts", env);
      await db
        .collection("blogs")
        .updateOne({ slug: blogs[0].slug }, { $set: { status: "draft" } });
      await runScript("scripts/migrate-content.ts", env);
      assert.equal(await db.collection("blogs").countDocuments(), blogs.length);
      assert.equal(
        (await db.collection("blogs").findOne({ slug: blogs[0].slug })).status,
        "draft",
      );
      await db
        .collection("blogs")
        .updateOne({ slug: blogs[0].slug }, { $set: { status: "published" } });
      server = spawn(
        process.execPath,
        [
          "node_modules/next/dist/bin/next",
          "dev",
          "--webpack",
          "-p",
          String(port),
        ],
        {
          cwd: root,
          env,
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      const log = (chunk) => {
        serverOutput = (serverOutput + chunk).slice(-20000);
      };
      server.stdout.on("data", log);
      server.stderr.on("data", log);
      let ready = false;
      for (let attempt = 0; attempt < 90; attempt++) {
        try {
          const response = await request("/admin/login", {}, false);
          if (response.status === 200) {
            ready = true;
            break;
          }
        } catch {}
        if (server.exitCode !== null) throw new Error(serverOutput);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      assert.ok(ready, serverOutput);

      await t.test(
        "admin pages and every private API reject anonymous requests",
        async () => {
          const response = await request("/admin/dashboard", {}, false);
          assert.equal(response.status, 307);
          assert.match(response.headers.get("location"), /\/admin\/login/);
          for (const url of [
            "/api/admin/blogs",
            "/api/admin/authors",
            "/api/admin/careers",
            "/api/admin/applicants",
            "/api/admin/analytics",
            "/api/admin/applicants/000000000000000000000000/cv",
          ])
            assert.equal((await request(url, {}, false)).status, 401, url);
          assert.equal(
            (
              await json(
                "/api/admin/auth/login",
                "POST",
                { email: "test@example.com", password: "incorrect" },
                false,
              )
            ).status,
            401,
          );
          assert.equal(
            (await request("/api/admin/auth/register", {}, false)).status,
            404,
          );
        },
      );

      await t.test(
        "login sets an HttpOnly session and rejects cross-origin writes",
        async () => {
          const response = await json(
            "/api/admin/auth/login",
            "POST",
            { email: "test@example.com", password },
            false,
          );
          assert.equal(response.status, 200, await response.text());
          const header = response.headers.get("set-cookie");
          assert.match(header, /HttpOnly/i);
          assert.match(header, /SameSite=Strict/i);
          cookie = header.split(";")[0];
          assert.equal((await request("/admin/dashboard")).status, 200);
          assert.equal(
            (
              await request("/api/admin/blogs", {
                method: "POST",
                headers: {
                  origin: "https://untrusted.example",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(blogs[0]),
              })
            ).status,
            403,
          );
        },
      );

      const authorProfile = {
        fullName: "Integration Author",
        role: "Writer",
        biography: "Synthetic test profile",
        photo: { src: "", alt: "" },
        qualifications: [],
        active: true,
        clinicalReviewer: false,
      };
      const authorResponse = await json(
        "/api/admin/authors",
        "POST",
        authorProfile,
      );
      assert.equal(
        authorResponse.status,
        201,
        await authorResponse.clone().text(),
      );
      const authorId = (await authorResponse.json()).id;
      blogs[0].authorId = authorId;
      const reviewerResponse = await json("/api/admin/authors", "POST", {
        ...authorProfile,
        fullName: "Integration Reviewer",
        role: "Test reviewer",
        clinicalReviewer: true,
        qualifications: ["Synthetic test credential"],
      });
      assert.equal(
        reviewerResponse.status,
        201,
        await reviewerResponse.clone().text(),
      );
      const reviewerId = (await reviewerResponse.json()).id;

      const imageUpload = async (
        suffix = "",
        authenticated = true,
        type = "image/png",
      ) => {
        const form = new FormData();
        form.set(
          "file",
          new File(
            [Buffer.from("89504e470d0a1a0a", "hex"), suffix],
            "image.png",
            { type },
          ),
        );
        return request(
          "/api/admin/media",
          { method: "POST", body: form },
          authenticated,
        );
      };
      await t.test(
        "media uploads require an admin and validate file signatures and sizes",
        async () => {
          assert.equal((await imageUpload("", false)).status, 401);
          assert.equal(
            (await imageUpload("", true, "image/svg+xml")).status,
            400,
          );
          const invalid = new FormData();
          invalid.set(
            "file",
            new File(["not a PNG"], "image.png", { type: "image/png" }),
          );
          assert.equal(
            (
              await request("/api/admin/media", {
                method: "POST",
                body: invalid,
              })
            ).status,
            400,
          );
          invalid.set(
            "file",
            new File([new Uint8Array(5 * 1024 * 1024 + 1)], "image.png", {
              type: "image/png",
            }),
          );
          assert.equal(
            (
              await request("/api/admin/media", {
                method: "POST",
                body: invalid,
              })
            ).status,
            400,
          );
          assert.equal((await imageUpload("UPLOAD_FAILURE")).status, 503);
        },
      );

      await t.test(
        "shared Cloudinary images survive replacement until their last reference is removed",
        async () => {
          const response = await imageUpload();
          assert.equal(response.status, 201, await response.clone().text());
          const asset = await response.json();
          const stored = await db
            .collection("media")
            .findOne({ public_id: asset.public_id });
          assert.equal(stored.secure_url, asset.secure_url);
          const duplicate = await json("/api/admin/blogs", "POST", {
            ...blogs[0],
            heroImage: { src: asset.secure_url, alt: "Retryable upload" },
          });
          assert.equal(duplicate.status, 409);
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "ready",
          );
          const blog = {
            ...blogs[0],
            slug: "shared-media-test",
            status: "published",
            heroImage: { src: asset.secure_url, alt: "Shared cover" },
            sections: [
              {
                type: "text",
                heading: "Content image",
                body: ["Example"],
                image: { src: asset.secure_url, alt: "Content preview" },
              },
            ],
          };
          const blogResponse = await json("/api/admin/blogs", "POST", blog);
          assert.equal(
            blogResponse.status,
            201,
            await blogResponse.clone().text(),
          );
          const blogId = (await blogResponse.json()).id;
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).references,
            1,
          );
          const publicHTML = await (
            await request(`/blog/${blog.slug}`, {}, false)
          ).text();
          assert.ok(publicHTML.includes("Content preview"));
          const transformed = asset.secure_url.replace(
            "/image/upload/",
            "/image/upload/c_fill,w_400/",
          );
          const job = {
            ...jobs[0],
            slug: "shared-media-job",
            id: "shared-media-job",
            image: transformed,
          };
          const jobResponse = await json("/api/admin/careers", "POST", job);
          assert.equal(
            jobResponse.status,
            201,
            await jobResponse.clone().text(),
          );
          const jobId = (await jobResponse.json()).id;
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).references,
            2,
          );
          assert.equal(
            (
              await request(`/api/admin/media/${asset.id}`, {
                method: "DELETE",
              })
            ).status,
            409,
          );
          const replaced = {
            ...blog,
            heroImage: { src: "/brand-image.png", alt: "Existing image" },
            sections: [],
          };
          const variant = {
            ...blog,
            sections: [
              {
                type: "text",
                heading: "Variant",
                body: [],
                image: { src: transformed, alt: "Shared variant" },
              },
            ],
          };
          assert.equal(
            (await json(`/api/admin/blogs/${blogId}`, "PUT", variant)).status,
            200,
          );
          assert.equal(
            (
              await json(`/api/admin/blogs/${blogId}`, "PUT", {
                ...blog,
                sections: [],
              })
            ).status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).references,
            2,
          );
          assert.equal(
            (await json(`/api/admin/blogs/${blogId}`, "PUT", replaced)).status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "ready",
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).references,
            1,
          );
          assert.equal(
            (await request(`/api/admin/careers/${jobId}`, { method: "DELETE" }))
              .status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "deleted",
          );
          assert.equal(
            (await json(`/api/admin/blogs/${blogId}`, "PUT", blog)).status,
            409,
          );
          assert.equal(
            (await request(`/api/admin/blogs/${blogId}`, { method: "DELETE" }))
              .status,
            200,
          );
          assert.equal(
            fs.existsSync(path.join(root, "public/brand-image.png")),
            true,
          );
        },
      );

      await t.test(
        "cleanup failures remain tracked and abandoned uploads can be reclaimed",
        async () => {
          const failed = await imageUpload("DESTROY_FAILURE");
          const asset = await failed.json();
          const blog = {
            ...blogs[0],
            slug: "cleanup-failure-test",
            heroImage: { src: asset.secure_url, alt: "Test" },
          };
          const created = await json("/api/admin/blogs", "POST", blog);
          assert.equal(created.status, 201);
          const id = (await created.json()).id;
          assert.equal(
            (await request(`/api/admin/blogs/${id}`, { method: "DELETE" }))
              .status,
            200,
          );
          const pending = await db
            .collection("media")
            .findOne({ public_id: asset.public_id });
          assert.equal(pending.state, "deleting");
          assert.equal(pending.references, 0);
          const unused = await (await imageUpload()).json();
          await db
            .collection("media")
            .updateOne(
              { public_id: unused.public_id },
              { $set: { updatedAt: new Date(Date.now() - 2 * 86400000) } },
            );
          await runScript("scripts/cleanup-media.ts", env);
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: unused.public_id })
            ).state,
            "deleted",
          );
        },
      );

      await t.test(
        "author management validates credentials and protects profile media",
        async () => {
          assert.equal(
            (await request("/api/admin/authors", {}, false)).status,
            401,
          );
          assert.equal(
            (await json("/api/admin/authors", "POST", authorProfile, false))
              .status,
            401,
          );
          assert.equal(
            (
              await json("/api/admin/authors", "POST", {
                ...authorProfile,
                clinicalReviewer: true,
              })
            ).status,
            400,
          );
          const asset = await (await imageUpload()).json();
          const portrait = {
            ...authorProfile,
            photo: { src: asset.secure_url, alt: "Test portrait" },
          };
          assert.equal(
            (await json("/api/admin/authors/" + authorId, "PUT", portrait))
              .status,
            200,
          );
          assert.equal(
            (
              await request("/api/admin/media/" + asset.id, {
                method: "DELETE",
              })
            ).status,
            409,
          );
          assert.equal(
            (
              await json("/api/admin/authors/" + authorId, "PUT", {
                ...authorProfile,
                active: false,
              })
            ).status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "deleted",
          );
          const invalid = await json("/api/admin/blogs", "POST", {
            ...blogs[0],
            slug: "inactive-author-test",
            status: "published",
          });
          assert.equal(invalid.status, 400);
          assert.equal(
            (await json("/api/admin/authors/" + authorId, "PUT", authorProfile))
              .status,
            200,
          );
        },
      );

      await t.test(
        "career JSON import validates, stays closed, reopens in the editor and protects existing positions",
        async () => {
          const endpoint = "/api/admin/careers/import";
          const sample = {
            ...jobs[0],
            id: "import-position-one",
            slug: "import-position-one",
            isOpen: true,
          };
          assert.equal(
            (
              await json(
                endpoint,
                "POST",
                { source: JSON.stringify(sample) },
                false,
              )
            ).status,
            401,
          );
          assert.equal(
            (
              await request(endpoint, {
                method: "POST",
                headers: {
                  origin: "https://other.example",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ source: JSON.stringify(sample) }),
              })
            ).status,
            403,
          );
          assert.equal(
            (await json(endpoint, "POST", { source: "broken JSON" })).status,
            400,
          );
          const countBefore = await db.collection("careers").countDocuments();
          for (const wrapper of [
            sample,
            [sample],
            { jobs: [sample] },
            { careers: [sample] },
          ]) {
            const response = await json(endpoint, "POST", {
              source: JSON.stringify(wrapper),
            });
            assert.equal(response.status, 200, await response.clone().text());
            assert.equal((await response.json()).results[0].status, "ready");
          }
          assert.equal(
            await db.collection("careers").countDocuments(),
            countBefore,
          );
          const saved = await json(endpoint, "POST", {
            source: JSON.stringify({
              jobs: [
                sample,
                {
                  ...sample,
                  id: "import-position-two",
                  slug: "import-position-two",
                },
              ],
            }),
            commit: true,
          });
          const results = (await saved.json()).results;
          assert.deepEqual(
            results.map((item) => item.status),
            ["imported", "imported"],
          );
          const stored = await (
            await request("/api/admin/careers/" + results[0].id)
          ).json();
          assert.equal(stored.isOpen, false);
          assert.equal(stored.overview, sample.overview);
          assert.equal(
            (await request("/careers/import-position-one", {}, false)).status,
            404,
          );
          assert.equal(
            (await request("/admin/careers/" + results[0].id + "/edit")).status,
            200,
          );
          assert.equal(
            (
              await json("/api/admin/careers/" + results[0].id, "PUT", {
                ...stored,
                overview: "Updated imported overview.",
              })
            ).status,
            200,
          );
          const duplicate = await json(endpoint, "POST", {
            source: JSON.stringify(sample),
            commit: true,
          });
          assert.equal((await duplicate.json()).results[0].status, "conflict");
          assert.equal(
            (
              await (
                await request("/api/admin/careers/" + results[0].id)
              ).json()
            ).overview,
            "Updated imported overview.",
          );
          const repeated = await json(endpoint, "POST", {
            source: JSON.stringify([
              { ...sample, id: "batch-career", slug: "batch-career" },
              { ...sample, id: "batch-career", slug: "other-batch-career" },
            ]),
          });
          assert.deepEqual(
            (await repeated.json()).results.map((item) => item.status),
            ["ready", "conflict"],
          );
          const invalid = await json(endpoint, "POST", {
            source: JSON.stringify({
              ...sample,
              id: "invalid-career",
              slug: "invalid-career",
              salaryMin: 20,
              salaryMax: 1,
            }),
          });
          assert.equal((await invalid.json()).results[0].status, "error");
          const opened = await json(endpoint, "POST", {
            source: JSON.stringify({
              ...sample,
              id: "import-position-open",
              slug: "import-position-open",
            }),
            commit: true,
            open: true,
          });
          assert.equal((await opened.json()).results[0].status, "imported");
          assert.equal(
            (await request("/careers/import-position-open", {}, false)).status,
            200,
          );
          assert.equal((await request("/admin/careers/import")).status, 200);
          await db
            .collection("careers")
            .deleteMany({
              slug: {
                $in: [
                  "import-position-one",
                  "import-position-two",
                  "import-position-open",
                ],
              },
            });
        },
      );

      await t.test(
        "JSON import validates wrappers, creates editable drafts and refuses conflicts",
        async () => {
          const sample = { ...blogs[0], slug: "json-import-one" };
          const endpoint = "/api/admin/blogs/import";
          assert.equal(
            (
              await json(
                endpoint,
                "POST",
                { source: JSON.stringify(sample) },
                false,
              )
            ).status,
            401,
          );
          const invalid = await json(endpoint, "POST", { source: "not JSON" });
          assert.equal(invalid.status, 400);
          const countBefore = await db.collection("blogs").countDocuments();
          for (const wrapper of [sample, [sample], { articles: [sample] }]) {
            const checked = await json(endpoint, "POST", {
              source: JSON.stringify(wrapper),
            });
            assert.equal(checked.status, 200, await checked.clone().text());
            assert.equal((await checked.json()).results[0].status, "ready");
          }
          assert.equal(
            await db.collection("blogs").countDocuments(),
            countBefore,
          );
          const imported = await json(endpoint, "POST", {
            source: JSON.stringify({
              articles: [sample, { ...sample, slug: "json-import-two" }],
            }),
            commit: true,
          });
          const results = (await imported.json()).results;
          assert.deepEqual(
            results.map((item) => item.status),
            ["imported", "imported"],
          );
          const stored = await (
            await request("/api/admin/blogs/" + results[0].id)
          ).json();
          assert.equal(stored.status, "draft");
          assert.equal(stored.content.version, 1);
          assert.equal(stored.content.sections.length, sample.sections.length);
          assert.equal(stored.content.faqs.length, sample.faqs.length);
          assert.ok(
            stored.content.sections.some((section) => section.type === "cta"),
          );
          assert.equal(
            (await request("/admin/blogs/" + results[0].id + "/edit")).status,
            200,
          );
          const conflict = await json(endpoint, "POST", {
            source: JSON.stringify(sample),
            commit: true,
          });
          assert.equal((await conflict.json()).results[0].status, "conflict");
          const duplicates = await json(endpoint, "POST", {
            source: JSON.stringify([
              { ...sample, slug: "same-batch" },
              { ...sample, slug: "same-batch" },
            ]),
          });
          assert.deepEqual(
            (await duplicates.json()).results.map((item) => item.status),
            ["ready", "conflict"],
          );
          const unknownAuthor = await json(endpoint, "POST", {
            source: JSON.stringify({
              ...sample,
              slug: "missing-author",
              authorId: "0123456789abcdef01234567",
            }),
          });
          assert.equal((await unknownAuthor.json()).results[0].status, "error");
          const edited = {
            ...stored,
            content: {
              ...stored.content,
              sections: stored.content.sections.toReversed(),
            },
          };
          delete edited._id;
          delete edited.createdAt;
          delete edited.updatedAt;
          delete edited.__v;
          assert.equal(
            (await json("/api/admin/blogs/" + results[0].id, "PUT", edited))
              .status,
            200,
          );
          const published = await json(endpoint, "POST", {
            source: JSON.stringify({
              ...sample,
              slug: "json-import-published",
            }),
            commit: true,
            publish: true,
          });
          assert.equal((await published.json()).results[0].status, "imported");
          const publicHTML = await (
            await request("/blog/json-import-published", {}, false)
          ).text();
          assert.ok(publicHTML.includes("bg-secondary p-7 text-white sm:p-9"));
          assert.ok(publicHTML.includes("Frequently Asked Questions"));
          assert.equal((await request("/admin/blogs/import")).status, 200);
          await db.collection("blogs").deleteMany({
            slug: {
              $in: [
                "json-import-one",
                "json-import-two",
                "json-import-published",
              ],
            },
          });
        },
      );

      await t.test(
        "visual builder saves incomplete drafts, stable ordering, previews and published content",
        async () => {
          const rich = (text) => [{ type: "paragraph", content: [{ text }] }];
          const content = {
            version: 1,
            introduction: [],
            summary: [],
            sections: [],
            faqs: [],
            cta: "consultation",
          };
          const draft = {
            ...blogs[0],
            slug: "draft-visual-builder",
            title: "",
            seoTitle: "",
            metaDescription: "",
            intro: [],
            sections: [],
            faqs: [],
            content,
            status: "draft",
          };
          const created = await json("/api/admin/blogs", "POST", draft);
          assert.equal(created.status, 201, await created.clone().text());
          const id = (await created.json()).id;
          assert.equal(
            (
              await json(`/api/admin/blogs/${id}`, "PUT", {
                ...draft,
                status: "published",
              })
            ).status,
            400,
          );
          const ready = {
            ...draft,
            title: "Visual care guide",
            slug: "visual-care-guide",
            seoTitle: "Visual care guide | Zento",
            metaDescription: "A guide to thoughtful care.",
            canonicalUrl: "https://zentogroup.co.uk/blog/visual-care-guide",
            content: {
              ...content,
              introduction: rich("Opening paragraph."),
              summary: rich("Key takeaway."),
              sections: [
                {
                  id: "section-one",
                  title: "First section",
                  layout: "standard",
                  blocks: [
                    {
                      id: "block-one",
                      type: "richText",
                      content: rich("First body."),
                    },
                  ],
                },
                {
                  id: "section-two",
                  title: "Second section",
                  layout: "standard",
                  blocks: [
                    {
                      id: "block-two",
                      type: "richText",
                      content: rich("Second body."),
                    },
                  ],
                },
              ],
              faqs: [
                {
                  id: "faq-one",
                  question: "Can you help?",
                  answer: [
                    {
                      type: "paragraph",
                      content: [
                        { text: "Yes", bold: true },
                        { text: ", contact us", href: "/contact" },
                      ],
                    },
                  ],
                },
              ],
            },
          };
          ready.content.sections.push(
            {
              id: "section-cta",
              type: "cta",
              title: "How Zento Can Help",
              layout: "standard",
              variant: "blue",
              blocks: [
                {
                  id: "cta-body",
                  type: "richText",
                  content: rich("Support designed around you."),
                },
              ],
              primaryAction: { type: "contact", label: "Discuss care" },
              secondaryAction: {
                type: "phone",
                label: "Call our team",
                destination: "tel:01764790095",
              },
            },
            {
              id: "section-checklist",
              type: "checklist",
              title: "Care checklist",
              layout: "standard",
              blocks: [],
              items: [
                { id: "check-two", content: [{ text: "Keep in touch" }] },
                {
                  id: "check-one",
                  content: [{ text: "Plan together", bold: true }],
                },
              ],
            },
          );
          ready.content.cta = "original";
          ready.closingCta = {
            heading: "Final consultation test",
            body: "Speak with our team.",
          };
          assert.equal(
            (await json(`/api/admin/blogs/${id}`, "PUT", ready)).status,
            200,
          );
          const missingAuthor = await json("/api/admin/blogs/" + id, "PUT", {
            ...ready,
            authorId: "",
            status: "published",
          });
          assert.equal(missingAuthor.status, 400);
          const invalidReview = await json("/api/admin/blogs/" + id, "PUT", {
            ...ready,
            reviewerId: authorId,
            verificationStatus: "verified",
          });
          assert.equal(invalidReview.status, 400);
          ready.reviewerId = reviewerId;
          ready.verificationStatus = "verified";
          ready.content.sections.reverse();
          ready.content.sections.find(
            (section) => section.id === "section-two",
          ).title = "Updated second section";
          assert.equal(
            (await json(`/api/admin/blogs/${id}`, "PUT", ready)).status,
            200,
          );
          const stored = await (await request(`/api/admin/blogs/${id}`)).json();
          assert.deepEqual(
            stored.content.sections.map((section) => section.id),
            ["section-checklist", "section-cta", "section-two", "section-one"],
          );
          assert.equal(
            stored.content.sections.find(
              (section) => section.id === "section-two",
            ).blocks[0].id,
            "block-two",
          );
          assert.equal(
            stored.content.sections[1].primaryAction.type,
            "contact",
          );
          assert.deepEqual(
            stored.content.sections[0].items.map((item) => item.id),
            ["check-two", "check-one"],
          );
          assert.equal(
            (await request("/admin-preview/blog", {}, false)).status,
            307,
          );
          assert.equal((await request("/admin-preview/blog")).status, 200);
          const previewResponse = await json(
            "/api/admin/blogs/preview",
            "POST",
            {
              article: { ...ready, title: "Unsaved private title" },
              blogId: id,
            },
          );
          assert.equal(
            previewResponse.status,
            200,
            await previewResponse.clone().text(),
          );
          const previewURL = (await previewResponse.json()).url;
          assert.equal((await request(previewURL, {}, false)).status, 307);
          const previewPage = await request(previewURL);
          assert.equal(previewPage.status, 200);
          assert.match(previewPage.headers.get("cache-control"), /no-store/);
          const previewHTML = await previewPage.text();
          assert.ok(previewHTML.includes("Unsaved private title"));
          assert.ok(previewHTML.includes("Integration Author"));
          assert.ok(previewHTML.includes("Clinically reviewed by"));
          assert.ok(previewHTML.includes("bg-secondary p-7 text-white sm:p-9"));
          assert.ok(previewHTML.includes("Discuss care"));
          assert.ok(previewHTML.includes("Call our team"));
          assert.ok(previewHTML.includes("Care checklist"));
          assert.equal(
            (await (await request("/api/admin/blogs/" + id)).json()).title,
            ready.title,
          );
          const tokenHash = (await import("node:crypto"))
            .createHash("sha256")
            .update(new URL(previewURL, base).searchParams.get("token"))
            .digest("hex");
          await db
            .collection("articlepreviews")
            .updateOne({ tokenHash }, { $set: { expiresAt: new Date(0) } });
          assert.equal((await request(previewURL)).status, 404);
          assert.equal(
            (await request("/blog/visual-care-guide", {}, false)).status,
            404,
          );
          assert.equal(
            (
              await json(`/api/admin/blogs/${id}`, "PUT", {
                ...ready,
                status: "published",
              })
            ).status,
            200,
          );
          const response = await request("/blog/visual-care-guide", {}, false);
          assert.equal(response.status, 200);
          const html = await response.text();
          assert.ok(
            html.indexOf("Updated second section") <
              html.indexOf("First section"),
          );
          assert.ok(html.includes('id="section-section-two"'));
          assert.ok(html.includes("bg-secondary p-7 text-white sm:p-9"));
          assert.ok(html.includes('href="tel:01764790095"'));
          assert.ok(
            html.indexOf("Keep in touch") < html.indexOf("Plan together"),
          );
          assert.equal(
            html.split(">Final consultation test</h2>").length - 1,
            1,
          );
          assert.ok(html.includes("FAQPage"));
          assert.ok(html.includes("Integration Author"));
          assert.ok(
            !html.includes(
              "Written &amp; verified by registered nursing specialists",
            ),
          );
          assert.ok(html.includes("<strong>"));
          assert.ok(html.includes('href="/contact"'));
          assert.ok(html.includes('rel="canonical"'));
          assert.equal(
            (
              await json(`/api/admin/blogs/${id}`, "PUT", {
                ...ready,
                slug: "changed-after-publish",
              })
            ).status,
            400,
          );
          assert.equal(
            (await request(`/blog/${blogs[0].slug}`, {}, false)).status,
            200,
          );
          assert.equal(
            (await request(`/api/admin/blogs/${id}`, { method: "DELETE" }))
              .status,
            200,
          );
        },
      );

      await t.test(
        "single-editor articles retain source, formatted FAQs and inline media references",
        async () => {
          const asset = await (await imageUpload()).json();
          const body = `Read [care advice](/contact).\n\n![Team](${asset.secure_url})`;
          const article = {
            ...blogs[0],
            slug: "single-editor-test",
            title: "Single editor test",
            status: "published",
            editorSource: `# Single editor test\n\n## Advice\n\n${body}\n\n## FAQs\n\n### Can you help?\n\nYes, with **care** and [advice](/contact).`,
            heroImage: { src: "", alt: "" },
            intro: ["A helpful summary."],
            sections: [{ heading: "Advice", type: "text", body: [body] }],
            faqs: [
              {
                question: "Can you help?",
                answer: "Yes, with **care** and [advice](/contact).",
              },
            ],
          };
          const first = await json("/api/admin/blogs", "POST", article);
          assert.equal(first.status, 201, await first.clone().text());
          const firstId = (await first.json()).id;
          const saved = await (
            await request(`/api/admin/blogs/${firstId}`)
          ).json();
          assert.equal(saved.editorSource, article.editorSource);
          const html = await (
            await request(`/blog/${article.slug}`, {}, false)
          ).text();
          assert.ok(html.includes("<strong>care</strong>"));
          assert.ok(html.includes("FAQPage"));
          assert.ok(html.includes('href="/contact"'));
          assert.ok(html.includes('aria-label="Table of contents"'));
          const second = await json("/api/admin/blogs", "POST", {
            ...article,
            slug: "single-editor-shared",
          });
          assert.equal(second.status, 201);
          const secondId = (await second.json()).id;
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).references,
            2,
          );
          assert.equal(
            (await request(`/api/admin/blogs/${firstId}`, { method: "DELETE" }))
              .status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "ready",
          );
          const noFaq = {
            ...article,
            slug: "single-editor-shared",
            faqs: [],
            editorSource: `# Single editor test\n\n## Advice\n\n${body}`,
          };
          assert.equal(
            (await json(`/api/admin/blogs/${secondId}`, "PUT", noFaq)).status,
            200,
          );
          const withoutFaq = await (
            await request("/blog/single-editor-shared", {}, false)
          ).text();
          assert.ok(!withoutFaq.includes('"@type":"FAQPage"'));
          assert.ok(!withoutFaq.includes("Frequently Asked Questions"));
          assert.equal(
            (
              await request(`/api/admin/blogs/${secondId}`, {
                method: "DELETE",
              })
            ).status,
            200,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: asset.public_id })
            ).state,
            "deleted",
          );
        },
      );

      await t.test(
        "blog CRUD preserves SEO and keeps drafts private",
        async () => {
          const blog = {
            ...blogs[0],
            slug: "integration-test-article",
            title: "Integration test article",
            status: "draft",
          };
          const created = await json("/api/admin/blogs", "POST", blog);
          assert.equal(created.status, 201, await created.clone().text());
          const { id } = await created.json();
          assert.equal(
            (await request(`/blog/${blog.slug}`, {}, false)).status,
            404,
          );
          assert.equal(
            (await json("/api/admin/blogs", "POST", blog)).status,
            409,
          );
          assert.equal(
            (
              await json(`/api/admin/blogs/${id}`, "PUT", {
                ...blog,
                status: "published",
              })
            ).status,
            200,
          );
          const publicPage = await request(`/blog/${blog.slug}`, {}, false);
          const html = await publicPage.text();
          assert.equal(publicPage.status, 200);
          assert.ok(html.includes(blog.seoTitle));
          assert.ok(
            html.includes(`https://zentogroup.co.uk/blog/${blog.slug}`),
          );
          assert.ok(html.includes("application/ld+json"));
          assert.equal(
            (
              await json(`/api/admin/blogs/${id}`, "PUT", {
                ...blog,
                slug: "changed",
              })
            ).status,
            400,
          );
          assert.equal(
            (await json(`/api/admin/blogs/${id}`, "PUT", blog)).status,
            200,
          );
          assert.equal(
            (await request(`/blog/${blog.slug}`, {}, false)).status,
            404,
          );
          assert.equal(
            (await request(`/api/admin/blogs/${id}`, { method: "DELETE" }))
              .status,
            200,
          );
          assert.equal((await request(`/api/admin/blogs/${id}`)).status, 404);
          assert.equal(
            (await request(`/blog/${blogs[0].slug}`, {}, false)).status,
            200,
          );
        },
      );

      let jobId;
      const job = {
        ...jobs[0],
        id: "integration-job",
        slug: "integration-test-job",
        isOpen: true,
      };
      const application = () => {
        const form = new FormData();
        for (const [key, value] of Object.entries({
          fullName: "Private Applicant",
          email: "private@example.com",
          phone: "+44 123456789",
          role: job.title,
          jobSlug: job.slug,
          rightToWork: "Yes",
          address: "Private Address",
        }))
          form.set(key, value);
        form.set(
          "cvFile",
          new File(["%PDF-1.4\nPrivate resume"], "resume.pdf", {
            type: "application/pdf",
          }),
        );
        return form;
      };
      await t.test(
        "careers and applications enforce open jobs and protect CVs",
        async () => {
          const created = await json("/api/admin/careers", "POST", job);
          assert.equal(created.status, 201, await created.clone().text());
          jobId = (await created.json()).id;
          assert.equal(
            (await request(`/careers/${job.slug}`, {}, false)).status,
            200,
          );
          const applied = await request(
            "/api/careers/apply",
            {
              method: "POST",
              body: application(),
              headers: { cookie: "zento-analytics=accepted" },
            },
            false,
          );
          assert.equal(applied.status, 200, await applied.text());
          assert.equal(
            (
              await request(
                "/api/careers/apply",
                { method: "POST", body: application() },
                false,
              )
            ).status,
            200,
          );
          assert.equal(await db.collection("applicants").countDocuments(), 1);
          const invalidCV = application();
          invalidCV.set(
            "cvFile",
            new File(["not a PDF"], "resume.pdf", { type: "application/pdf" }),
          );
          assert.equal(
            (
              await request(
                "/api/careers/apply",
                { method: "POST", body: invalidCV },
                false,
              )
            ).status,
            400,
          );
          const applicant = await db.collection("applicants").findOne();
          assert.equal(String(applicant.job), jobId);
          assert.ok(applicant.cvPublicId.startsWith("zento/cvs/"));
          assert.ok(applicant.cvSecureUrl.includes("/raw/authenticated/"));
          assert.equal(applicant.cvId, undefined);
          const cvMedia = await db
            .collection("media")
            .findOne({ public_id: applicant.cvPublicId });
          assert.equal(cvMedia.deliveryType, "authenticated");
          const cvUrl = `/api/admin/applicants/${applicant._id}/cv`;
          assert.equal((await request(cvUrl, {}, false)).status, 401);
          const cv = await request(cvUrl);
          assert.equal(cv.status, 200);
          assert.match(cv.headers.get("cache-control"), /no-store/);
          assert.match(await cv.text(), /Private resume/);
          assert.equal(
            (
              await json(`/api/admin/applicants/${applicant._id}`, "PATCH", {
                status: "Shortlisted",
              })
            ).status,
            200,
          );
          assert.equal(
            (await db.collection("applicants").findOne()).status,
            "Shortlisted",
          );
          assert.equal(
            (
              await json(`/api/admin/careers/${jobId}`, "PUT", {
                ...job,
                isOpen: false,
              })
            ).status,
            200,
          );
          assert.equal(
            (await request(`/careers/${job.slug}`, {}, false)).status,
            404,
          );
          assert.equal(
            (
              await request(
                "/api/careers/apply",
                { method: "POST", body: application() },
                false,
              )
            ).status,
            400,
          );
          assert.equal(
            (await request(`/api/admin/careers/${jobId}`, { method: "DELETE" }))
              .status,
            200,
          );
          assert.equal(await db.collection("applicants").countDocuments(), 1);
          assert.equal(
            (
              await request(`/api/admin/applicants/${applicant._id}`, {
                method: "DELETE",
              })
            ).status,
            200,
          );
          assert.equal(
            await db.collection("privateCVs.files").countDocuments(),
            0,
          );
          assert.equal(
            (
              await db
                .collection("media")
                .findOne({ public_id: applicant.cvPublicId })
            ).state,
            "deleted",
          );
        },
      );

      await t.test(
        "existing GridFS CVs still download privately and can be deleted",
        async () => {
          const bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "privateCVs",
          });
          const upload = bucket.openUploadStream("legacy.pdf");
          upload.end(Buffer.from("%PDF-1.4 legacy private resume"));
          await once(upload, "finish");
          const legacy = await db.collection("applicants").insertOne({
            job: new mongoose.Types.ObjectId(jobId),
            cvId: upload.id,
            cvName: "cv.pdf",
            fullName: "Legacy Applicant",
            status: "New",
            submissionKey: "legacy-test",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          const url = `/api/admin/applicants/${legacy.insertedId}/cv`;
          assert.equal((await request(url, {}, false)).status, 401);
          const response = await request(url);
          assert.equal(response.status, 200);
          assert.match(await response.text(), /legacy private resume/);
          assert.equal(
            (
              await request(`/api/admin/applicants/${legacy.insertedId}`, {
                method: "DELETE",
              })
            ).status,
            200,
          );
          assert.equal(
            await db.collection("privateCVs.files").countDocuments(),
            0,
          );
        },
      );

      await t.test(
        "analytics requires consent and rejects PII and client conversions",
        async () => {
          const event = {
            event: "button_click",
            button: "Phone",
            action: "phone",
            page: "/home-care",
            consent: true,
          };
          assert.equal(
            (await json("/api/analytics/events", "POST", event, false)).status,
            403,
          );
          const send = (body) =>
            request(
              "/api/analytics/events",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  cookie: "zento-analytics=accepted",
                },
                body: JSON.stringify(body),
              },
              false,
            );
          assert.equal((await send(event)).status, 204);
          assert.equal(
            (await send({ ...event, email: "private@example.com" })).status,
            400,
          );
          assert.equal(
            (await send({ ...event, event: "job_application_submitted" }))
              .status,
            400,
          );
          const response = await request("/api/admin/analytics?range=7");
          const report = await response.json();
          assert.ok(
            report.totals.some(
              (item) => item._id.action === "phone" && item.count === 1,
            ),
          );
          assert.ok(
            report.totals.some(
              (item) =>
                item._id.event === "job_application_submitted" &&
                item.count === 1,
            ),
          );
          assert.ok(!JSON.stringify(report).includes("private@example.com"));
        },
      );

      await t.test(
        "login rate limiting blocks repeated failed attempts",
        async () => {
          for (let attempt = 0; attempt < 8; attempt++) {
            assert.equal(
              (
                await json(
                  "/api/admin/auth/login",
                  "POST",
                  { email: "throttled@example.com", password: "incorrect" },
                  false,
                )
              ).status,
              401,
            );
          }
          assert.equal(
            (
              await json(
                "/api/admin/auth/login",
                "POST",
                { email: "throttled@example.com", password: "incorrect" },
                false,
              )
            ).status,
            429,
          );
        },
      );

      await t.test(
        "all admin screens and sitemap render, logout revokes the cookie",
        async () => {
          for (const url of [
            "/admin/dashboard",
            "/admin/blogs",
            "/admin/blogs/new",
            "/admin/careers",
            "/admin/careers/new",
            "/admin/applicants",
            "/admin/analytics",
            "/admin/authors",
            "/admin-preview/blog",
            "/sitemap.xml",
          ])
            assert.equal((await request(url)).status, 200, url);
          const sitemap = await (
            await request("/sitemap.xml", {}, false)
          ).text();
          assert.ok(sitemap.includes(`/blog/${blogs[0].slug}`));
          assert.ok(!sitemap.includes("/admin/"));
          assert.equal(
            (await request("/api/admin/auth/logout", { method: "POST" }))
              .status,
            200,
          );
          assert.equal((await request("/api/admin/blogs")).status, 401);
        },
      );
    } finally {
      fs.writeFileSync(tsconfigPath, originalTSConfig);
      fs.mkdirSync(path.join(root, ".next"), { recursive: true });
      fs.writeFileSync(
        path.join(root, ".next/admin-integration.log"),
        serverOutput,
      );
      if (server && server.exitCode === null) {
        if (process.platform === "win32") {
          try {
            execFileSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
              windowsHide: true,
              stdio: "ignore",
            });
          } catch {}
        } else server.kill("SIGTERM");
      }
      await client.close();
      await mongo.stop();
    }
  },
);
