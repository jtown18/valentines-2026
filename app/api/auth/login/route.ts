import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { secretCode } = body;

    const validSecretCode = process.env.SECRET_CODE;

    if (secretCode === validSecretCode) {
      // Generate a simple token (in production, use JWT)
      const token = crypto.randomBytes(32).toString("hex");
      // Token expires in 1 hour
      const expiresAt = Date.now() + 60 * 60 * 1000;

      return NextResponse.json({
        success: true,
        token,
        expiresAt,
        message: "Login successful",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid secret code" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
