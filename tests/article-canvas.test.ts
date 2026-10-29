import test from "node:test";
import assert from "node:assert/strict";
import { articleCanvasHTML } from "../lib/article-canvas";
import { articleContentSchema, emptyContent } from "../lib/article-content";

test("writing canvas retains section identities, CTA/checklist content, images and FAQ formatting", () => {
  const content = articleContentSchema.parse({
    ...emptyContent(),
    summary: [{ type: "paragraph", content: [{ text: "Summary" }] }],
    sections: [
      {
        id: "care",
        title: "Care & support",
        layout: "standard",
        blocks: [
          {
            id: "photo",
            type: "image",
            src: "https://example.com/photo.webp",
            alt: 'Care "team"',
          },
          {
            id: "quote",
            type: "callout",
            style: "info",
            content: [
              {
                type: "paragraph",
                content: [{ text: "A useful note", italic: true }],
              },
            ],
          },
        ],
      },
      {
        id: "cta",
        type: "cta",
        title: "Talk to us",
        layout: "standard",
        variant: "blue",
        primaryAction: { type: "consultation", label: "Contact" },
        blocks: [],
      },
      {
        id: "checklist",
        type: "checklist",
        title: "Next steps",
        layout: "standard",
        blocks: [],
        items: [
          { id: "step", content: [{ text: "Plan together", bold: true }] },
        ],
      },
    ],
    faqs: [
      {
        id: "faq",
        question: "Where to start?",
        answer: [
          {
            type: "paragraph",
            content: [{ text: "Contact us", href: "/contact", bold: true }],
          },
        ],
      },
    ],
  });
  const before = JSON.stringify(content),
    html = articleCanvasHTML(content);
  assert.match(html, /data-section-id="care"/);
  assert.match(html, /Care &amp; support/);
  assert.match(html, /data-section-id="cta"/);
  assert.match(html, /data-item-id="step"/);
  assert.match(html, /data-block-id="photo"/);
  assert.match(html, /alt="Care &quot;team&quot;"/);
  assert.match(html, /<blockquote data-block-id="quote">/);
  assert.match(html, /data-faq-id="faq"/);
  assert.match(html, /<a href="\/contact"><strong>Contact us<\/strong><\/a>/);
  assert.equal(JSON.stringify(content), before);
});

test("writing canvas escapes supplied markup and omits unsafe image sources", () => {
  const content = emptyContent();
  content.sections = [
    {
      id: "section",
      title: "<script>alert(1)</script>",
      layout: "standard",
      blocks: [
        {
          id: "body",
          type: "richText",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "<img src=x onerror=alert(1)>",
                  href: "javascript:alert(1)",
                },
              ],
            },
          ],
        },
        {
          id: "image",
          type: "image",
          src: "javascript:alert(1)",
          alt: "Unsafe",
        },
      ],
    },
  ];
  const html = articleCanvasHTML(content);
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes("<img"));
  assert.match(html, /&lt;img/);
});
