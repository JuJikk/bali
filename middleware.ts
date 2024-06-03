import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/get/api/")) {
    const newPathname = pathname.slice(4);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const newUrl = new URL(baseUrl + newPathname);

    searchParams.forEach((value, key) =>
      newUrl.searchParams.append(key, value)
    );
    console.log(newUrl.toString());

    try {
      const apiResponse = await fetch(newUrl.toString(), { method: "GET" });

      if (!apiResponse.ok) {
        throw new Error(`API responded with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();

      return new Response(JSON.stringify(data), {
        status: apiResponse.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      const message = (error as Error).message;
      console.error("Failed to fetch data from external API:", message);
      return new Response(
        JSON.stringify({ message: "Failed to fetch data", error: message }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return NextResponse.next();
}
