import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");

  const response = await fetch(
    `https://api.bali321.com/api/v1/images/public?listingId=${listingId}`,
    {}
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Error fetching images" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
