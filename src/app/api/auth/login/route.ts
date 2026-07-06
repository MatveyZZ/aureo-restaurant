import { NextRequest, NextResponse } from "next/server";
import { login as doLogin, logout as doLogout } from "@/lib/auth";
import { verifySession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const success = await doLogin(password);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Неверный пароль" }, { status: 401 });
}
