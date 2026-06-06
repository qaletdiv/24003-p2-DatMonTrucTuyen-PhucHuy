import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "@/lib/cart";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_session")?.value ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ items: [] });
  }
  return NextResponse.json({ items: getCart(userId) });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  const { item, quantity = 1 } = await request.json();
  if (!item?.id) {
    return NextResponse.json(
      { error: "Item is required" },
      { status: 400 },
    );
  }

  const items = addToCart(userId, item, quantity);
  return NextResponse.json({ items });
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  const { itemId, quantity } = await request.json();
  if (!itemId || typeof quantity !== "number") {
    return NextResponse.json(
      { error: "itemId and quantity are required" },
      { status: 400 },
    );
  }

  const items = updateCartQuantity(userId, itemId, quantity);
  return NextResponse.json({ items });
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  const url = new URL(request.url);
  const itemId = url.searchParams.get("itemId");

  const items = itemId ? removeFromCart(userId, itemId) : clearCart(userId);
  return NextResponse.json({ items });
}
