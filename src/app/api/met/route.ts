import { NextResponse } from "next/server";
const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const res = await fetch(`${MET_BASE_URL}/object/${id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
