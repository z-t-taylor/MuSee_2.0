import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/errorResponse";
import { fetchAicArtworks } from "@/lib/services/aic/artworkService";

export async function getAicArtworks(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 10);
    const page = Number(searchParams.get("page") ?? 1);

    if (isNaN(limit) || isNaN(page)) {
      return errorResponse(
        "Invalid parameters received. 'limit' and 'page' must numbers.",
        400
      );
    }

    const { data, pagination } = await fetchAicArtworks(limit, page);
    return NextResponse.json({ data, pagination }, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
