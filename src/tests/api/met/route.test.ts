import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/met/route";
import { NextRequest } from "next/server";

describe("GET /api/met", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("should return a status 200", async () => {
    const id = "437133";
    const url = new URL(`http://localhost/api/met?id=${id}`);
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toBeDefined();
    expect(data.id).toBe("437133");
    expect(data.artist).toBe("Claude Monet");
  });
  it("should return a status 400 if no id is defined", async () => {
    const url = "http://localhost/api/met";
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe("Invalid ID");
  });
  it("should return with a 500 status if fetch throws an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Mock fetch failure");
      })
    );

    const id = "437133";
    const req = new NextRequest(new URL(`http://localhost/api/met?id=${id}`));
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
