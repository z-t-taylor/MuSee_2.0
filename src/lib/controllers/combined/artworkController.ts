import { NextRequest, NextResponse } from "next/server";
import { getAicArtworks } from "../aic/artworkController";
import { getMetArtworks } from "../met/artworkController";
import { fetchAllArtworks } from "@/lib/services/combined/artworkService";
import { errorResponse } from "@/lib/utils/errorResponse";

export async function getAllArtworks(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ?? "10";

    const aicUrl = new URL(req.url);
    aicUrl.searchParams.set("limit", limit);

    const metUrl = new URL(req.url);
    metUrl.searchParams.set("limit", limit);
    metUrl.searchParams.set("q", "paintings");

    const [aicRes, metRes] = await Promise.all([
      getAicArtworks(new NextRequest(aicUrl)),
      getMetArtworks(new NextRequest(metUrl)),
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
    console.error("Error in getAllArtworks:", err);
    return errorResponse("Internal server error", 500);
  }
}
