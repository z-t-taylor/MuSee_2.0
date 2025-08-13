import { getAllSearchArtworks } from "@/lib/controllers/combined/search/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getAllSearchArtworks(req);
}
