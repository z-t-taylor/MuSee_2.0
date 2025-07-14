import { NextResponse } from "next/server";
const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export async function GET() {
  const res = await fetch(`${AIC_BASE_URL}?limit=10`);
  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}
