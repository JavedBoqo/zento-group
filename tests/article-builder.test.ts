import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { z } from "zod";
import {
  articleContentSchema,
  convertSection,
  ctaActionSchema,
  articleForDisplay,
  duplicateSection,
  emptyContent,
  moveItem,
  textToRich,
  visualCopy,
  type ArticleContent,
} from "../lib/article-content";
import { blogInput } from "../lib/admin-validation";
import RichTextView from "../components/blog/RichTextView";
import FaqAccordion from "../components/blog/FaqAccordion";
import { richTextHTML } from "../lib/rich-text-dom";
import type { Article } from "../lib/blog";
import {
  authorInput,
  confirmedReview,
  type AuthorProfile,
} from "../lib/authors";
import AuthorAttribution from "../components/blog/AuthorAttribution";
import StructuredSection from "../components/blog/StructuredSection";
import BlogCard from "../components/blog/BlogCard";
import BlogImport from "../components/admin/BlogImport";
import {
  blogImportExample,
  BLOG_JSON_CONVERSION_PROMPT,
  normalizeImportedArticle,
  parseBlogImport,
} from "../lib/blog-import-contract";

test("JSON import wrappers and fixed conversion prompt use the actual editable article contract", () => {
  for (const wrapper of [
    blogImportExample,
    [blogImportExample],
    { articles: [blogImportExample] },
  ]) {
    const rows = parseBlogImport(JSON.stringify(wrapper));
    assert.equal(rows.length, 1);
    assert.ok(blogInput.safeParse(normalizeImportedArticle(rows[0])).success);
  }
  assert.equal(
    parseBlogImport(
      JSON.stringify({
        articles: [
          blogImportExample,
          { ...blogImportExample, slug: "second-article" },
        ],
      }),
    ).length,
    2,
  );
  assert.equal(
    normalizeImportedArticle({ ...blogImportExample, status: "published" })
      .status,
    "draft",
  );
  assert.ok(
    normalizeImportedArticle({ title: "Draft", slug: "draft", sections: [] })
      .content,
  );
  const importedLegacy = normalizeImportedArticle(legacy[0]);
  assert.equal(importedLegacy.slug, legacy[0].slug);
  assert.equal(
    importedLegacy.content?.sections.length,
    legacy[0].sections.length,
  );
  assert.ok(
    importedLegacy.content?.sections.some((section) => section.type === "cta"),
  );
  for (const source of [
    "broken json",
    "null",
    "[]",
    '{"articles":{}}',
    JSON.stringify(Array(21).fill(blogImportExample)),
  ])
    assert.throws(() => parseBlogImport(source));
  assert.throws(() =>
    normalizeImportedArticle({
      ...blogImportExample,
      unknownField: "ignored?",
    }),
  );
  const prompt = BLOG_JSON_CONVERSION_PROMPT;
  assert.ok(
    prompt.includes(
      'For multiple blogs, return an object containing an articles array: {"articles":[...]}',
    ),
  );
  assert.ok(prompt.includes("existing blog content I supply separately"));
  assert.ok(prompt.includes("Preserve the original meaning, factual claims"));
  assert.ok(prompt.includes('"primaryAction"'));
  assert.ok(prompt.includes('"version"'));
  assert.ok(prompt.includes('"additionalProperties": false'));
  assert.ok(prompt.includes("MANDATORY FINAL SELF-CHECK"));
  assert.ok(prompt.includes(String.raw`^tel:\+?\d[\d ()-]*$`));
  assert.ok(prompt.includes("Omit secondaryAction entirely when absent"));
  const schema = JSON.parse(
    prompt
      .split("ACTUAL APPLICATION JSON SCHEMA:\n")[1]
      .split("\n\nCOMPLETE VALID EXAMPLE ARTICLE")[0],
  );
  assert.deepEqual(
    schema,
    z.toJSONSchema(blogInput.strict(), {
      io: "input",
      unrepresentable: "any",
      reused: "ref",
    }),
  );
  const example = JSON.parse(
    prompt.split(
      "COMPLETE VALID EXAMPLE ARTICLE (structure only; replace its content with the supplied blog):\n",
    )[1],
  );
  assert.ok(blogInput.safeParse(normalizeImportedArticle(example)).success);
});

test("fixed prompt UI has a collapsed non-editable panel and copy action without generation inputs", () => {
  const html = renderToStaticMarkup(createElement(BlogImport));
  assert.match(html, /<details\b/);
  assert.ok(!/<details[^>]*\bopen=/.test(html));
  assert.ok(html.includes("View conversion prompt"));
  assert.match(html, /<pre[^>]*aria-label="JSON conversion prompt"/);
  assert.ok(!/contenteditable/i.test(html));
  assert.equal((html.match(/<textarea\b/g) || []).length, 1);
  assert.ok(html.includes("JSON conversion prompt"));
  assert.ok(html.includes("Copy Prompt"));
  for (const label of [
    "Blog topic or title",
    "Target audience",
    "Keywords (optional)",
    "Number of articles",
    "Article instructions (optional)",
    "Generate Prompt",
  ])
    assert.ok(!html.includes(label), label);
  assert.ok(html.includes("Validate JSON"));
  assert.ok(html.includes('type="file"'));
  assert.ok(html.includes("Article JSON"));
});

