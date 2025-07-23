import { aicAdapter } from "@/adapters/aicAdapter";
import { AicArtworkListResponse } from "@/types/aicTypes";
import { Artwork } from "@/types/artworkType";

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks";

export async function fetchAicArtworks(
  limit: number,
  page: number
): Promise<{
  data: Artwork[];
  pagination: AicArtworkListResponse["pagination"];
}> {
  const res = await fetch(`${AIC_BASE_URL}?limit=${limit}&page=${page}`);

  const rawData: AicArtworkListResponse = await res.json();
  const transformed = rawData.data.map(aicAdapter);

  return {
    data: transformed,
    pagination: rawData.pagination,
  };
}
