import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/errorResponse";
import { fetchMetArtworks } from "@/lib/services/met/artworkService";

export async function getMetArtworks(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 10);
    const query = searchParams.get("q") ?? "paintings";

    if (isNaN(limit)) {
      return errorResponse("Invalid limit parameter", 400);
    }

    if (!query) {
      return errorResponse("No artworks found", 400);
    }

    const data = await fetchMetArtworks(query, limit);

    if (!data.length) {
      return errorResponse("No artworks found", 404);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error in getMetArtworks:", error);
    return errorResponse("Internal server error", 500);
  }
}