test("public rich text restores icon lists, subsection dividers and compact information boxes", () => {
  const value = [
    {
      type: "heading" as const,
      level: 3 as const,
      content: [{ text: "A subsection" }],
    },
    ...textToRich("Helpful paragraph."),
    {
      type: "bulletList" as const,
      items: [[{ text: "First check" }], [{ text: "Second check" }]],
    },
    { type: "orderedList" as const, items: [[{ text: "First step" }]] },
  ];
  const html = renderToStaticMarkup(createElement(RichTextView, { value }));
  assert.match(html, /border-b pb-2 text-lg/);
  assert.ok(!html.includes("list-disc"));
  assert.equal(html.split("lucide-circle-check").length - 1, 2);
  assert.ok(html.includes("list-decimal"));
  const callout = renderToStaticMarkup(
    createElement(StructuredSection, {
      section: {
        id: "info-section",
        title: "Care information",
        layout: "standard",
        blocks: [
          {
            id: "info-block",
            type: "callout",
            style: "info",
            content: [
              { type: "paragraph", content: [{ text: "\n " }] },
              ...textToRich("Speak to your GP."),
              { type: "paragraph", content: [] },
            ],
          },
        ],
      },
    }),
  );
  assert.match(callout, /space-y-2/);
  assert.equal(callout.split("<p").length - 1, 1);
  assert.ok(callout.includes("Speak to your GP."));
});

test("article cards prefer the quick summary for legacy and structured articles", () => {
  const oldArticle = {
    ...legacy[0],
    intro: ["Legacy quick summary."],
    excerpt: "Separate card excerpt.",
  };
  const structured = {
    ...oldArticle,
    content: {
      ...emptyContent(),
      summary: textToRich("Structured quick summary."),
    },
  };
  for (const featured of [false, true]) {
    const oldHTML = renderToStaticMarkup(
      createElement(BlogCard, { article: oldArticle, featured }),
    );
    assert.ok(oldHTML.includes("Legacy quick summary."));
    assert.ok(!oldHTML.includes("Separate card excerpt."));
    const newHTML = renderToStaticMarkup(
      createElement(BlogCard, { article: structured, featured }),
    );
    assert.ok(newHTML.includes("Structured quick summary."));
    assert.ok(!newHTML.includes("Separate card excerpt."));
    const fallbackHTML = renderToStaticMarkup(
      createElement(BlogCard, {
        article: { ...structured, content: emptyContent() },
        featured,
      }),
    );
    assert.ok(fallbackHTML.includes("Separate card excerpt."));
  }
});

