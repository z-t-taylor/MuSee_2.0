import { errorResponse } from "@/lib/utils/errorResponse";
import { SingleMetArtworkResponse } from "@/types/metTypes";
import { NextRequest, NextResponse } from "next/server";
const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const res = await fetch(`${MET_BASE_URL}/objects/${id}`);
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    const data: SingleMetArtworkResponse = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return errorResponse("Internal server error", 500);
  }
}
