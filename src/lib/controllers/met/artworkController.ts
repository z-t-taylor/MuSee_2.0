import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/errorResponse";
import { fetchMetArtworks } from "@/lib/services/met/artworkService";

export async function getMetArtworks(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return errorResponse("Invalid ID", 400);
  }

  try {
    const data = await fetchMetArtworks(id);

    if (!data) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}
