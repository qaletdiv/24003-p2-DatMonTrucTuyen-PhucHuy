import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrderById } from "@/lib/orders";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_session")?.value ?? null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const order = getOrderById(userId, id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
