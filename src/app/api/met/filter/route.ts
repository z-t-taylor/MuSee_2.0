import { filterMetArtworks } from "@/lib/controllers/met/filter/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return filterMetArtworks(req);
}
