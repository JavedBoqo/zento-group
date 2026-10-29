import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import {
  articleBlocks,
  articleSlug,
  articleToSource,
  markdownImages,
  parseArticle,
  safeArticleURL,
  sectionAnchor,
} from "../lib/article-editor";
import { blogInput } from "../lib/admin-validation";
import type { Article } from "../lib/blog";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FaqAccordion from "../components/blog/FaqAccordion";

const source = `# 12 Signs Your Elderly Parent May Need Home Care

## Quick Summary

A **helpful** overview for families.

A second introductory paragraph.

## Physical and Health-Related Signs

### 1. A Decline in Personal Hygiene

Read [our advice](/contact) before deciding.

### 2. Unexplained Weight Loss

Look for changes.

- Missed meals
- An empty fridge

## Frequently Asked Questions

### What are the early signs?

Changes in **routine**. See [care advice](https://zentogroup.co.uk/contact).

Another paragraph with *emphasis*.

### Who can help?

- A nurse
- Your [GP](https://example.com)

## Next steps

Talk to your family.`;

test("extracts title, SEO, summary, numbered sections and multiple FAQs", () => {
  const article = parseArticle(source);
  assert.equal(
    article.title,
    "12 Signs Your Elderly Parent May Need Home Care",
  );
  assert.equal(article.slug, "12-signs-your-elderly-parent-may-need-home-care");
  assert.deepEqual(article.intro, [
    "A **helpful** overview for families.",
    "A second introductory paragraph.",
  ]);
  assert.equal(article.sections[0].type, "signs");
  if (article.sections[0].type === "signs")
    assert.equal(
      article.sections[0].items[1].body,
      "Look for changes.\n\n- Missed meals\n- An empty fridge",
    );
  assert.equal(article.faqs.length, 2);
  assert.match(article.faqs[0].answer, /\[care advice\]\(https:/);
  assert.match(article.faqs[0].answer, /Another paragraph with \*emphasis\*/);
  assert.match(article.faqs[1].answer, /- A nurse/);
  assert.equal(article.sections.length, 2);
  assert.equal(article.sections[1].heading, "Next steps");
  assert.doesNotMatch(
    JSON.stringify(article.sections),
    /What are the early signs/,
  );
  assert.equal(articleToSource(article), source);
  assert.equal(article.seoTitle, article.title);
  assert.equal(article.metaDescription, "A helpful overview for families.");
  assert.equal(blogInput.safeParse(article).success, true);
});

test("supports FAQs aliases and preserves unextractable FAQ material", () => {
  const article = parseArticle(
    "# Care\n\n## FAQs\n\nIntroductory note.\n\n### Unanswered question\n\n### Answered question\n\nAnswer.\n\n## Other\n\nMore.",
  );
  assert.deepEqual(article.faqs, [
    { question: "Answered question", answer: "Answer." },
  ]);
  const remaining = JSON.stringify(article.sections);
  assert.match(remaining, /Introductory note/);
  assert.match(remaining, /Unanswered question/);
  assert.doesNotMatch(remaining, /Answered question/);
});

test("missing FAQ sections produce no FAQ items", () => {
  assert.deepEqual(
    parseArticle("# Article\n\nIntro.\n\n## Advice\n\nContent.").faqs,
    [],
  );
});

test("keeps ambiguous content, subheadings, mixed lists and images in order", () => {
  const article = parseArticle(
    "# Care\n\nIntro.\n\n## Advice\n\nFirst.\n\n### A subheading\n\n- One\n\nBetween.\n\n1. Two\n\n![Team](https://example.com/image.png)\n\n<table>Keep this text</table>",
  );
  assert.equal(article.sections[0].type, "text");
  const body = JSON.stringify(article.sections[0]);
  for (const text of [
    "First.",
    "A subheading",
    "One",
    "Between.",
    "Two",
    "image.png",
    "Keep this text",
  ])
    assert.ok(body.includes(text), text);
});

test("fenced FAQ-looking headings remain article content", () => {
  const article = parseArticle(
    "# Guide\n\nIntro.\n\n## Example\n\n```md\n## FAQs\n### A question\nAn answer\n```\n\nMore.",
  );
  assert.equal(article.faqs.length, 0);
  assert.match(JSON.stringify(article.sections), /FAQs/);
});

test("legacy articles remain convertible without losing metadata, CTAs or icons", () => {
  const blogs: Article[] = JSON.parse(
    readFileSync(new URL("../mock/blogs.json", import.meta.url), "utf8"),
  );
  for (const blog of blogs) {
    const converted = parseArticle(articleToSource(blog), blog);
    assert.equal(converted.slug, blog.slug);
    assert.equal(converted.seoTitle, blog.seoTitle);
    assert.equal(converted.metaDescription, blog.metaDescription);
    assert.deepEqual(converted.closingCta, blog.closingCta);
    assert.deepEqual(converted.heroImage, blog.heroImage);
    assert.equal(converted.faqs.length, blog.faqs.length);
    assert.equal(converted.sections.length, blog.sections.length);
    assert.equal(blogInput.safeParse(converted).success, true);
  }
});

test("image references and links accept safe URLs and reject executable protocols", () => {
  assert.deepEqual(
    markdownImages(
      "![Care](https://res.cloudinary.com/demo/image/upload/zento/images/example.png)",
    ),
    [
      {
        alt: "Care",
        src: "https://res.cloudinary.com/demo/image/upload/zento/images/example.png",
      },
    ],
  );
  assert.equal(safeArticleURL("javascript:alert(1)"), false);
  assert.equal(safeArticleURL("data:text/html,test"), false);
  assert.equal(safeArticleURL("//example.com"), false);
  assert.equal(safeArticleURL("/contact"), true);
  assert.equal(safeArticleURL("mailto:hello@example.com"), true);
  assert.equal(safeArticleURL("mailto:hello@example.com", true), false);
  assert.equal(articleSlug("Care & Wellbeing"), "care-wellbeing");
  assert.notEqual(sectionAnchor("Advice", 0), sectionAnchor("Advice", 1));
});

test("content with no recognizable headings is preserved", () => {
  const article = parseArticle(
    "Plain title\n\nUnstructured content.\n\nNot lost.",
  );
  assert.match(article.intro.join("\n"), /Unstructured content/);
  assert.match(article.intro.join("\n"), /Not lost/);
  assert.ok(articleBlocks("# Heading\n\nText").length);
});

test("the public FAQ accordion renders extracted formatting without executing HTML", () => {
  const faqs = parseArticle(source).faqs;
  const html = renderToStaticMarkup(
    createElement(FaqAccordion, { faqs, formatted: true }),
  );
  assert.equal((html.match(/<details/g) || []).length, 2);
  assert.match(html, /<strong>routine<\/strong>/);
  assert.match(html, /href="https:\/\/zentogroup.co.uk\/contact"/);
  assert.match(html, /<em>emphasis<\/em>/);
  const unsafe = renderToStaticMarkup(
    createElement(FaqAccordion, {
      faqs: [
        {
          question: "Safe?",
          answer: "<script>alert(1)</script> [bad](javascript:alert)",
        },
      ],
      formatted: true,
    }),
  );
  assert.doesNotMatch(unsafe, /<script|href="javascript:/);
  assert.match(unsafe, /&lt;script&gt;/);
  const legacy = renderToStaticMarkup(
    createElement(FaqAccordion, {
      faqs: [{ question: "Question", answer: "Original **literal** text" }],
    }),
  );
  assert.match(legacy, /Original \*\*literal\*\* text/);
});
