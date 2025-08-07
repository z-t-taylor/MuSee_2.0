import { Artwork } from "@/types/artworkType";

export async function fetchAllArtworks(data: Artwork[][]): Promise<Artwork[]> {
  const merged: Artwork[] = [];
  const unique = new Set<string>();

  for (const art of data.flat()) {
    if (!unique.has(art.id)) {
      unique.add(art.id);
      merged.push(art);
    }
  }

  return merged;
}
