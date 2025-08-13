import { errorResponse } from "@/lib/utils/errorResponse";
import { NextRequest, NextResponse } from "next/server";
import { searchAicArtworks } from "../../aic/search/artworkController";
import { searchMetArtworks } from "../../met/search/artworkContoller";
import { fetchAllSearchArtworks } from "@/lib/services/combined/search/artworkService";

export async function getAllSearchArtworks(req: NextRequest) {
  try {
    const [aicSearchRes, metSearchRes] = await Promise.all([
      searchAicArtworks(req),
      searchMetArtworks(req),
    ]);

    if (!aicSearchRes.ok || !metSearchRes.ok) {
      return errorResponse("Invalid search query", 400);
    }

    const [aicSearchData, metSearchData] = await Promise.all([
      aicSearchRes.ok ? aicSearchRes.json() : Promise.resolve({ data: [] }),
      metSearchRes.ok ? metSearchRes.json() : Promise.resolve({ data: [] }),
    ]);

    const data = await fetchAllSearchArtworks([
      aicSearchData.data,
      metSearchData.data,
    ]);

    if (!data.length) return errorResponse("No artworks found", 404);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
