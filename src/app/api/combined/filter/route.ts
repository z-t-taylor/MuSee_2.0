import { getAllFilterArtworks } from "@/lib/controllers/combined/filter/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getAllFilterArtworks(req);
}
