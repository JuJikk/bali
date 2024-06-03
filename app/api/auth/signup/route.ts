import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, firstName, lastName } = await request.json();

  try {
    const response = await fetch("https://api.bali321.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Sign-up successful" });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText },
        { status: response.status }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
