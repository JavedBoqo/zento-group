import "server-only";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import connectDB from "./db";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function apiError(error: unknown) {
  if (error instanceof ZodError)
    return NextResponse.json(
      {
        error: error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; "),
      },
      { status: 400 },
    );
  if (error instanceof HttpError)
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  if ((error as { code?: number })?.code === 11000)
    return NextResponse.json(
      { error: "This record already exists. Check the slug." },
      { status: 409 },
    );
  console.error(
    "Admin request failed",
    error instanceof Error ? error.name : "UnknownError",
  );
  return NextResponse.json(
    { error: "Service unavailable. Please try again." },
    { status: 503 },
  );
}
export function checkOrigin(request: Request) {
  // The proxy may pass an internal HTTP URL to Next.js in production.
  // Trust our public origin, never an arbitrary Host/X-Forwarded-Host header.
  const expected = new URL(
    process.env.APP_URL?.trim() ||
      (process.env.NODE_ENV === "production"
        ? "https://zentogroup.co.uk"
        : request.url),
  );
  const allowed = new Set([expected.origin]);
  if (
    expected.protocol === "https:" &&
    !expected.port &&
    ["zentogroup.co.uk", "www.zentogroup.co.uk"].includes(expected.hostname)
  ) {
    allowed.add("https://zentogroup.co.uk");
    allowed.add("https://www.zentogroup.co.uk");
  }
  if (!allowed.has(request.headers.get("origin") || ""))
    throw new HttpError(403, "Invalid request origin");
}
export async function readJSON(request: Request, maxBytes = 250000) {
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "Missing request body");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new HttpError(413, "Request is too large");
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError(400, "Invalid JSON");
  }
}
export async function rateLimit(
  request: Request,
  scope: string,
  maximum: number,
  identity?: string,
) {
  const mongoose = await connectDB();
  const collection = mongoose.connection.collection("rateLimits");
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await collection.createIndex({ key: 1 }, { unique: true });
  // Enable only behind an ingress that overwrites this header.
  const ip =
    process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "shared";
  const bucket = Math.floor(Date.now() / 600000);
  const key = createHash("sha256")
    .update(`${scope}:${identity || ip}:${bucket}`)
    .digest("hex");
  const result = await collection.findOneAndUpdate(
    { key },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date((bucket + 2) * 600000) },
    },
    { upsert: true, returnDocument: "after" },
  );
  if (!result || result.count > maximum)
    throw new HttpError(429, "Too many requests. Please try again later.");
}
export function pagination(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = Math.floor(
    Math.max(1, Math.min(10000, Number(params.get("page")) || 1)),
  );
  const search = (params.get("search") || "")
    .trim()
    .slice(0, 100)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return { params, page, skip: (page - 1) * 20, search };
}
