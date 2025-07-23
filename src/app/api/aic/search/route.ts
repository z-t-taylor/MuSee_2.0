import { searchAicArtworks } from "@/lib/controllers/aic/search/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return searchAicArtworks(req);
}
