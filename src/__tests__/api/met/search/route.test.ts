import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/met/search/route";
import { NextRequest } from "next/server";
import { Artwork } from "@/types/artworkType";
import * as artworkService from "@/lib/services/met/search/artworkService";

describe("GET /api/met/search", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should return with a status 200 if request was successful", async () => {
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
    vi.spyOn(artworkService, "fetchSearchMetArtworks").mockResolvedValue(
      mockData
    );
    const query = "Monet";
    const url = new URL(`http://localhost/api/met/search?q=${query}`);
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual(mockData);
    expect(data[0]).toHaveProperty("id");
    expect(data[0].museumSource).toEqual("met");
  });
  it("should return with a status 400 if an invalid query is requested", async () => {
    const query = "";
    const url = new URL(`http://localhost/api/met/search?q=${query}
        `);
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid search query");
  });
  it("should return with a status 404 if no valid queries are found", async () => {
    vi.spyOn(artworkService, "fetchSearchMetArtworks").mockResolvedValue([]);

    const query = "asdfghjklqwertyuiopzxcvbnm";
    const url = new URL(`http://localhost/api/met/search?q=${query}
        `);
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error).toBe("No artworks found");
  });
  it("should return with a 500 status if fetch throws an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Mock fetch failure");
      })
    );

    const query = "monet";
    const url = new URL(`http://localhost/api/met/search?q=${query}
        `);
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
