import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSafeUser } from "@/lib/users";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("auth_session")?.value;

  if (!sessionId) {
    return NextResponse.json({ user: null });
  }

  const user = getSafeUser(sessionId);
  return NextResponse.json({ user: user ?? null });
}
