import { NextResponse } from "next/server";

export const errorResponse = (
  msg: string,
  status: number = 500
): NextResponse => {
  return NextResponse.json({ error: msg }, { status });
};
