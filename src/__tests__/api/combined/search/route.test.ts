import { describe, it, expect, afterEach, vi } from "vitest";
import { GET } from "@/app/api/combined/search/route";
import { Artwork } from "@/types/artworkType";
import { NextRequest, NextResponse } from "next/server";

describe("GET api/combined/search", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("should return a 200 if the combined search is successful", async () => {
    const mockData: Artwork[] = [
      {
        id: "16568",
        title: "Water Lilies",
        artist: "Claude Monet (French, 1840–1926)",
        creationDate: "1906",
        image: {
          imageURL:
            "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg",
          altText:
            "Painting of a pond seen up close spotted with thickly painted pink and white water lilies and a shadow across the top third of the picture.",
          thumbnail:
            "data:image/gif;base64,R0lGODlhBQAFAPQAAEZcaFFfdVtqbk9ldFBlcVFocllrcFlrd11rdl9sdFZtf15wcWV0d2R2eGByfmd6eGl6e2t9elZxiGF4kWB4kmJ9kGJ8lWeCkWSAnQAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAFAAUAAAUVoJBADXI4TLRMWHU9hmRRCjAURBACADs=",
        },
        isPublicDomain: true,
        medium: "Oil on canvas",
        museumSource: "aic",
        museumLink: "https://www.artic.edu/artworks/16568",
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
      await import("@/lib/controllers/aic/search/artworkController"),
      "searchAicArtworks"
    ).mockResolvedValue(
      NextResponse.json({ data: [mockData[0]] }, { status: 200 })
    );

    vi.spyOn(
      await import("@/lib/controllers/met/search/artworkContoller"),
      "searchMetArtworks"
    ).mockResolvedValue(
      NextResponse.json({ data: [mockData[1]] }, { status: 200 })
    );

    const url = new URL(`http://localhost/api/combined/search`);
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({ data: mockData });
    expect(data).toBeDefined();
    expect(data.data[0].museumSource).toBe("aic");
    expect(data.data[1].museumSource).toBe("met");
  });
  it("should return a 400 status if an invalid search query is inputted", async () => {
    vi.spyOn(
      await import("@/lib/controllers/aic/search/artworkController"),
      "searchAicArtworks"
    ).mockResolvedValue(NextResponse.json({ data: null }, { status: 400 }));

    vi.spyOn(
      await import("@/lib/controllers/met/search/artworkContoller"),
      "searchMetArtworks"
    ).mockResolvedValue(NextResponse.json({ data: null }, { status: 400 }));

    const url = new URL("http://localhost/api/combined/search");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid search query");
  });
  it("should return a 404 status if no artworks are found", async () => {
    vi.spyOn(
      await import("@/lib/controllers/aic/search/artworkController"),
      "searchAicArtworks"
    ).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as any);

    vi.spyOn(
      await import("@/lib/controllers/met/search/artworkContoller"),
      "searchMetArtworks"
    ).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as any);

    const url = new URL("http://localhost/api/combined/search");
    const req = new NextRequest(url);

    const res = await GET(req);
    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.error).toBe("No artworks found");
  });
  it("should return a status 500 if one or more fetch throws an error", async () => {
    const aicModule = await import(
      "@/lib/controllers/aic/search/artworkController"
    );
    vi.spyOn(aicModule, "searchAicArtworks").mockImplementation(() => {
      throw new Error("Mock fetch failure");
    });

    const req = new NextRequest("http://localhost/api/combined/search");
    const res = await GET(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("Internal server error");
  });
});
