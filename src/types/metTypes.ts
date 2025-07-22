export interface MetBaseResponse {
  objectIDs: number[] | null;
}

export interface SingleMetArtworkResponse {
  objectID: number;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  objectDate: string;
  artistNationality: string;
  country?: string;
  culture?: string;
  medium: string;
  classification: string;
  objectURL: string;
}
