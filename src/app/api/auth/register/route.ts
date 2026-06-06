import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createUser } from "@/lib/users";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const result = createUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 409 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("auth_session", result.user!.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 },
    );
  }
}
