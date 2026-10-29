import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import Admin from "@/models/Admin";
import { getSession, passwordStamp } from "@/lib/auth";
import {
  apiError,
  checkOrigin,
  HttpError,
  rateLimit,
  readJSON,
} from "@/lib/api";

export const runtime = "nodejs";
const loginInput = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(72),
});
const dummyHash =
  "$2b$12$4CfQziZkqCVYE3Z7E5qMYOUIjfKlbLsDTCzLlXjbYq9axWok0aTcK";

export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const input = loginInput.parse(await readJSON(request, 2048));
    await rateLimit(request, "login", 30);
    await rateLimit(request, "login-email", 8, input.email.toLowerCase());
    const admin = await Admin.findOne({
      email: input.email.toLowerCase(),
    }).select("+passwordHash");
    const valid = await compare(
      input.password,
      admin?.passwordHash || dummyHash,
    );
    if (!admin || !valid) throw new HttpError(401, "Invalid email or password");
    const session = await getSession();
    session.adminId = String(admin._id);
    session.version = admin.sessionVersion;
    session.passwordStamp = passwordStamp(admin.passwordHash);
    await session.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
