import { fetchSearchMetArtworks } from "@/lib/services/met/search/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function searchMetArtworks(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return errorResponse("Invalid search query", 400);
  }

  try {
    const data = await fetchSearchMetArtworks(query);

    if (data instanceof NextResponse) {
      return data;
    }

    if (Array.isArray(data) && data.length === 0) {
      return errorResponse("No valid artworks found", 404);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
