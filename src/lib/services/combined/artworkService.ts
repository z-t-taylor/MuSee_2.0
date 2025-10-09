import { Artwork } from "@/types/artworkType";

export async function fetchAllArtworks(data: Artwork[][]): Promise<Artwork[]> {
  const merged: Artwork[] = [];
  const unique = new Set<string>();

  for (const art of data.flat()) {
    if (!art || !art.id) {
      console.warn("Skipping invalid artwork:", art);
      continue;
    }

    if (!unique.has(art.id)) {
      unique.add(art.id);
      merged.push(art);
    }
  }

  return merged;
}
