import { aicAdapter } from "@/adapters/aicAdapter";
import { AicArtworkListResponse } from "@/types/aicTypes";
import { Artwork } from "@/types/artworkType";

const AIC_BASE_URL = "https://api.artic.edu/api/v1/artworks/search";

export async function fetchSearchAicArtworks(
  query: string,
  limit: number,
  page: number
): Promise<{
  data: Artwork[];
  pagination: AicArtworkListResponse["pagination"];
}> {
  const url = new URL(AIC_BASE_URL);
  url.searchParams.append("q", query);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("page", page.toString());
  url.searchParams.append("query[term][is_public_domain]", "true");
  url.searchParams.append(
    "fields",
    [
      "id",
      "title",
      "artist_display",
      "image_id",
      "date_display",
      "thumbnail",
      "medium_display",
      "category_titles",
      "is_public_domain",
    ].join(",")
  );

  const res = await fetch(url.toString());
  const rawData: AicArtworkListResponse = await res.json();

  const filtered = rawData.data.filter(
    (artwork) =>
      artwork.image_id && artwork.thumbnail && artwork.is_public_domain
  );

  const transformed = filtered.map(aicAdapter);

  return {
    data: transformed,
    pagination: rawData.pagination,
  };
}
