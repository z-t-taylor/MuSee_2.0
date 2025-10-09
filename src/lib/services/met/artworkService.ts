import { metAdapter } from "@/adapters/metAdapter";
import { SingleMetArtworkResponse } from "@/types/metTypes";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function fetchMetArtwork(id: string) {
  const res = await fetch(`${MET_BASE_URL}/objects/${id}`);
  const rawData: SingleMetArtworkResponse = await res.json();
  const transformed = metAdapter(rawData);
  return transformed;
}

export async function fetchMetArtworks(query: string, limit: number) {
  const searchRes = await fetch(
    `${MET_BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`
  );

  if (!searchRes.ok) {
    throw new Error(`Met search failed with status: ${searchRes.status}`);
  }

  const searchData = await searchRes.json();
  const { objectIDs } = searchData;

  if (!objectIDs || objectIDs.length === 0) {
    return [];
  }

  const limitedIds = objectIDs.slice(0, limit);

  const artworkPromises = limitedIds.map(async (id: number) => {
    const res = await fetch(`${MET_BASE_URL}/objects/${id}`);
    if (!res.ok) return null;

    const rawData: SingleMetArtworkResponse = await res.json();

    if (!rawData.objectID || !rawData.primaryImage) {
      return null;
    }

    return metAdapter(rawData);
  });

  const artworks = await Promise.all(artworkPromises);
  const validArtworks = artworks.filter((art) => art !== null && art.id);

  return validArtworks;
}
