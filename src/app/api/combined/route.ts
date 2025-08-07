import { getAllArtworks } from "@/lib/controllers/combined/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getAllArtworks(req);
}
