import { fetchSearchAicArtworks } from "@/lib/services/aic/search/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function searchAicArtworks(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);

  if (!query) {
    return errorResponse("Invalid search query.", 400);
  }
  try {
    const data = await fetchSearchAicArtworks(query, limit, page);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
