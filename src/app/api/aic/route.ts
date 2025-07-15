import { AicArtworkListResponse } from "@/types/aicTypes";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/errorResponse";
const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") ?? 10;
  const page = searchParams.get("page") ?? 1;

  try {
    const res = await fetch(`${AIC_BASE_URL}?limit=${limit}&page=${page}`);

    if (isNaN(Number(limit)) || isNaN(Number(page))) {
      return NextResponse.json(
        {
          error:
            "Invalid parameters received. 'limit' and 'page' must numbers.",
        },
        { status: 400 }
      );
    }

    const data: AicArtworkListResponse = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
