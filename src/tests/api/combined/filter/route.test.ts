import { GET } from "@/app/api/combined/filter/route";
import { Artwork } from "@/types/artworkType";
import { NextRequest, NextResponse } from "next/server";
import { describe, it, expect, afterEach, vi } from "vitest";

describe("GET /api/combine/filter", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("should return a status 200 if the combined filter is successful", async () => {
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

    vi.spyOn(
      await import("@/lib/controllers/aic/filter/artworkController"),
      "filterAicArtworks"
    ).mockResolvedValue(
      NextResponse.json({ data: [mockData[0]] }, { status: 200 })
    );
    vi.spyOn(
      await import("@/lib/controllers/met/filter/artworkController"),
      "filterMetArtworks"
    ).mockResolvedValue(
      NextResponse.json({ data: [mockData[1]] }, { status: 200 })
    );

    const url = new URL("http://localhost/api/combined/filter");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({ data: mockData });
    expect(data).toBeDefined();
    expect(data.data[0].museumSource).toBe("aic");
    expect(data.data[1].museumSource).toBe("met");
  });
  it("should return a status 400 if an invalid filter is applied", async () => {
    vi.spyOn(
      await import("@/lib/controllers/aic/filter/artworkController"),
      "filterAicArtworks"
    ).mockResolvedValue(NextResponse.json({ data: null }, { status: 400 }));
    vi.spyOn(
      await import("@/lib/controllers/met/filter/artworkController"),
      "filterMetArtworks"
    ).mockResolvedValue(NextResponse.json({ data: null }, { status: 400 }));

    const url = new URL("http://localhost/api/combined/filter");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid filter query");
  });
  it("should return a status 404 if no artworks are found", async () => {
    vi.spyOn(
      await import("@/lib/controllers/aic/filter/artworkController"),
      "filterAicArtworks"
    ).mockResolvedValue({ ok: true, json: async () => ({ data: [] }) } as any);
    vi.spyOn(
      await import("@/lib/controllers/met/filter/artworkController"),
      "filterMetArtworks"
    ).mockResolvedValue({ ok: true, json: async () => ({ data: [] }) } as any);

    const url = new URL("http://localhost/api/combined/filter");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error).toBe("No artworks found");
  });
  it("should return a status 500 if one or more fetch throws an error", async () => {
    const aicModule = await import(
      "@/lib/controllers/aic/filter/artworkController"
    );
    vi.spyOn(aicModule, "filterAicArtworks").mockImplementation(() => {
      throw new Error("Mock fetch failure");
    });

    const req = new NextRequest("http://localhost/api/combined/filter");
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
