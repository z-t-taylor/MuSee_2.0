import { NextRequest } from "next/server";
import { describe, it, expect, afterEach, vi } from "vitest";
import { GET } from "@/app/api/aic/filter/route";
import { Artwork } from "@/types/artworkType";

import * as artworkService from "@/lib/services/aic/filter/artworkService";

describe("GET /api/aic/filter", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should return a 200 status", async () => {
    const mockData: Artwork[] = [
      {
        id: "28560",
        title: "The Bedroom",
        artist: "Vincent van Gogh (Dutch, 1853–1890)",
        creationDate: "1889",
        image: {
          imageURL:
            "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg",
          altText:
            "Painting of bedroom, blue walls, green window, tan bed, red bedding.",
          thumbnail:
            "data:image/gif;base64,R0lGODlhBgAFAPQAAHhwV3N+bnh/aXR8dJtsG6VsAJx4IIp8PIx0QYZ2SoZ/bIx+b3CGboiAQoKAVoWAVpiLYZqNYIiAcoeIc5SNdJeJfJiKfXyCgneAkXmLp3eFqomMgIWJmZOerAAAAAAAACH5BAAAAAAALAAAAAAGAAUAAAUYoMYEXJdhgwBF1wM4RIE01HYYiVJZk7SEADs=",
        },
        isPublicDomain: true,
        medium: "Oil on canvas",
        museumSource: "aic",
        museumLink: "https://www.artic.edu/artworks/28560",
      },
      {
        id: "6005",
        title: "The Banks of the Marne in Winter",
        artist: "Camille Pissarro (French, 1830–1903)",
        creationDate: "1886",
        image: {
          imageURL:
            "https://www.artic.edu/iiif/2/3d950ecc-73f4-c28a-f216-0940b23fa5e8/full/843,/0/default.jpg",
          altText: "A work made of oil on canvas.",
          thumbnail:
            "data:image/gif;base64,R0lGODlhCAAFAPUAADcsJDwwJj80LUc5KjNBLTNBLjZBLTRCLjxFMEdENElDM01FM0pDNE5DNUhFNklJOUxLPVBEOFRKOFVLRF1cXWFhYGpqaXlyaHJ4fnN7gXV8gnR+g3+AgHyBhYKFiZKOiImPkJGTk5eYlJWYlp2blJeYmK6upwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAIAAUAAAYlwAxGswGNPJ0KxcIRmUqhQQAgmFw+pEiDkVA4IA/JAnEoEAiGIAA7",
        },
        isPublicDomain: true,
        medium: "Oil on canvas",
        museumSource: "aic",
        museumLink: "https://www.artic.edu/artworks/6008",
      },
    ];
    vi.spyOn(artworkService, "fetchFilterAicArtworks").mockResolvedValue({
      data: mockData,
      pagination: {
        limit: 2,
        offset: 0,
        current_page: 1,
        total_pages: 30385,
        previous_url: "",
        next_url: "",
      },
    });
    const filter = "painting";
    const url = new URL(
      `http://localhost/api/aic/filter?q=${filter}&limit=2&page=1&is_public_domain=true`
    );
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0].isPublicDomain).toEqual(true);
  });
  it("should return a 400 status if invalid filter query is inputted", async () => {
    const filter = "";
    const url = new URL(
      `http://localhost/api/aic/filter?q=${filter}&limit=2&page=1&is_public_domain=true`
    );
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid filter query");
  });
  it("should return a 404 status if queried filter returns no responses", async () => {
    vi.spyOn(artworkService, "fetchFilterAicArtworks").mockResolvedValue({
      data: [],
      pagination: {
        limit: 2,
        offset: 0,
        current_page: 1,
        total_pages: 1,
        previous_url: "",
        next_url: "",
      },
    });
    const filter = "khdkhdsdaasd";
    const url = new URL(
      `http://localhost/api/aic/filter?q=${filter}&limit=2&page=1&is_public_domain=true`
    );
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error).toBe("No artworks found");
  });
  it("should return a 500 status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Mock fetch failure");
      })
    );
    const filter = "painting";
    const req = new NextRequest(
      `http://localhost/api/aic/filter?q=${filter}&limit=2&page=1&is_public_domain=true`
    );
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
