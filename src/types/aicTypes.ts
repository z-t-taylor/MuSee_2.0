export interface AicBaseResponse {
  id: number;
  title: string;
  artist_display: string | undefined;
  thumbnail?: {
    lqip?: string;
    alt_text?: string;
  };
  image_id: string;
  date_display: string | undefined;
  category_titles?: string[];
  department_title?: string | string[];
  classification_title?: string;
  artwork_type_title?: string;
  medium_display: string;
  is_public_domain: boolean;
}

export interface SingleAicArtworkResponse {
  data: AicBaseResponse & {
    place_of_origin?: string;
    main_reference_number: string;
    description?: string;
    medium_display?: string;
    style_titles?: string | string[];
    exhibition_history?: string;
  };
}

export interface AicArtworkListResponse {
  data: AicBaseResponse[];
  pagination: {
    limit: number;
    offset: number;
    current_page: number;
    total_pages: number;
    previous_url: string;
    next_url: string;
  };
}
