import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { hash } from "bcryptjs";
import { z } from "zod";
import connectDB from "../lib/db";
import Admin from "../models/Admin";

loadEnvConfig(process.cwd());

async function main() {
  const input = z
    .object({
      name: z.string().trim().min(1).max(100),
      email: z.email(),
      password: z
        .string()
        .min(12)
        .refine(
          (value) => Buffer.byteLength(value) <= 72,
          "Password must be at most 72 UTF-8 bytes",
        ),
    })
    .parse({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
  await connectDB();
  await Admin.init();
  if (await Admin.exists({ email: input.email.toLowerCase() })) {
    console.log(
      "An administrator with this email already exists. No changes made.",
    );
    return;
  }
  await Admin.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: await hash(input.password, 12),
  });
  console.log("Administrator created.");
}

main()
  .catch(() => {
    console.error(
      "Admin creation failed. Check MongoDB and the ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD environment variables (12–72 byte password).",
    );
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
