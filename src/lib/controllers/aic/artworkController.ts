import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/errorResponse";
import { fetchAicArtworks } from "@/lib/services/aic/artworkService";

export async function getAicArtworks(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    if (isNaN(limit) || isNaN(page)) {
      return errorResponse("Invalid parameters received", 400);
    }

    const { data } = await fetchAicArtworks(limit, page);

    if (!data.length) return errorResponse("No artworks found", 404);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