test("typed sections preserve legacy content and validate actions, checklist IDs and conversion", () => {
  const original = {
    id: "original",
    title: "How Zento Can Help",
    layout: "standard" as const,
    blocks: [
      {
        id: "body",
        type: "richText" as const,
        content: textToRich("Existing content"),
      },
    ],
  };
  const legacyContent = { ...emptyContent(), sections: [original] };
  assert.equal(
    articleContentSchema.parse(legacyContent).sections[0].type,
    undefined,
  );
  assert.ok(
    !renderToStaticMarkup(
      createElement(StructuredSection, { section: original }),
    ).includes("bg-secondary p-7"),
  );
  const cta = convertSection(original, "cta");
  assert.equal(cta.id, original.id);
  assert.deepEqual(cta.blocks, original.blocks);
  assert.equal(cta.type, "cta");
  if (cta.type !== "cta") throw Error("Expected CTA");
  cta.primaryAction = {
    type: "link",
    label: "Contact our team",
    destination: "/contact",
  };
  cta.secondaryAction = {
    type: "phone",
    label: "Phone the team",
    destination: "tel:01764790095",
  };
  const html = renderToStaticMarkup(
    createElement(StructuredSection, { section: cta }),
  );
  assert.match(html, /bg-secondary p-7 text-white sm:p-9/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /href="tel:01764790095"/);
  assert.match(html, /Contact our team/);
  assert.ok(!html.includes("Book a Free Consultation"));
  const noSecondary = renderToStaticMarkup(
    createElement(StructuredSection, {
      section: { ...cta, secondaryAction: undefined },
    }),
  );
  assert.ok(!noSecondary.includes("tel:"));
  const incompleteCTA = {
    ...emptyContent(),
    sections: [
      { ...cta, primaryAction: { type: "consultation" as const, label: "" } },
    ],
  };
  assert.ok(
    blogInput.safeParse({
      ...legacy[0],
      content: incompleteCTA,
      status: "draft",
    }).success,
  );
  assert.equal(
    blogInput.safeParse({
      ...legacy[0],
      content: incompleteCTA,
      status: "published",
    }).success,
    false,
  );
  const checklist = convertSection(original, "checklist");
  if (checklist.type !== "checklist") throw Error("Expected checklist");
  assert.ok(
    blogInput.safeParse({
      ...legacy[0],
      content: { ...emptyContent(), sections: [checklist] },
      status: "draft",
    }).success,
  );
  assert.equal(
    blogInput.safeParse({
      ...legacy[0],
      content: { ...emptyContent(), sections: [checklist] },
      status: "published",
    }).success,
    false,
  );
  checklist.items = [
    { id: "check-one", content: [{ text: "First item", bold: true }] },
    { id: "check-two", content: [{ text: "Second item", href: "/contact" }] },
  ];
  checklist.items = moveItem(checklist.items, 0, 1);
  const listHTML = renderToStaticMarkup(
    createElement(StructuredSection, { section: checklist }),
  );
  assert.match(listHTML, /CheckCircle|lucide-circle-check|lucide-check-circle/);
  assert.ok(listHTML.indexOf("Second item") < listHTML.indexOf("First item"));
  const copy = duplicateSection(checklist);
  assert.equal(copy.type, "checklist");
  if (copy.type === "checklist")
    assert.notEqual(copy.items[0].id, checklist.items[0].id);
  const restored = convertSection(checklist, "content");
  assert.equal(restored.id, original.id);
  assert.equal(restored.blocks[1].type, "list");
  assert.ok(
    articleContentSchema.safeParse({ ...emptyContent(), sections: [cta, copy] })
      .success,
  );
  for (const destination of [
    "javascript:alert(1)",
    "//evil.test",
    "http://evil.test",
    "/\\evil.test",
    "https://example.test/\nattack",
  ])
    assert.equal(
      ctaActionSchema.safeParse({ type: "link", label: "Click", destination })
        .success,
      false,
      destination,
    );
  assert.equal(
    ctaActionSchema.safeParse({
      type: "phone",
      label: "Call",
      destination: "https://example.test",
    }).success,
    false,
  );
});

const legacy: Article[] = JSON.parse(
  readFileSync(new URL("../mock/blogs.json", import.meta.url), "utf8"),
);

test("authorship never invents clinical verification and headings survive rich-text serialization", () => {
  const profile: AuthorProfile = {
    id: "author",
    fullName: "Test Contributor",
    role: "Writer",
    biography: "Test profile",
    photo: { src: "", alt: "" },
    qualifications: [],
    active: true,
    clinicalReviewer: false,
  };
  const unverified = { ...legacy[0], author: profile };
  const html = renderToStaticMarkup(
    createElement(AuthorAttribution, { article: unverified }),
  );
  assert.ok(html.includes(">TC</span>"));
  assert.ok(html.includes("rounded-full bg-secondary/10"));
  assert.match(html, /Written by/);
  assert.doesNotMatch(
    html,
    /registered nursing specialists|Clinically reviewed by|Review confirmed/,
  );
  assert.equal(
    authorInput.safeParse({ ...profile, clinicalReviewer: true }).success,
    false,
  );
  const reviewer = {
    ...profile,
    id: "reviewer",
    qualifications: ["Test-only credential"],
    clinicalReviewer: true,
  };
  assert.equal(
    confirmedReview({
      ...unverified,
      reviewer,
      verificationStatus: "verified",
    }),
    false,
  );
  assert.equal(
    confirmedReview({
      ...unverified,
      reviewer,
      verificationStatus: "verified",
      reviewedAt: "2026-10-28T00:00:00Z",
    }),
    true,
  );
  assert.equal(
    confirmedReview({
      ...unverified,
      reviewer: { ...reviewer, id: profile.id },
      verificationStatus: "verified",
      reviewedAt: "2026-10-28T00:00:00Z",
    }),
    false,
  );
  const heading = [
    {
      type: "heading" as const,
      level: 3 as const,
      content: [{ text: "Helpful heading" }],
    },
  ];
  assert.match(richTextHTML(heading), /<h3>Helpful heading<\/h3>/);
  assert.match(
    renderToStaticMarkup(createElement(RichTextView, { value: heading })),
    /Helpful heading/,
  );
});
const content: ArticleContent = {
  ...emptyContent(),
  introduction: textToRich("Opening paragraph."),
  sections: [
    {
      id: "section-a",
      title: "First",
      layout: "standard",
      blocks: [
        {
          id: "block-a",
          type: "richText",
          content: textToRich("First section."),
        },
      ],
    },
    {
      id: "section-b",
      title: "Second",
      layout: "standard",
      blocks: [
        {
          id: "block-b",
          type: "image",
          src: "/brand-image.png",
          alt: "Care team",
        },
      ],
    },
  ],
  faqs: [
    {
      id: "faq-a",
      question: "Can you help?",
      answer: [
        {
          type: "paragraph",
          content: [
            { text: "Yes, ", bold: true },
            { text: "contact us", href: "/contact" },
          ],
        },
      ],
    },
  ],
};

