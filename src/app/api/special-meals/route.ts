import { NextResponse } from "next/server";
import { menuItems } from "@/data/menuItems";
export async function GET() {
  const menuItemReserve = menuItems.filter((item) => item.special);
  return NextResponse.json(menuItemReserve);
}
