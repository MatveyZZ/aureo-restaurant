import { NextResponse } from "next/server";
import { logout as doLogout } from "@/lib/auth";

export async function POST(request: Request) {
  await doLogout();
  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url);
}