test("incomplete drafts save; publication validates content, FAQs and image descriptions", () => {
  const draft = {
    ...legacy[0],
    title: "",
    seoTitle: "",
    metaDescription: "",
    content: emptyContent(),
    status: "draft",
  };
  assert.equal(blogInput.safeParse(draft).success, true);
  assert.equal(
    blogInput.safeParse({ ...draft, status: "published" }).success,
    false,
  );
  assert.equal(
    blogInput.safeParse({ ...legacy[0], status: "published", content }).success,
    true,
  );
  const invalid = structuredClone(content);
  invalid.faqs[0].answer = [];
  assert.equal(
    blogInput.safeParse({ ...legacy[0], status: "published", content: invalid })
      .success,
    false,
  );
  assert.equal(
    blogInput.safeParse({ ...legacy[0], content, canonicalUrl: "https://" })
      .success,
    false,
  );
});

test("editing, ordering and duplication keep existing IDs stable and copies distinct", () => {
  const ordered = moveItem(content.sections, 0, 1);
  assert.deepEqual(
    ordered.map((section) => section.id),
    ["section-b", "section-a"],
  );
  assert.equal(ordered[1].blocks[0].id, "block-a");
  assert.deepEqual(
    content.sections.map((section) => section.id),
    ["section-a", "section-b"],
  );
  const copy = duplicateSection(content.sections[0]);
  assert.notEqual(copy.id, content.sections[0].id);
  assert.notEqual(copy.blocks[0].id, content.sections[0].blocks[0].id);
  const invalid = {
    ...content,
    sections: [...content.sections, content.sections[0]],
  };
  assert.equal(articleContentSchema.safeParse(invalid).success, false);
  assert.equal(
    articleContentSchema.safeParse({ ...content, version: 2 }).success,
    false,
  );
});

test("public rendering and the shared preview show formatted FAQ answers once", () => {
  const article = articleForDisplay({ ...legacy[0], content });
  assert.equal(article.faqs.length, 1);
  const html = renderToStaticMarkup(
    createElement(FaqAccordion, { faqs: article.faqs }),
  );
  assert.equal((html.match(/<details/g) || []).length, 1);
  assert.match(html, /<strong>/);
  assert.match(html, /href="\/contact"/);
  assert.equal(
    articleForDisplay({ ...legacy[0], content: { ...content, faqs: [] } }).faqs
      .length,
    0,
  );
});

test("rich text escapes HTML and rejects executable links on the server", () => {
  const rich = [
    {
      type: "paragraph" as const,
      content: [{ text: '<img src=x onerror="alert(1)">', bold: true }],
    },
  ];
  const html = renderToStaticMarkup(
    createElement(RichTextView, { value: rich }),
  );
  assert.match(html, /&lt;img/);
  assert.doesNotMatch(html, /<img/);
  assert.match(richTextHTML(rich), /&lt;img/);
  const unsafe = structuredClone(content);
  unsafe.faqs[0].answer = [
    {
      type: "paragraph",
      content: [{ text: "Click", href: "javascript:alert(1)" }],
    },
  ];
  assert.equal(articleContentSchema.safeParse(unsafe).success, false);
});

test("legacy rendering remains unchanged and visual conversion is explicit and non-destructive", () => {
  for (const article of legacy) {
    const before = JSON.stringify(article);
    assert.equal(articleForDisplay(article), article);
    const converted = visualCopy(article);
    assert.equal(converted.sections.length, article.sections.length);
    assert.equal(converted.faqs.length, article.faqs.length);
    assert.equal(converted.cta, "original");
    assert.equal(articleContentSchema.safeParse(converted).success, true);
    assert.equal(JSON.stringify(article), before);
    assert.deepEqual(visualCopy({ ...article, content: converted }), converted);
  }
  const ambiguous = {
    ...legacy[0],
    editorSource: "# unrelated source",
    sections: [
      {
        type: "text" as const,
        heading: "Persisted boundary",
        body: ["## Ambiguous heading\n\nPreserve this fragment."],
      },
    ],
  };
  const copy = visualCopy(ambiguous);
  assert.equal(copy.sections.length, 1);
  assert.equal(copy.sections[0].title, "Persisted boundary");
  assert.match(JSON.stringify(copy), /Preserve this fragment/);
});
