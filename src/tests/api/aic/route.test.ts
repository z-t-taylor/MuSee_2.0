import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/aic/route";
import { NextRequest } from "next/server";

import * as artworkService from "@/lib/services/aic/artworkService";
import { Artwork } from "@/types/artworkType";

describe("GET /api/aic", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("should return with a 200 status", async () => {
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

    vi.spyOn(artworkService, "fetchAicArtworks").mockResolvedValue({
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
    const url = new URL("http://localhost/api/aic?limit=2&page=1");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toBeDefined();
    expect(data).toEqual(mockData);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0].isPublicDomain).toBe(true);
    expect(data[1]).toHaveProperty("image");
    expect(data[1].museumSource).toBe("aic");
  });
  it("should return with a 400 status if request was not successful", async () => {
    const url = new URL("http://localhost/api/aic?limit=abc&page=xyz");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid parameters received");
  });
  it("should return with a status 404 if no artworks are found", async () => {
    vi.spyOn(artworkService, "fetchAicArtworks").mockResolvedValue({
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

    const url = new URL("http://localhost/api/aic?limit=2&page=1");
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

    const req = new NextRequest(
      new URL("http://localhost/api/aic?limit=2&page=1")
    );
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
