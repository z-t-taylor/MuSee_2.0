import { Artwork } from "@/types/artworkType";

export async function fetchAllSearchArtworks(data: Artwork[][]) {
  const mergedSearch: Artwork[] = [];
  const unique = new Set<string>();

  for (let art of data.flat()) {
    if (!art || !art.id) continue;
    if (!unique.has(art.id)) {
      unique.add(art.id);
      mergedSearch.push(art);
    }
  }

  return mergedSearch;
}
