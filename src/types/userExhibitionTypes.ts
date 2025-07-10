import { Artwork } from "@/types/artworkType";

export interface UserExhibition {
  exhibitionId: string;
  title: string;
  description?: string;
  artworks: UserExhibitionArtwork[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  slug: string;
}

export interface UserExhibitionArtwork extends Artwork {
  note?: string;
  addedAt: Date | string;
}
