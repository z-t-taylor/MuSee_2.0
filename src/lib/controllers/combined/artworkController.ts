import { NextRequest, NextResponse } from "next/server";
import { getAicArtworks } from "../aic/artworkController";
import { getMetArtworks } from "../met/artworkController";
import { fetchAllArtworks } from "@/lib/services/combined/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";

export async function getAllArtworks(req: NextRequest) {
  try {
    const [aicRes, metRes] = await Promise.all([
      getAicArtworks(req),
      getMetArtworks(req),
    ]);
    if (!aicRes.ok && !metRes.ok) {
      return errorResponse("Invalid request", 400);
    }
    const [aicData, metData] = await Promise.all([
      aicRes.ok ? aicRes.json() : Promise.resolve({ data: [] }),
      metRes.ok ? metRes.json() : Promise.resolve({ data: [] }),
    ]);

    const data = await fetchAllArtworks([aicData.data, metData.data]);

    if (!data.length) return errorResponse("No artworks found", 404);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
