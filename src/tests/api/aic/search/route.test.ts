import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/aic/search/route";
import { NextRequest } from "next/server";

describe("GET api/aic/search", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("should return with a status 200", async () => {
    const query = "textile";
    const url = new URL(
      `http://localhost/api/aic/search?q=${query}&limit=2&page=1&is_public_domain=true`
    );
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[0]).toHaveProperty("id");
    expect(data.data[0]).toHaveProperty("title");
    expect(data.data[0].isPublicDomain).toEqual(true);
  });
  it("should return a status 400 if search query was invalid", async () => {
    const query = "";
    const url = new URL(
      `http://localhost/api/aic/search?q=${query}&limit=2&page=1`
    );

    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid search query.");
  });
  it("should return with a 500 status if fetch throws an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Mock fetch failure");
      })
    );

    const query = "monet";
    const req = new NextRequest(
      new URL(`http://localhost/api/aic/search?q=${query}&limit=2&page=1`)
    );
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
