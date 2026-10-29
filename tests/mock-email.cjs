// Loaded only by the isolated integration-test child process.
/* eslint-disable @typescript-eslint/no-require-imports -- Node's --require preload must be CommonJS. */
const originalFetch = globalThis.fetch;
const { Writable } = require("node:stream");
const cloudinary = require("cloudinary").v2;
const assets = new Map();
const failedDeletions = new Set();
cloudinary.uploader.upload_stream = (options, callback) => {
  const chunks = [];
  return new Writable({
    write(chunk, _encoding, next) {
      chunks.push(Buffer.from(chunk));
      next();
    },
    final(next) {
      const bytes = Buffer.concat(chunks);
      if (bytes.includes(Buffer.from("UPLOAD_FAILURE"))) {
        callback(new Error("Mock upload failure"));
        next();
        return;
      }
      assets.set(options.public_id, bytes);
      if (bytes.includes(Buffer.from("DESTROY_FAILURE")))
        failedDeletions.add(options.public_id);
      callback(null, {
        public_id: options.public_id,
        resource_type: options.resource_type,
        type: options.type,
        secure_url: `https://res.cloudinary.com/test-cloud/${options.resource_type}/${options.type}/${options.public_id}${options.resource_type === "image" ? ".png" : ""}`,
      });
      next();
    },
  });
};
cloudinary.uploader.destroy = async (publicId) => {
  if (failedDeletions.has(publicId)) throw new Error("Mock cleanup failure");
  assets.delete(publicId);
  return { result: "ok" };
};
globalThis.fetch = async (input, options) => {
  const url = typeof input === "string" ? input : input.url || String(input);
  if (url === "https://api.resend.com/emails")
    return Response.json({ id: "test-notification" });
  if (url.startsWith("https://www.google.com/recaptcha/api/siteverify"))
    return Response.json({ success: true, score: 0.9 });
  if (
    url.startsWith("https://api.cloudinary.com/v1_1/test-cloud/raw/download?")
  ) {
    const params = new URL(url).searchParams;
    if (
      params.get("type") !== "authenticated" ||
      !params.get("signature") ||
      Number(params.get("expires_at")) <= Date.now() / 1000
    )
      return new Response(null, { status: 403 });
    const bytes = assets.get(params.get("public_id"));
    return bytes ? new Response(bytes) : new Response(null, { status: 404 });
  }
  return originalFetch(input, options);
};
