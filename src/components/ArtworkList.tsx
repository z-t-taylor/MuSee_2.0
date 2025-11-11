"use client";

import { useEffect, useState } from "react";
import { MasonryGrid } from "@/components/MasonryGrid";
import { Artwork } from "@/types/artworkType";
import { SearchBar } from "./SearchBar";

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async (search?: string) => {
    try {
      setLoading(true);
      setError(null);

      let url = "/api/combined?limit=20";

      if (search) {
        url = `/api/combined/search?q=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const { data } = await res.json();
      setArtworks(data);
    } catch (err) {
      console.error("Error fetching artworks: ", err);
      setError("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(searchTerm);
  }, [searchTerm]);

  if (loading) return <div className="m-4">Loading...</div>;
  if (error) return <div className="m-4">{error}</div>;

  return (
    <>
      <SearchBar onSearch={setSearchTerm} placeholder="Search artworks..." />
      <MasonryGrid
        items={artworks}
        getKey={(item) => item.id}
        renderItem={(item) => (
          <img
            src={item.image.imageURL}
            alt={item.image.altText}
            className="rounded-2xl"
          />
        )}
      />
    </>
  );
};
