import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/met/route";

describe("GET /api/met", () => {
  it("should return a status 200", async () => {
    const id = "437133";
    const req = new Request(`http://localhost/api/met?id=${id}`);
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.objectID).toBeDefined();
    expect(data.objectID).toBe(Number(id));
    expect(data.artistDisplayName).toBe("Claude Monet");
  });
  it("should return a status 400 if no id is defined", async () => {
    const res = await GET(new Request("http://localhost/api/met"));
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe("Missing ID");
  });
});
