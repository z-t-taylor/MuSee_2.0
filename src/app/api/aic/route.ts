import { getAicArtworks } from "@/lib/controllers/aic/artworkController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getAicArtworks(req);
}
