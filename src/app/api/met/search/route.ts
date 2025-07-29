import { searchMetArtworks } from "@/lib/controllers/met/search/artworkContoller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return searchMetArtworks(req);
}
