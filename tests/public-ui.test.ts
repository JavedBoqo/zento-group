import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  readAnalyticsConsent,
  hasAnalyticsConsent,
  trackEvent,
} from "../lib/analytics";
import WebsiteAnalytics from "../components/WebsiteAnalytics";
import AuthorAttribution from "../components/blog/AuthorAttribution";
import articles from "../mock/blogs.json";
import type { Article } from "../lib/blog";

const legacy = articles as Article[];

test("consent is hidden until hydration and optional analytics respects persistent acceptance and withdrawal", async () => {
  assert.equal(renderToStaticMarkup(createElement(WebsiteAnalytics)), "");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "document");
  const originalFetch = globalThis.fetch;
  const browser = { cookie: "" };
  let requests = 0;
  Object.defineProperty(globalThis, "document", {
    value: browser,
    configurable: true,
  });
  globalThis.fetch = async () => {
    requests++;
    return new Response(null, { status: 204 });
  };
  try {
    assert.equal(readAnalyticsConsent(), null);
    trackEvent({ event: "page_view", page: "/blog" });
    assert.equal(requests, 0);
    browser.cookie = "zento-analytics=rejected";
    assert.equal(readAnalyticsConsent(), "rejected");
    trackEvent({ event: "page_view", page: "/blog" });
    assert.equal(requests, 0);
    browser.cookie = "other=value;zento-analytics=accepted";
    assert.equal(hasAnalyticsConsent(), true);
    trackEvent({ event: "page_view", page: "/blog" });
    assert.equal(requests, 1);
    trackEvent({ event: "page_view", page: "/admin/dashboard" });
    assert.equal(requests, 1);
    browser.cookie = "zento-analytics=rejected";
    assert.equal(hasAnalyticsConsent(), false);
    trackEvent({
      event: "button_click",
      page: "/blog",
      action: "phone",
      button: "Phone",
    });
    assert.equal(requests, 1);
    browser.cookie = "";
    assert.equal(readAnalyticsConsent(), null);
    browser.cookie = "zento-analytics=invalid";
    assert.equal(readAnalyticsConsent(), null);
  } finally {
    globalThis.fetch = originalFetch;
    if (previous) Object.defineProperty(globalThis, "document", previous);
    else Reflect.deleteProperty(globalThis, "document");
  }
});

test("editorial byline is compact, uses real dates and handles missing or duplicate author details", () => {
  const article = {
    ...legacy[0],
    updatedAt: "2026-10-29T10:00:00.000Z",
    author: {
      id: "test",
      fullName: "Jane Smith",
      role: "Care Specialist",
      biography: "A long biography is kept out of the byline.",
      photo: { src: "", alt: "" },
      qualifications: [],
      active: true,
      clinicalReviewer: false,
    },
  };
  const html = renderToStaticMarkup(
    createElement(AuthorAttribution, { article, readingTime: 7 }),
  );
  assert.match(html, />JS<\/span>/);
  assert.match(html, /Jane Smith/);
  assert.match(html, /Care Specialist/);
  assert.match(html, /29 October 2026/);
  assert.match(html, /7 min read/);
  assert.doesNotMatch(
    html,
    /long biography|About the author|Published|bg-zinc-50/,
  );
  const missing = renderToStaticMarkup(
    createElement(AuthorAttribution, {
      article: { ...legacy[0] },
      readingTime: 7,
    }),
  );
  assert.match(missing, /7 min read/);
  assert.doesNotMatch(missing, /Author not listed|avatar|<time/);
  const duplicate = renderToStaticMarkup(
    createElement(AuthorAttribution, {
      article: {
        ...article,
        updatedAt: "invalid",
        author: { ...article.author, role: "Jane Smith" },
      },
    }),
  );
  assert.equal((duplicate.match(/Jane Smith<\/span>/g) || []).length, 1);
  assert.doesNotMatch(duplicate, /<time/);
});
