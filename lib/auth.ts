import "server-only";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import connectDB from "./db";
import Admin from "@/models/Admin";
import { HttpError } from "./api";

interface AdminSession {
  adminId?: string;
  version?: number;
  passwordStamp?: string;
}
export const passwordStamp = (hash: string) =>
  createHash("sha256").update(hash).digest("hex");
export async function getSession() {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  return getIronSession<AdminSession>(await cookies(), {
    password,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Host-zento-admin"
        : "zento-admin",
    ttl: 8 * 60 * 60,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    },
  });
}
export async function currentAdmin() {
  const cookie = (await cookies()).get(
    process.env.NODE_ENV === "production"
      ? "__Host-zento-admin"
      : "zento-admin",
  );
  if (!cookie) return null;
  const session = await getSession();
  if (!session.adminId || !/^[a-f\d]{24}$/i.test(session.adminId)) return null;
  await connectDB();
  const admin = await Admin.findById(session.adminId)
    .select("+passwordHash")
    .lean();
  if (
    !admin ||
    admin.sessionVersion !== session.version ||
    passwordStamp(admin.passwordHash) !== session.passwordStamp
  )
    return null;
  return { id: String(admin._id), name: admin.name, email: admin.email };
}
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) throw new HttpError(401, "Please sign in");
  return admin;
}
export async function requireAdminPage() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
