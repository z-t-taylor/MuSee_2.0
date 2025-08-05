import { fetchFilterAicArtworks } from "@/lib/services/aic/filter/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function filterAicArtworks(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const filter = searchParams.get("q");
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);

  if (!filter) return errorResponse("Invalid filter query", 400);

  try {
    const { data } = await fetchFilterAicArtworks(filter, limit, page);

    if (data.length === 0) {
      return errorResponse("No artworks found", 404);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
