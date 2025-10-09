import { aicAdapter } from "@/adapters/aicAdapter";
import { AicArtworkListResponse } from "@/types/aicTypes";
import { Artwork } from "@/types/artworkType";

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export async function fetchAicArtworks(limit: number, page: number) {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks?limit=${limit}&page=${page}`
  );

  const rawData = await res.json();

  const artworks = rawData.data
    .map(aicAdapter)
    .filter((art: Artwork | null): art is Artwork => art !== null);

  return { data: artworks, pagination: rawData.pagination };
}
