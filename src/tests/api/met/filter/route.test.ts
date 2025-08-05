import { Artwork } from "@/types/artworkType";
import { it, describe, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/met/filter/route";

import * as artworkService from "@/lib/services/met/filter/artworkService";

describe("GET api/met/filter", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should return a status 200 if request was successful", async () => {
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
    vi.spyOn(artworkService, "fetchFilterMetArtworks").mockResolvedValue(
      mockData
    );

    const filter = "paintings";
    const url = new URL(`http://localhost/api/met/search?q=${filter}`);
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toEqual(mockData);
  });
  it("should return a status 400  if an invalid query is requested", async () => {
    const filter = "";
    const url = new URL(`http://localhost/api/met/search?q=${filter}`);
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid filter query");
  });
  it("should return a status 404 if no valid queries are found", async () => {
    vi.spyOn(artworkService, "fetchFilterMetArtworks").mockResolvedValue([]);

    const filter = "asdfghjklqwertyuiopzxcvbnm";
    const url = new URL(`http://localhost/api/met/search?q=${filter}
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

    const filter = "paintings";
    const url = new URL(`http://localhost/api/met/search?q=${filter}
          `);
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
