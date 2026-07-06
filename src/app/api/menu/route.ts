import { NextRequest, NextResponse } from "next/server";
import { getContent, updateContent, getNextMenuId } from "@/data/site-data";
import { verifySession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const action = searchParams.get("action");

  if (action === "add") {
    if (!category || !["antipasti", "primi", "secondi", "dolci"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    const id = await getNextMenuId(category as any);
    return NextResponse.json({ id, category });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, category, item } = await request.json();

  if (action === "add" && category && item) {
    const content = await getContent();
    const id = await getNextMenuId(category as keyof typeof content.menu);
    const newItem = { ...item, id };
    content.menu[category as keyof typeof content.menu].push(newItem);
    await updateContent({ menu: content.menu });
    return NextResponse.json({ success: true, item: newItem });
  }

  if (action === "update" && category && item) {
    const content = await getContent();
    const items = content.menu[category as keyof typeof content.menu];
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
      await updateContent({ menu: content.menu });
      return NextResponse.json({ success: true, item });
    }
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (action === "delete" && category && item?.id) {
    const content = await getContent();
    const items = content.menu[category as keyof typeof content.menu];
    const filtered = items.filter((i) => i.id !== item.id);
    if (filtered.length === items.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    content.menu[category as keyof typeof content.menu] = filtered;
    await updateContent({ menu: content.menu });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
