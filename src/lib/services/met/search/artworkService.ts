import { MetBaseResponse, SingleMetArtworkResponse } from "@/types/metTypes";
import { Artwork } from "@/types/artworkType";
import { metAdapter } from "@/adapters/metAdapter";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function fetchSearchMetArtworks(query: string) {
  try {
    const res = await fetch(`${MET_BASE_URL}/search?&q=${query}`);
    const data: MetBaseResponse = await res.json();

    if (!data.objectIDs?.length) {
      return [];
    }

    const batchSize = 10;
    const validArtworks: Artwork[] = [];
    let index = 0;

    while (validArtworks.length < 10 && index < data.objectIDs.length) {
      const batch = data.objectIDs.slice(index, index + batchSize);

      const artworks = await Promise.allSettled(
        batch.map(async (id) => {
          try {
            const res = await fetch(`${MET_BASE_URL}/objects/${id}`);
            if (!res.ok) return null;
            const data: SingleMetArtworkResponse = await res.json();
            return data;
          } catch (err) {
            return null;
          }
        })
      );

      for (const result of artworks) {
        if (
          result.status === "fulfilled" &&
          result.value?.isPublicDomain &&
          result.value?.primaryImage
        ) {
          validArtworks.push(metAdapter(result.value));
        }
        if (validArtworks.length >= 10) break;
      }
      index += batchSize;
    }

    return validArtworks;
  } catch {
    throw new Error("fetch error");
  }
}
