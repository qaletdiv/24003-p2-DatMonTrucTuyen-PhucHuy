import { NextResponse, type NextRequest } from "next/server";
import { menuItems } from "@/data/menuItems";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = menuItems.find((m) => m.id === id);

  if (!item) {
    return NextResponse.json({ error: "Meal not found" }, { status: 404 });
  }
  console.log(id, " router");
  return NextResponse.json(item);
}
