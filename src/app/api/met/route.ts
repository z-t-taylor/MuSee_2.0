import { getMetArtworks } from "@/lib/controllers/met/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getMetArtworks(req);
}
