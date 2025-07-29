import { NextResponse } from "next/server";

export const errorResponse = (msg: string, status: number): NextResponse => {
  return NextResponse.json({ error: msg }, { status });
};
