import { NextRequest, NextResponse } from "next/server";
import { filterAicArtworks } from "../../aic/filter/artworkController";
import { filterMetArtworks } from "../../met/filter/artworkController";
import { errorResponse } from "@/lib/utils/errorResponse";
import { fetchAllFilterArtworks } from "@/lib/services/combined/filter/artworkService";

export async function getAllFilterArtworks(req: NextRequest) {
  try {
    const [aicFilterRes, metFilterRes] = await Promise.all([
      filterAicArtworks(req),
      filterMetArtworks(req),
    ]);

    if (!aicFilterRes.ok || !metFilterRes.ok) {
      return errorResponse("Invalid filter query", 400);
    }

    const [aicFilterData, metFilterData] = await Promise.all([
      aicFilterRes.json(),
      metFilterRes.json(),
    ]);

    const data = await fetchAllFilterArtworks([aicFilterData, metFilterData]);

    if (!data.length) return errorResponse("No artworks found", 404);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
