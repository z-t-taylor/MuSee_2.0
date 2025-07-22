import { Artwork } from "@/types/artworkType";
import { SingleMetArtworkResponse } from "@/types/metTypes";

export const metAdapter = (item: SingleMetArtworkResponse): Artwork => ({
  id: item.objectID.toString(),
  title: item.title,
  artist: item.artistDisplayName,
  creationDate: item.objectDate,
  image: {
    imageURL: item.primaryImage || item.primaryImageSmall,
    altText: `${item.title} by ${item.artistDisplayName}`,
    thumbnail: item.primaryImageSmall,
  },
  medium: item.medium,
  origin: item.culture || item.country || item.artistNationality,
  styles: item.classification,
  classification: item.classification,
  description: item.artistDisplayBio || undefined,
  exhibitionHistory: undefined,
  museumSource: "met",
  museumLink: item.objectURL,
});
