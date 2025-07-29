import { AicBaseResponse, SingleAicArtworkResponse } from "@/types/aicTypes";
import { Artwork } from "@/types/artworkType";

export const aicAdapter = (
  item: AicBaseResponse & Partial<SingleAicArtworkResponse["data"]>
): Artwork => ({
  id: item.id.toString(),
  title: item.title,
  artist: item.artist_display || undefined,
  creationDate: item.date_display || undefined,
  image: {
    imageURL: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
    altText: item.thumbnail?.alt_text ?? item.title,
    thumbnail: item.thumbnail?.lqip,
  },
  isPublicDomain: item.is_public_domain,
  medium: item.medium_display,
  origin: item.place_of_origin,
  styles:
    item.style_titles || item.classification_title || item.department_title,
  classification: item.artwork_type_title,
  description: item.description,
  exhibitionHistory: item.exhibition_history,
  museumSource: "aic",
  museumLink: `https://www.artic.edu/artworks/${item.id}`,
});
