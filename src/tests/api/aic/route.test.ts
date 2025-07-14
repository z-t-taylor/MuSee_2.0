import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/aic/route";

describe("GET /api/aic", () => {
  it("should return with a 200 status", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
  });
});
