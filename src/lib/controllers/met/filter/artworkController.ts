import { fetchFilterMetArtworks } from "@/lib/services/met/filter/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function filterMetArtworks(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("q");

  if (!filter) {
    return errorResponse("Invalid filter query", 400);
  }
  try {
    const data = await fetchFilterMetArtworks(filter);

    if (Array.isArray(data) && data.length === 0) {
      return errorResponse("No artworks found", 404);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
