import { NextResponse } from "next/server";
import { menuItems } from "@/data/menuItems";
export async function GET() {
  const menuItemResult = menuItems.filter((item) => item.special);
  return NextResponse.json(menuItemResult);
}
