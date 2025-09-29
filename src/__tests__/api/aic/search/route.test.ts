import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "@/app/api/aic/search/route";
import { NextRequest } from "next/server";
import { Artwork } from "@/types/artworkType";

import * as artworkService from "@/lib/services/aic/search/artworkService";

describe("GET api/aic/search", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should return with a status 200", async () => {
    const mockData: Artwork[] = [
      {
        id: "1889",
        title: "Fragment",
        artist: "Italy",
        creationDate: "16th century",
        image: {
          imageURL:
            "https://www.artic.edu/iiif/2/02e1166a-eb1a-054e-5728-be816085910e/full/843,/0/default.jpg",
          altText: "A work made of silk, fancy simple satin weave.",
          thumbnail:
            "data:image/gif;base64,R0lGODlhAwAFAPMAAJB6d5t+eZp7fJqBfaWDfpaAh6mEhKaJj6mJjqiMjLSNiruUlraRm7qVnbmbqQAAACH5BAAAAAAALAAAAAADAAUAAAQLUBRgzmguLUYUChEAOw==",
        },
        isPublicDomain: true,
        medium: "silk, fancy simple satin weave",
        museumSource: "aic",
        museumLink: "https://api.artic.edu/api/v1/artworks/1889",
      },
      {
        id: "1895",
        title: "Panel",
        artist: "Italy",
        creationDate: "16th century",
        image: {
          imageURL:
            "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/843,/0/default.jpg",
          altText:
            "Textile with a cream-colored floral motif on red fabric, vines arranged in repeating diamond shapes, a large flourish or blossom within each one.",
          thumbnail:
            "data:image/gif;base64,R0lGODlhBAAFAPQAAJZrbJhtbppwcJ9ydJ90dZZ6eZp+fKZ6eqF/f6OEgKOEgamIhKmIh6uLh6GMibCPjKqRjauWk7WSkLuhngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAUR4MQg0EMEiXQMSyMASmQUTggAOw==",
        },
        isPublicDomain: true,
        medium: "Silk and linen, satin damask weave",
        museumSource: "aic",
        museumLink: "https://api.artic.edu/api/v1/artworks/1895",
      },
    ];

    vi.spyOn(artworkService, "fetchSearchAicArtworks").mockResolvedValue({
      data: mockData,
      pagination: {
        limit: 2,
        offset: 0,
        current_page: 1,
        total_pages: 1289,
        previous_url: "",
        next_url: "",
      },
    });

    const query = "textile";
    const url = new URL(
      `http://localhost/api/aic/search?q=${query}&limit=2&page=1`
    );
    const req = new NextRequest(url);
    const res = await GET(req);

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toBeDefined();
    expect(data).toEqual(mockData);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0].isPublicDomain).toEqual(true);
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
    expect(body.error).toBe("Invalid search query");
  });
  it("should return a status 404 if no artworks are found", async () => {
    vi.spyOn(artworkService, "fetchSearchAicArtworks").mockResolvedValue({
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
    const query = "jggkuyyuttrtyuiiu";
    const url = new URL(
      `http://localhost/api/aic/search?q=${query}&limit=2&page=1`
    );

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
    const req = new NextRequest(
      new URL(`http://localhost/api/aic/search?q=${query}&limit=2&page=1`)
    );
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
