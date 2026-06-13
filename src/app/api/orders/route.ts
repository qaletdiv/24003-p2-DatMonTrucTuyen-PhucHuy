import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrders, createOrder } from "@/lib/orders";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_session")?.value ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ orders: getOrders(userId) });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      items,
      total,
      status,
      orderType,
      paymentMethod,
      customerName,
      customerPhone,
      customerAddress,
    } = body;

    if (!items?.length || !total || !orderType || !paymentMethod || !customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const order = createOrder(userId, {
      items,
      total,
      status: status || "pending",
      orderType,
      paymentMethod,
      customerName,
      customerPhone: customerPhone || "",
      customerAddress: customerAddress || "",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
