import { NextRequest, NextResponse } from "next/server";
import { getContent, updateContent } from "@/data/site-data";
import { verifySession } from "@/lib/auth";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const updated = await updateContent(data);
  return NextResponse.json({ content: updated });
}
