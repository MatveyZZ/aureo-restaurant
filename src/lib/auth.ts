/**
 * Simple authentication for the admin panel.
 * Uses HTTP-only cookie + bcrypt-style hash.
 * 
 * DEFAULT PASSWORD: admin123
 * CHANGE THIS BEFORE PRODUCTION!
 */

import { cookies } from "next/headers";

const SESSION_COOKIE = "aureo-admin-session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Simple hash for demo — use bcrypt in production
function hashPassword(password: string): string {
  // For demo: use a simple check. In production, use bcrypt.
  return password === "admin123" ? "valid" : "invalid";
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) return false;
  try {
    const data = JSON.parse(session.value);
    if (Date.now() - data.timestamp > SESSION_DURATION) return false;
    return true;
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<boolean> {
  if (hashPassword(password) === "valid") {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, JSON.stringify({ timestamp: Date.now() }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_DURATION,
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

