import { filterAicArtworks } from "@/lib/controllers/aic/filter/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return filterAicArtworks(req);
}
