import { menuItems } from "@/data/menuItems";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = menuItems.find((m) => m.id === id);

  if (!item) {
    return NextResponse.json({ error: "not found!!" }, { status: 404 });
  }
  const relatedItems = menuItems.filter(
    (meal) => meal.category === item.category,
  );

  return NextResponse.json(relatedItems);
}
