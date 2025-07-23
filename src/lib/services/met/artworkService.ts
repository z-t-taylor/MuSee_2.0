import { metAdapter } from "@/adapters/metAdapter";
import { Artwork } from "@/types/artworkType";
import { SingleMetArtworkResponse } from "@/types/metTypes";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function fetchMetArtworks(id: string): Promise<Artwork> {
  const res = await fetch(`${MET_BASE_URL}/objects/${id}`);

  const rawData: SingleMetArtworkResponse = await res.json();
  const transformed = metAdapter(rawData);

  return transformed;
}
