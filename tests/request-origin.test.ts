import test from "node:test";
import assert from "node:assert/strict";
import { checkOrigin, HttpError } from "../lib/api";

test("production origin checks work behind a proxy while rejecting forged and cross-site requests", () => {
  const previous = {
    appURL: process.env.APP_URL,
    nodeEnv: process.env.NODE_ENV,
  };
  const request = (origin?: string, extra: Record<string, string> = {}) =>
    new Request("http://127.0.0.1:3001/api/admin/auth/login", {
      method: "POST",
      headers: { ...(origin ? { origin } : {}), ...extra },
    });
  const denied = (origin?: string, extra?: Record<string, string>) =>
    assert.throws(
      () => checkOrigin(request(origin, extra)),
      (error) => error instanceof HttpError && error.status === 403,
    );
  try {
    delete process.env.APP_URL;
    Object.assign(process.env, { NODE_ENV: "production" });
    assert.doesNotThrow(() => checkOrigin(request("https://zentogroup.co.uk")));
    assert.doesNotThrow(() =>
      checkOrigin(request("https://www.zentogroup.co.uk")),
    );
    for (const origin of [
      undefined,
      "null",
      "https://evil.example",
      "https://zentogroup.co.uk.evil.example",
      "http://zentogroup.co.uk",
      "https://zentogroup.co.uk:444",
      "http://127.0.0.1:3001",
    ])
      denied(origin);
    denied("https://evil.example", {
      host: "evil.example",
      "x-forwarded-host": "evil.example",
      "x-forwarded-proto": "https",
    });
    process.env.APP_URL = "https://www.zentogroup.co.uk/";
    assert.doesNotThrow(() => checkOrigin(request("https://zentogroup.co.uk")));
    process.env.APP_URL = "https://staging.example.test";
    assert.doesNotThrow(() =>
      checkOrigin(request("https://staging.example.test")),
    );
    denied("https://zentogroup.co.uk");
    Object.assign(process.env, { NODE_ENV: "development" });
    delete process.env.APP_URL;
    assert.doesNotThrow(() => checkOrigin(request("http://127.0.0.1:3001")));
    denied("https://evil.example");
    process.env.APP_URL = "http://localhost:3100";
    assert.doesNotThrow(() => checkOrigin(request("http://localhost:3100")));
    denied("http://127.0.0.1:3001");
  } finally {
    if (previous.appURL === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = previous.appURL;
    if (previous.nodeEnv === undefined)
      Reflect.deleteProperty(process.env, "NODE_ENV");
    else Object.assign(process.env, { NODE_ENV: previous.nodeEnv });
  }
});
