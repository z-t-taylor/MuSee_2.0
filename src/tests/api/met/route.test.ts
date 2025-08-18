import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/met/route";
import { NextRequest } from "next/server";
import { Artwork } from "@/types/artworkType";

import * as artworkService from "@/lib/services/met/artworkService";

describe("GET /api/met", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should return a status 200", async () => {
    const mockData: Artwork[] = [
      {
        id: "436965",
        title: "The Monet Family in Their Garden at Argenteuil",
        artist: "Edouard Manet",
        creationDate: "1874",
        image: {
          imageURL:
            "https://images.metmuseum.org/CRDImages/ep/original/DP-25465-001.jpg",
          altText:
            "The Monet Family in Their Garden at Argenteuil by Edouard Manet",
          thumbnail:
            "https://images.metmuseum.org/CRDImages/ep/web-large/DP-25465-001.jpg",
        },
        isPublicDomain: true,
        medium: "Oil on canvas",
        origin: "French",
        styles: "Paintings",
        classification: "Paintings",
        description: "French, Paris 1832–1883 Paris",
        exhibitionHistory: undefined,
        museumSource: "met",
        museumLink: "https://www.metmuseum.org/art/collection/search/436965",
      },
    ];
    vi.spyOn(artworkService, "fetchMetArtworks").mockResolvedValue(mockData);

    const id = "436965";
    const url = new URL(`http://localhost/api/met?id=${id}`);
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toBeDefined();
    expect(data[0].id).toBe("436965");
    expect(data[0].artist).toBe("Edouard Manet");
    expect(data[0].isPublicDomain).toEqual(true);
  });
  it("should return a status 400 if no id is defined", async () => {
    const url = "http://localhost/api/met?id=";
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe("Invalid ID");
  });
  it("should return a status 404 if no artworks are found", async () => {
    vi.spyOn(artworkService, "fetchMetArtworks").mockResolvedValue([]);

    const id = "675432743287643298742638461";
    const url = "http://localhost/api/met?id=${id}";
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(404);

    const data = await res.json();
    expect(data.error).toBe("No artworks found");
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
