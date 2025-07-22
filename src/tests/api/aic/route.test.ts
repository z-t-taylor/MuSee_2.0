import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/aic/route";
import { NextRequest } from "next/server";

describe("GET /api/aic", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("should return with a 200 status", async () => {
    const url = new URL("http://localhost/api/aic?limit=2&page=1");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[0]).toHaveProperty("id");
  });
  it("should return with a 400 status if request was not successful", async () => {
    const url = new URL("http://localhost/api/aic?limit=abc&page=xyz");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);
  });
  it("should return with a 500 status if fetch throws an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Mock fetch failure");
      })
    );

    const req = new NextRequest(
      new URL("http://localhost/api/aic?limit=2&page=1")
    );
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
