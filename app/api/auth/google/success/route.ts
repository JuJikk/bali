import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const basicUrl = process.env.NEXT_PUBLIC_API_URL;

  const { code } = await request.json();

  const googleSuccessUrl = `${basicUrl}auth/google`;

  try {
    const response = await fetch(googleSuccessUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Failed to complete login");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Error completing login", {
      status: 500,
    });
  }
}
