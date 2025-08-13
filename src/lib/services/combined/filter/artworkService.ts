import { Artwork } from "@/types/artworkType";

export async function fetchAllFilterArtworks(data: Artwork[][]) {
  const mergedFilter: Artwork[] = [];
  const unique = new Set<string>();

  for (let art of data.flat()) {
    if (!unique.has(art.id)) {
      unique.add(art.id);
      mergedFilter.push(art);
    }
  }

  return mergedFilter;
}
